
var admin = require("firebase-admin");

var serviceAccount = require("../../calidair-d27b9-firebase-adminsdk-18k65-c58a75e186.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://calidair-d27b9-default-rtdb.firebaseio.com"
});

module.exports = admin