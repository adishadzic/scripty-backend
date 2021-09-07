const Post = require('../models/PostModel');

const uploadScript = async (scriptData, userData) => {
  const script = {
    scriptName: scriptData.scriptName,
    university: scriptData.university,
    scriptContent: scriptData.scriptContent,
    postedBy: userData,
  };
  try {
    let result = await Post.collection.insertOne(script);
    if (result && result.insertedId) {
      return result.insertedId;
    }
  } catch (e) {
    if ((e.name == 'MongoError' && e.code == 11000) || []) {
      throw new Error('Something went wrong while adding recipe!');
    }
  }
};

const getScripts = async (term) => {
  try {
    const result = await Post.collection.find(searchQuery).toArray();
    return result;
  } catch (error) {
    if ((error.name == 'MongoError' && e.code == 11000) || []) {
      throw new Error('Something went wrong!');
    }
  }
};

module.exports = { uploadScript, getScripts };
