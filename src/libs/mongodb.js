import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        // Specify the database name as "api"
        await mongoose.connect("mongodb+srv://rdbernardino:123@cluster0.uykvy.mongodb.net/api?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB database: api");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectMongoDB;
