const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const postNewCategoryFormValidation = [
  body("categoryName")
    .trim()
    .isEmpty()
    .withMessage("Item name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long"),
];
const postNewItemFormValidation = [
  body("itemName")
    .trim()
    .isEmpty()
    .withMessage("Item name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Item name must be at least 3 characters long"),
  body("itemLevel")
    .isInt({ min: 1, max: 100 })
    .withMessage("Item level must be between 1 and 100"),
  body("equipLevel")
    .isInt({ min: 1, max: 100 })
    .withMessage("Equip level must be between 1 and 100"),
  body("imgUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Image URL must be a valid URL"),
];
const postEditItemByIdValidation = [
  body("itemName")
    .trim()
    .isEmpty()
    .withMessage("Item name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Item name must be at least 3 characters long"),
  body("itemLevel")
    .isInt({ min: 1, max: 100 })
    .withMessage("Item level must be between 1 and 100"),
  body("equipLevel")
    .isInt({ min: 1, max: 100 })
    .withMessage("Equip level must be between 1 and 100"),
  body("imgUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Image URL must be a valid URL"),
];

const getCategories = async (req, res) => {
  const categories = await db.getCategoriesDB();
  console.log(categories);
  res.render("category", {
    categories,
  });
};

const deleteAllCategories = async (req, res) => {
  await db.clearCategoriesDB();
  res.render("category");
};

const deleteCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  await db.deleteCategoryByIdDB(categoryId);
  res.redirect("/category");
};

const getNewCategoryForm = async (req, res) => {
  const categories = await db.getCategoriesDB();
  res.render("category", {
    newCategory: true,
    categories,
  });
};
const postNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { categoryName } = req.body;
  db.addNewCategoryDB(categoryName);
  res.redirect("category");
};

const getCategoryItems = async (req, res) => {
  const { categoryId } = req.params;
  const items = await db.getCategoryItemsDB(categoryId);
  console.log(items);
  res.render(`items`, {
    categoryId,
    items,
    deleteItemByIdDB: db.deleteItemByIdDB,
  });
};

const postNewItemForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { categoryId } = req.params;
  const newItem = { categoryId, ...req.body };
  console.log(req.body);
  db.addNewCategoryItemDB(newItem);

  res.redirect(`/category/${categoryId}`);
};

const getEditItemById = async (req, res) => {
  const { categoryId, itemId } = req.params;
  const item = await db.getItemByIdDB(itemId);
  res.render("editItem", {
    categoryId,
    item,
  });
};
const postEditItemById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { categoryId, itemId } = req.params;
  const updatedItem = req.body;
  await db.editItemByIdDB(itemId, updatedItem);
  res.redirect(`/category/${categoryId}`);
};

const getDeleteItemById = async (req, res) => {
  const { categoryId, itemId } = req.params;
  const item = await db.getItemByIdDB(itemId);
  res.render("deleteItem", {
    categoryId,
    item,
  });
};

const postDeleteItemById = async (req, res) => {
  const { categoryId, itemId } = req.params;
  const inputPassword = req.body.password;
  await db.deleteItemByIdDB(itemId, inputPassword);
  res.redirect(`/category/${categoryId}`);
};

module.exports = {
  postNewCategoryFormValidation,
  postNewItemFormValidation,
  postEditItemByIdValidation,
  getCategories,
  getNewCategoryForm,
  postNewCategoryForm,
  deleteAllCategories,
  getCategoryItems,
  deleteCategoryById,
  postNewItemForm,
  getEditItemById,
  postEditItemById,
  getDeleteItemById,
  postDeleteItemById,
};
