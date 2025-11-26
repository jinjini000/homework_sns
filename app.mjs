import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// 정적폴더사용
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// json 통신사용
app.use(express.json());

/* 라우팅 */
// /post로 접근
app.use("/post", postsRouter);
// /auth로 접근
app.use("/auth", authRouter);

/* 404 not found */
app.use((req, res, next) => {
  res.sendStatus(404);
});

connectDB()
  .then(() => {
    app.listen(config.host.port);
  })
  .catch(console.error);
