import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Stack, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { useDialog } from "../contexts/dialog-context";
import { AddRestaurantMenuDialog } from "../sections/restaurantMenu/add-dialog";
import { ConfirmDialog } from "@/sections/restaurantMenu/confirm-dialog";

const RestaurantMenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isRemoveMode, setIsRemoveMode] = useState(false); 
    const dialog = useDialog();

    useEffect(() => {
        // Fetch menu items from the backend
        const fetchMenuItems = async () => {
            const response = await fetch("/api/restaurantMenu");
            const data = await response.json();
            setMenuItems(data);
        };
        fetchMenuItems();
    }, []);

    const handleEditClick = (item) => () => {
        dialog.setDialogContent({
            title: "Edit Menu Item",
            type: "editmenu",
            item,
        });
    };

    const handleAddDish = () => {
        dialog.setDialogContent({
            title: "Add New Dish",
            type: "createmenu",
        });
    };

    const handleRemoveDish = (item) => {
        dialog.setDialogContent({
            title: "Remove Menu Item",
            type: "confirmmenu",
            content: `Are you sure you want to remove the dish "${item.name}"?`,
            action: async () => {
                // Delete the dish from the backend
                await fetch("/api/restaurantMenu", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: item._id }),
                });
                // Remove the dish locally
                setMenuItems((prevItems) => prevItems.filter((dish) => dish._id !== item._id));
                dialog.closeDialog();
            },
        });
    };

    return (
        <>
            {/* Dialogs */}
            {dialog.getType().type === "confirmmenu" ? <ConfirmDialog /> : <AddRestaurantMenuDialog />}

            <Box sx={{ p: 3, backgroundColor: "background.default", minHeight: "100%" }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Restaurant Menu
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleAddDish}>
                        Add Dish
                    </Button>
                    <Button
                        variant="contained"
                        color={isRemoveMode ? "error" : "secondary"}
                        onClick={() => setIsRemoveMode((prev) => !prev)} // Ativa ou desativa o modo de remoção
                    >
                        {isRemoveMode ? "Cancel Remove" : "Remove Dish"}
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {menuItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Box
                                sx={{
                                    border: "1px solid #ccc",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    position: "relative",
                                    backgroundColor: "white",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {/* Image */}
                                <Box
                                    component="img"
                                    src={item.image || "/placeholder-image.png"}
                                    alt={item.name}
                                    sx={{
                                        width: "100%",
                                        height: 200,
                                        objectFit: "cover",
                                    }}
                                />

                                {/* Content */}
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {item.description || "No description available."}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                </Box>

                                {/* Edit Button */}
                                {!isRemoveMode && (
                                    <IconButton
                                        onClick={handleEditClick(item)}
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                )}

                                {/* Remove Button */}
                                {isRemoveMode && (
                                    <IconButton
                                        onClick={() => handleRemoveDish(item)}
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            left: 10,
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

RestaurantMenuPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RestaurantMenuPage;
