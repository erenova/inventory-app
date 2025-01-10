const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post(
  "/",
  categoryController.postNewCategoryFormValidation,
  categoryController.postNewCategoryForm,
);
categoryRouter.get("/new", categoryController.getNewCategoryForm);
categoryRouter.get("/deleteall", categoryController.deleteAllCategories);
categoryRouter.get(
  "/delete/:categoryId",
  categoryController.deleteCategoryById,
);

categoryRouter.get("/:categoryId", categoryController.getCategoryItems);
categoryRouter.post(
  "/:categoryId",
  categoryController.postNewItemFormValidation,
  categoryController.postNewItemForm,
);
categoryRouter.get(
  "/:categoryId/delete/:itemId",
  categoryController.getDeleteItemById,
);
categoryRouter.post(
  "/:categoryId/delete/:itemId",
  categoryController.postDeleteItemById,
);
categoryRouter.get(
  "/:categoryId/edit/:itemId",
  categoryController.getEditItemById,
);
categoryRouter.post(
  "/:categoryId/edit/:itemId",
  categoryController.postEditItemByIdValidation,
  categoryController.postEditItemById,
);
module.exports = categoryRouter;
