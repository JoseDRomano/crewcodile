import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { dark_green } from "../theme/colors";
import { useDialog } from "../contexts/dialog-context";
import { AddUserDialog } from "../sections/staff/add-dialog"; // Staff-specific Add Dialog
import { useRouter } from "next/router";
import { formatCreatedDate } from "@/utils/format";
import NProgress from "nprogress";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ConfirmDialog } from "@/sections/staff/confirm-dialog"; // Staff-specific Confirm Dialog

const StaffPage = () => {
    const dialog = useDialog();
    const router = useRouter();

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        NProgress.start();
        async function fetchMyAPI() {
            let response = await fetch("/api/staff", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            response = await response.json();

            response.map((r) => {
                r.id = r._id;
            });
            setStaff(response);
            NProgress.done();
        }

        fetchMyAPI();
    }, []);

    const handleDeleteClick = (id) => () => {
        const deleteAction = () => {
            fetch("/api/staff", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            setStaff(staff.filter((s) => s.id !== id));
        };

        dialog.setDialogContent({
            title: "Remove a staff member",
            type: "confirmstaff",
            content:
                "Are you sure you want to remove the staff member " +
                staff.find((x) => x.id == id).name +
                "?",
            action: deleteAction,
        });
    };

    const handleEditClick = (id) => () => {
        dialog.setDialogContent({
            title: "Edit a staff member",
            type: "editstaff",
            user: staff.find((x) => x.id == id),
        });
    };

    const handleViewClick = (id) => () => {
        router.push(`/staff/${id}`);
    };

    const columns = [
        {
            field: "view",
            headerName: "",
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <VisibilityIcon
                    sx={{ cursor: "pointer", color: "primary.main" }}
                    onClick={handleViewClick(params.row.id)}
                />
            ),
        },
        {
            field: "photo",
            headerName: "Photo",
            width: 100,
            renderCell: (params) => <Avatar src={params.value} />,
        },
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "role", headerName: "Role", width: 150 },
        { field: "restaurant", headerName: "Restaurant", width: 150 },
        {
            field: "createdAt",
            headerName: "Creation Date",
            width: 200,
            renderCell: (params) => formatCreatedDate(params.value),
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Edit/Remove",
            width: 150,
            cellClassName: "actions",
            getActions: ({ id }) => [
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
            ],
        },
    ];

    return (
        <>
            {dialog.getType().type == "confirmstaff" ? (
                <ConfirmDialog />
            ) : (
                <AddUserDialog />
            )}

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
                            Staff Members
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
                                title: "Add a new staff member",
                                type: "createstaff",
                            });
                        }}
                    >
                        Add Staff Member
                    </Button>
                </Container>
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <DataGrid
                            rows={staff}
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

StaffPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StaffPage;
