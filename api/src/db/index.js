'use strict';
const pool = require('./connection_pool');

const export_functions = {};

export_functions.fetchUsers = () => {
  return pool.execute(
    `SELECT
      *
    FROM USER`
  )
  .then(([rows, fields]) => {
    return rows;
  })
  .catch((err) => {
    console.error("[fetchUsers] error: " + err);
    throw err;
  });
};

export_functions.findUserById = (id) => {
  console.log("findUserById: " + id);
  return pool.execute(
    `SELECT
      *
    FROM USER
    WHERE
      user_id = ?`,
    [id]
  )
  .then(([rows, fields]) => {
    if (rows.length !== 1) {
      throw new Error("User search failed. fetch rows: " + rows.length);
    }
    return rows[0];
  })
  .catch((err) => {
    console.error("[findUserById] error: " + err);
    throw err;
  });
}

export_functions.addUser = (userid, name, email, password) => {
  return pool.execute(
    `INSERT INTO USER (
      user_id,
      name,
      email,
      password
    ) VALUES (
      ?, ?, ?, ?
    )`,
    [userid, name, email, password]
  )
  .then(([result]) => {
    return result;
  })
  .catch((err) => {
    console.error("[addUser] error: " + err);
    throw err;
  });
}

module.exports = export_functions;