import connectMongoDB from "../../libs/mongodb";
import RestaurantMenu from "../../DB/models/RestaurantMenu";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await connectMongoDB();
            res.status(200).json(await RestaurantMenu.find());
            break;
        case "POST":
            await addMenuItem(req, res);
            break;
        case "DELETE":
            await deleteMenuItem(req, res);
            break;
        case "PUT":
            await updateMenuItem(req, res);
            break;
        default:
            res.status(405).json({ message: "Method Not Allowed" });
    }
}

async function addMenuItem(req, res) {
    try {
        const { name, category, description, price, image } = req.body;

        await connectMongoDB();
        const newMenuItem = await RestaurantMenu.create({ name, category, description, price, image });

        res.status(200).json({ message: "Menu Item Created", menu: newMenuItem });
    } catch (error) {
        console.error("Error in addMenuItem:", error);
        res.status(500).json({ message: "Failed to create menu item", error });
    }
}

async function deleteMenuItem(req, res) {
    try {
        const { id } = req.body;

        await connectMongoDB();
        await RestaurantMenu.findByIdAndDelete(id);
        res.status(200).json({ message: "Menu Item Deleted" });
    } catch (error) {
        console.error("Error in deleteMenuItem:", error);
        res.status(500).json({ message: "Failed to delete menu item", error });
    }
}

async function updateMenuItem(req, res) {
    try {
        const { id, name, category, description, price, image } = req.body;

        await connectMongoDB();
        const updatedMenuItem = await RestaurantMenu.findByIdAndUpdate(
            id,
            { name, category, description, price, image },
            { new: true }
        );

        res.status(200).json({ message: "Menu Item Updated", menu: updatedMenuItem });
    } catch (error) {
        console.error("Error in updateMenuItem:", error);
        res.status(500).json({ message: "Failed to update menu item", error });
    }
}
