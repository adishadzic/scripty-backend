const router = require("express").Router();
import userSchema from "../storage/users";

router.route("/").get((req, res) => {
  let doc = userSchema.users;
  res.send(doc);
});

router.route("/").post((req, res) => {
  console.log("Novi korisnik: ");

  let doc = req.body;
  console.log(doc);

  userSchema.users.push(doc);

  res.json({ status: "ok" });
});

module.exports = router;
