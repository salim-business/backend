let Store = require("./store");
let pendingAuth = new Map();

module.exports = {
  store: new Store(),
  pendingAuth,
};
