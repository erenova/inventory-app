const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/", categoryController.postNewCategoryForm);
categoryRouter.get("/new", categoryController.getNewCategoryForm);
categoryRouter.get("/deleteall", categoryController.deleteAllCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryItems);

module.exports = categoryRouter;
