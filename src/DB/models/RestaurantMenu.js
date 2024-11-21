import mongoose, { Schema } from "mongoose";

const RestaurantMenuSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the dish/item
    category: { type: String, required: true }, // Category (e.g., appetizer, main course, dessert)
    description: { type: String }, // Description of the dish
    price: { type: Number, required: true }, // Price of the dish
    image: { type: String }, // URL to the dish image
    createdAt: { type: Date, default: Date.now }, // Creation date
});

const RestaurantMenu = mongoose.models?.RestaurantMenu || mongoose.model("RestaurantMenu", RestaurantMenuSchema, "restaurant_menu");

export default RestaurantMenu;
