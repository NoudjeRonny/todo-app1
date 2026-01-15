import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL

        if (!mongoUrl) {
            throw new Error("MONGO_URL is undefined. Check your .env file")
        }

        await mongoose.connect(mongoUrl)
        console.log("Successfully connected to the database")
    } catch (error) {
        console.error("Error connecting to database:", error.message)
        process.exit(1)
    }
}

export default connectDb
