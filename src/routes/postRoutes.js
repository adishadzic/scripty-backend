const router = require("express").Router();
import postSchema from "../storage/posts";

//za čitanje podataka iz "baze"
router.route("/").get((req, res) => {
  let doc = postSchema.posts;
  res.send(doc);
});

//Za dodavanje nove "objave" u "bazu"
router.route("/").post((req, res) => {
  console.log("Nova objava: ");
  let doc = req.body;
  console.log(doc);

  postSchema.posts.push(doc);

  res.json({ status: "ok" });
});

//DINAMICKA RUTA
router.route("/:id").get((req, res) => {
  let id = req.params.id;
  res.send(postSchema.posts.filter((x) => x.author.some((r) => r.id === id)));
});

module.exports = router;
