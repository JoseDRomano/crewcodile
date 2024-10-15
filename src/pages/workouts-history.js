import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { dark_green } from "../theme/colors";
import { useDialog } from "../contexts/dialog-context";
import { AddWorkoutHistoryDialog } from "../sections/workouts-history/add-dialog";
import { formatCreatedDate } from "@/utils/format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { ConfirmDialog } from "@/sections/students/confirm-dialog";

const WorkoutHistoryPage = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  const dialog = useDialog();

  useEffect(() => {

    async function fetchMyAPI() {
      let response = await fetch("/api/workoutHistory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      response.map((r) => {
        r.id = r._id;
      });
      setWorkoutHistory(response);
    }

    fetchMyAPI();
  }, []);

  const handleDeleteClick = (id) => () => {
    const deleteAction = () => {
      fetch("/api/workoutHistory", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setWorkoutHistory(workoutHistory.filter((s) => s.id !== id));
    };

    dialog.setDialogContent({
      title: "Eliminar um treino",
      type: "confirmwkh",
      content:
        "Tem a certeza que quer eliminar o treino realizado no dia " +
        formatCreatedDate(workoutHistory.find((x) => x.id == id).createdAt) +
        "?",
      action: deleteAction,
    });
  };

  const handleEditClick = (id) => () => {
    //set popup content
    dialog.setDialogContent({
      title: "Editar um treino",
      type: "editwkh",
      workout: workoutHistory.find((x) => x.id == id),
    });
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Data",
      width: 150,
      renderCell: (params) => formatCreatedDate(params.value),
    },
    { field: "workoutPlan", headerName: "Plano de treino", width: 160 },
    { field: "student", headerName: "Aluno", width: 150 },
    { field: "duration", headerName: "Duração", width: 150 },
    { field: "localization", headerName: "Localização", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Editar/Remover",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
            label="Cancel"
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
      {dialog.getType().type == "confirmwkh" ? <ConfirmDialog /> : <AddWorkoutHistoryDialog />}
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
              Histórico de reservas
            </Typography>
          </Stack>
          <br />
          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            sx={{
              backgroundColor: dark_green.main,
            }}
            onClick={() => {
                dialog.setDialogContent({
                    title: "Adicionar um nova reserva",
                    type: "createwkh",
                })
            }}
          >
            Adicionar reserva
          </Button>
        </Container>
        <br />
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <DataGrid
              rows={workoutHistory}
              columns={columns}
              pageSize={5}
              pageSizeOptions={[5, 10, 15, 20]}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

WorkoutHistoryPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default WorkoutHistoryPage;
