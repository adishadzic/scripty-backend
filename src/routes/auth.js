const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('User not found');
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.json({ token: token, email: user.email });
};

const changeUserPassword = async (email, old_password, new_password) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && user.password && (await bcrypt.compare(old_password, user.password))) {
    let new_password_hashed = await bcrypt.hash(new_password, 8);

    let result = await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: {
          password: new_password_hashed,
        },
      }
    );
    return result.modifiedCount == 1;
  }
};

module.exports = { register, login, changeUserPassword };
