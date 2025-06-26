const { connect } = require("mongoose");
const dotenv = require("dotenv/config");

async function connectToMongoDB() {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ipak_yoli_banki";
        await connect(mongoURI)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error?.message || error}`);
        process.exit(1);
    }
}

module.exports = connectToMongoDB   