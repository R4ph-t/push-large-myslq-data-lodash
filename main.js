const mysql = require("mysql");
const algoliasearch = require("algoliasearch");
const _ = require("lodash");
const client = algoliasearch("your_APP_id_here", "your_Admin_API_key_here");
const index = client.initIndex("you_index_name");

const connection = mysql.createConnection({
  host: "db_host_address",
  user: "your_username",
  password: "your_password",
  database: "your_DB_name"
});

connection.connect();

connection.query("SELECT * FROM actors_big", (error, results) => {
  if (error) throw error;
  const chunks = _.chunk(results, 1000);
  chunks.forEach(chunk => index.addObjects(chunk));
});

connection.end();
