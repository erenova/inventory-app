#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category_name VARCHAR (255),
  table_password VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR (255),
  item_level INT NOT NULL,
  equip_level INT NOT NULL,
  img_url VARCHAR(255),
  category_id INT NOT NULL,
  item_password VARCHAR(255) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO categories (category_name, table_password) VALUES ('Weapons', '1234');
INSERT INTO categories (category_name, table_password) VALUES ('Armor', '1234');
INSERT INTO categories (category_name, table_password) VALUES ('Accessories', '1234');

INSERT INTO items (item_name, item_level, equip_level, img_url, category_id, item_password) VALUES ('Sword', 10, 5, 'https://via.placeholder.com/150', 1, '1234');
INSERT INTO items (item_name, item_level, equip_level, img_url, category_id, item_password) VALUES ('Shield', 5, 10, 'https://via.placeholder.com/150', 2, '1234');

`;

async function main() {
  const client = new Client({
    connectionString: process.argv[2] || process.env.DB_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Database populated!");
}

main().catch((err) => console.error(err));
