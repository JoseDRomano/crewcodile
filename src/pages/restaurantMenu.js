import { Avatar, Box, Button, Container, Stack, Typography } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { dark_green } from "../theme/colors";
import { useDialog } from "../contexts/dialog-context";
import { AddRestaurantMenuDialog } from "../sections/restaurantMenu/add-dialog"; 
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { ConfirmDialog } from "@/sections/restaurantMenu/confirm-dialog"; 
const RestaurantMenuPage = () => {
    const dialog = useDialog();

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        async function fetchMenuItems() {
            let response = await fetch("/api/restaurantMenu", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            response = await response.json();

            response.map((r) => {
                r.id = r._id;
            });
            setMenuItems(response);
        }

        fetchMenuItems();
    }, []);

    const handleDeleteClick = (id) => () => {
        const deleteAction = () => {
            fetch("/api/restaurantMenu", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            setMenuItems(menuItems.filter((item) => item.id !== id));
        };

        dialog.setDialogContent({
            title: "Remove a menu item",
            type: "confirmmenu",
            content:
                "Are you sure you want to remove the menu item '" +
                menuItems.find((x) => x.id == id).name +
                "'?",
            action: deleteAction,
        });
    };

    const handleEditClick = (id) => () => {
        dialog.setDialogContent({
            title: "Edit a menu item",
            type: "editmenu",
            item: menuItems.find((x) => x.id == id),
        });
    };

    const columns = [
        { field: "image", headerName: "Image", width: 100, renderCell: (params) => <Avatar src={params.value} /> },
        { field: "name", headerName: "Name", width: 200 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "price", headerName: "Price", width: 100, renderCell: (params) => `$${params.value.toFixed(2)}` },
        { field: "description", headerName: "Description", width: 300 },
        {
            field: "actions",
            type: "actions",
            headerName: "Edit/Remove",
            width: 150,
            cellClassName: "actions",
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<DeleteIcon />}
                        label="Delete"
                        className="textPrimary"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <>
            {dialog.getType().type == "confirmmenu" ? <ConfirmDialog /> : <AddRestaurantMenuDialog />}

            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <Stack direction="row" justifyContent="space-between" mb={3}>
                        <Typography color="textPrimary" variant="h4">
                            Restaurant Menu
                        </Typography>
                    </Stack>
                    <Button
                        startIcon={<PlusIcon />}
                        variant="contained"
                        sx={{
                            backgroundColor: dark_green.main,
                        }}
                        onClick={() => {
                            dialog.setDialogContent({
                                title: "Add a new menu item",
                                type: "createmenu",
                            });
                        }}
                    >
                        Add Menu Item
                    </Button>
                </Container>
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <DataGrid
                            rows={menuItems}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

RestaurantMenuPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RestaurantMenuPage;
