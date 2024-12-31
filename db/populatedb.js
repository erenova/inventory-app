#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category_name VARCHAR (255),
  password VARCHAR(255)

);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item_name VARCHAR (255),
  item_level INT NOT NULL,
  equip_level INT NOT NULL,
  img_url VARCHAR(255),
  category_id INT NOT NULL,
  password VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

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
