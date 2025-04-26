import { Router } from "express";
import { authDoctor, authorizeDoctor } from "../Middlewares/authDoctor.js";
import { authPatient } from "../Middlewares/authPatient.js";
import { articlePicturesUpload } from "../Middlewares/article.js";
import {
  addArticle,
  deleteArticle,
  getAllArticle,
  getArticle,
  updateArticle,
  updatePartofArticle,
} from "../Controllers/article.js";

const articleRouter = Router();

// Doctor creating an article
articleRouter.post(
  "/articles",
  authDoctor,
  articlePicturesUpload.array("image", 3),
  authorizeDoctor(["doctor"]),
  addArticle
);

// Doctor updating an article
articleRouter.put(
  "/articles/:id",
  authDoctor,
  articlePicturesUpload.array("image", 3),
  authorizeDoctor(["doctor", "admin"]),
  updateArticle
);

// Doctor deleting an article
articleRouter.delete(
  "/articles/:id",
  authDoctor,
  authorizeDoctor(["doctor", "admin"]),
  deleteArticle
);

// Everyone fetching a single article
articleRouter.get(
  "/articles/:id",
  authPatient,
  getArticle
);

// Everyone fetching all articles
articleRouter.get(
  "/articles",
  authPatient,
  getAllArticle
);

export default articleRouter;
