'use strict';
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  hashPassword: hashPassword
};