import { Router } from "express";
import { auth, authorize } from "../Middlewares/authUser.js";
import { articlePicturesUpload } from "../Middlewares/article.js";
import {
  addArticle,
  deleteArticle,
  getAllArticle,
  getArticle,
  updateArticle,
  updatePartofArticle,
} from "../Controllers/article.js";

// create product router
const articleRouter = Router();

//define routes
articleRouter.post(
  "/articles",
  auth,
  articlePicturesUpload.array("image", 3),
  authorize(["doctor"]),
  addArticle
);

articleRouter.get(
  "/articles/:id",
  auth,
  authorize(["doctor", "patient", "admin"]),
  getArticle
);

articleRouter.get(
  "/articles",
  auth,
  authorize(["user", "doctor", "admin"]),
  getAllArticle
);

articleRouter.put(
  "/articles/:id",
  auth,
  articlePicturesUpload.array("image", 3),
  authorize(["doctor", "admin"]),
  updateArticle
);

articleRouter.delete(
  "/articles/:id",
  auth,
  authorize(["doctor", "admin"]),
  deleteArticle
);

articleRouter.patch(
  "/articles/:id",
  articlePicturesUpload.array("image", 3),
  authorize(["doctor", "admin"]),
  updatePartofArticle
);

//export router
export default articleRouter;
