import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://trainwithme:zAvqXZQqVVha25Js@trainwithmecluster.nh9heae.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;
