const pool = require("./pool");

async function addNewCategoryDB(categoryName) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [categoryName]);
}

async function getCategoriesDB() {
  const categories = await pool.query("SELECT * FROM categories");
  return categories.rows;
}

async function getCategoryItemsDB(categoryId) {
  const query =
    "SELECT * from items INNER JOIN categories ON items.category_id = categories.id WHERE categories.id = $1; ";
  const { rows } = await pool.query(query, [categoryId]);

  return rows;
}

async function clearCategoriesDB() {
  await pool.query("DELETE FROM categories");
}

module.exports = {
  addNewCategoryDB,
  getCategoriesDB,
  clearCategoriesDB,
  getCategoryItemsDB,
};
