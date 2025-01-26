const mongoose = require("mongoose");
const app = require("./app");

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}`
  );
  console.log("Connected to MongoDB");

  app.listen(process.env.PORT || 8080, () => {
    console.log("Listening to port...");
  });
}
