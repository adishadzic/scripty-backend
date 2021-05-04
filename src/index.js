import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const usersRouter = require("./routes/userRoutes");
const postsRouter = require("./routes/postRoutes");

app.get("/", (req, res) => res.send("Hello World"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
