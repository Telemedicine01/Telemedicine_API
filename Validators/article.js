import Joi from "joi";

export const addArticleValidator = Joi.object({
  title: Joi.string().required(),
  article: Joi.string().required(),
  image: Joi.array().items(Joi.string().required()),
  category: Joi.string(),
});
