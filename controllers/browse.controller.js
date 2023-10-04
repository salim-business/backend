const { browseService } = require("../services");
const AppError = require("../utils/AppError");
const httpStatus = require("http-status");
const { checkSignedUrls } = require("../utils/storage");


exports.getCategories = async (req, res, next) => {
  console.log(req.params.category, "categories");
  const categories = await browseService.findCategories(
    req.params.category,
    req.query
  );
  if(req.params.category == "products") {let productsWithUrls = await checkSignedUrls(categories.data);
    res.status(200).json({
      items: productsWithUrls,
      offset: req.query.offset,
      limit: req.query.limit,
      total: categories.total,
    });
  } else {res.status(200).json({
    items: categories.data,
    offset: req.query.offset,
    limit: req.query.limit,
    total: categories.total,
  });}
};

exports.getCategory = async (req, res, next) => {
  const category = await browseService.findCategory(req.params);
  if (!category)
    return next(
      new AppError(
        "The category with the given ID was not found.",
        httpStatus.NOT_FOUND
      )
    );
  res.status(200).json(category);
};
