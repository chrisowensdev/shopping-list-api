const fs = require('fs');
const path = require('path');

const itemDatabase = require('./item.mongo');

async function getItem() {
  console.log('getItem function');
}

async function saveItem(item) {
  console.log('saveItem Function');
  // await userDatabase.findOneAndUpdate(
  //   {
  //     email: user.email,
  //   },
  //   user,
  //   {
  //     upsert: true,
  //   }
  // );
}

module.exports = {
  getItem,
  saveItem,
};
