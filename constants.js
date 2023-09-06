module.exports = Object.freeze({
  database: {
    url:
      process.env.MONGO_DB ||
      "mongodb://localhost/salim",
    connectRetry: 5,
  },
  SECRET_KEY: "dsW7UoHqhl1FnQJmXm75NgpGb8243z7s",
  DEFAULT_ADMIN: {
    USERNAME: "admin",
    PASSWORD: "admin",
  },
});
