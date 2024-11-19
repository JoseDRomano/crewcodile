import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rdbernardino:123@cluster0.uykvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;
