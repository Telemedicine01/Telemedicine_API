import { ArticleModel } from "../Models/article.js";
import { addArticleValidator } from "../Validators/article.js";

export const addArticle = async (req, res, next) => {
  try {
    console.log(req.file, req.files);
    //validate the product information
    const { error, value } = addArticleValidator.validate(
      {
        ...req.body,
        image: req.files?.map((file) => {
          return file.filename;
        }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    //save product information in database
    const result = await ArticleModel.create({
      ...value,
      doctorId: req.auth.id,
    });
    //return response
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllArticle = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    // Parse filter and sort parameters with error handling
    let parsedFilter, parsedSort;
    try {
      parsedFilter = JSON.parse(filter);
      parsedSort = JSON.parse(sort);
    } catch (parseError) {
      return res
        .status(400)
        .json({ error: "Invalid filter or sort query parameters." });
    }

    // Fetch products from the database
    const result = await ArticleModel.find(parsedFilter).sort(parsedSort);

    // Return response
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (req, res) => {
  const oneArticle = await ArticleModel.findById(req.params.id);
  res.status(200).json({ article: oneArticle });
};

export const updateArticle = async (req, res, next) => {
  try {
    const result = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ article: result });
  } catch (error) {
    next(error);
  }
};

export const updatePartofArticle = async (req, res, next) => {
  try {
    const result = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res) => {
  const deleteArticleById = await ArticleModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send("deleted article successfully");
};
