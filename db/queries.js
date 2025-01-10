const e = require("express");
const pool = require("./pool");

async function getCategoriesDB() {
  const categories = await pool.query("SELECT * FROM categories");
  return categories.rows;
}

async function addNewCategoryDB(categoryName) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [categoryName]);
}

async function deleteCategoryByIdDB(categoryId) {
  await pool.query("DELETE FROM categories WHERE id = ($1)", [categoryId]);
}

async function getCategoryItemsDB(categoryId) {
  console.log(categoryId);
  const query =
    "SELECT items.id, item_name,item_level,equip_level,img_url,category_id,item_password from items INNER JOIN categories ON items.category_id = categories.id WHERE categories.id = $1;";
  const { rows } = await pool.query(query, [categoryId]);
  return rows;
}

async function getItemByIdDB(itemId) {
  const query = "SELECT * FROM items WHERE id = $1";
  const { rows } = await pool.query(query, [itemId]);
  return rows[0];
}

async function editItemByIdDB(itemId, updatedItem) {
  const { itemName, itemLevel, equipLevel, imgUrl, password } = updatedItem;

  try {
    const validPassword = await getitemPasswordByIdDB(itemId);
    if (validPassword !== password) {
      throw new Error("Invalid Password");
    }

    const query =
      "UPDATE items SET item_name = $1, item_level = $2, equip_level = $3, img_url = $4 WHERE id = $5";
    await pool.query(query, [itemName, itemLevel, equipLevel, imgUrl, itemId]);

    return { success: true, message: "Item updated successfully" };
  } catch (error) {
    console.error(`Error in editItemByIdDB: ${error.message}`);
  }
}

async function addNewCategoryItemDB(newItemObject) {
  const { itemName, itemLevel, equipLevel, imgUrl, password, categoryId } =
    newItemObject;

  const query =
    "INSERT INTO items (item_name, item_level, equip_level, img_url, category_id, item_password ) VALUES ($1, $2, $3, $4, $5, $6)";
  await pool.query(query, [
    itemName,
    itemLevel,
    equipLevel,
    imgUrl,
    categoryId,
    password,
  ]);
}

async function getitemPasswordByIdDB(itemId) {
  const query = "SELECT item_password FROM items WHERE id = $1";
  const { rows } = await pool.query(query, [itemId]);
  return rows[0].item_password;
}

async function deleteItemByIdDB(itemId, inputPassword) {
  const validPassword = await getitemPasswordByIdDB(itemId);
  if (validPassword !== inputPassword) {
    console.error("Invalid Password");
  } else {
    await pool.query("DELETE FROM items WHERE id = ($1)", [itemId]);
  }
}
async function clearCategoriesDB() {
  await pool.query("DELETE FROM categories");
}

module.exports = {
  addNewCategoryDB,
  getCategoriesDB,
  clearCategoriesDB,
  getCategoryItemsDB,
  deleteCategoryByIdDB,
  addNewCategoryItemDB,
  deleteItemByIdDB,
  getItemByIdDB,
  editItemByIdDB,
};
