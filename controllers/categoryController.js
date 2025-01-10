const db = require("../db/queries");

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
  const { categoryId } = req.params;
  const newItem = { categoryId, ...req.body };
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
