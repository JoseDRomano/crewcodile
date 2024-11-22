import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        // Specify the database name as "api"
        await mongoose.connect("mongodb+srv://romano:romano$$$@cluster0.g6hrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB database: api");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectMongoDB;
