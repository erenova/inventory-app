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
  res.render(`category`, { categoryId });
};

module.exports = {
  getCategories,
  getNewCategoryForm,
  postNewCategoryForm,
  deleteAllCategories,
  getCategoryItems,
};
