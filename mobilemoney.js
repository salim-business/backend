const momo = require("mtn-momo");

const { Collections } = momo.create({
  callbackHost: "http://localhost:5000",
});

const collections = Collections({
  userSecret: "459c83a9789540a68a7fc4c58ada1b12",
  userId: "acb0956e-fcfc-4c52-ab3e-61507de3855e",

  primaryKey: "87540e197e84433db4aff1bb1fbe46db",
});

// Request to pay
collections
  .requestToPay({
    amount: "50",
    currency: "EUR",
    externalId: "123456",
    payer: {
      partyIdType: "MSISDN",
      partyId: "256775266558",
    },
    payerMessage: "testing",
    payeeNote: "hello",
  })
  .then((transactionId) => {
    console.log({ transactionId });

    // Get transaction status
    return collections.getTransaction(transactionId);
  })
  .then((transaction) => {
    console.log({ transaction });

    // Get account balance
    return collections.getBalance();
  })
  .then((accountBalance) => console.log({ accountBalance }))
  .catch((error) => {
    console.log(error);
  });
