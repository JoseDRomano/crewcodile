import { Box, Button, Container, Stack, Typography, Tooltip } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { dark_green } from "../theme/colors";
import { useDialog } from "../contexts/dialog-context";
import { AddWorkoutDialog } from "../sections/workouts/add-dialog";
import { useEffect, useState } from "react";
import { formatCreatedDate } from "@/utils/format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { ConfirmDialog } from "@/sections/staff/confirm-dialog";

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);

  const dialog = useDialog();

  const handleDeleteClick = (id) => () => {
    const deleteAction = () => {
      fetch("/api/workouts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setWorkouts(workouts.filter((s) => s.id !== id));
    };

    dialog.setDialogContent({
      title: "Eliminar um treino",
      type: "confirmwk",
      content:
        "Tem a certeza que quer eliminar o treino " + workouts.find((x) => x.id == id).name + "?",
      action: deleteAction,
    });
  };

  const handleEditClick = (id) => () => {
    //set popup content
    dialog.setDialogContent({
      title: "Editar um treino",
      type: "editwk",
      workout: workouts.find((x) => x.id == id),
    });
  };

  const columns = [
    { field: "name", headerName: "Nome do Plano de Treino", width: 250 },
    {
      field: "duration",
      headerName: "Duração",
      width: 150,
      renderCell: (params) => params.value + " minutos",
    },
    {
      field: "students",
      headerName: "Alunos",
      width: 300,
      renderCell: (params) => {
        let x = params.value;
        return x && x.length > 0 ? x.length + " - ( " + x.join(", ") + " )" : "";
      },
    },
    {
      field: "exerciseList",
      headerName: "Exercícios",
      width: "300",
      sortable: false,
      renderCell: (params) => {
        const formatExercise = (exercise) => {
          return `${exercise.name} (${exercise.sets}x${exercise.reps})`;
        };

        let all = params.value
          .map((x) => {
            return `${formatExercise(x)}`;
          })
          .join(", ");

        return (
          <Tooltip
            title={
              <ul>
                {params.value.map((ex, idx) => {
                  return <li key={idx}>{formatExercise(ex)}</li>;
                })}
              </ul>
            }
          >
            <span className="table-cell-trucate">{all}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Data de Criação",
      renderCell: (params) => formatCreatedDate(params.value),
    },
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

  useEffect(() => {

    async function fetchMyAPI() {
      let response = await fetch("/api/workouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      response.map((r) => {
        r.id = r._id;
      });
      setWorkouts(response);
    }

    fetchMyAPI();
  }, []);

  return (
    <>
      {dialog.getType().type == "confirmwk" ? <ConfirmDialog /> : <AddWorkoutDialog />}

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
              Planos de treino
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
                    title: "Adicionar um novo treino",
                    type: "createwk",
                })
            }}
          >
            Adicionar planos de treino
          </Button>
        </Container>
        <br />
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <DataGrid rows={workouts} columns={columns} pageSizeOptions={[5, 10]} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

WorkoutsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default WorkoutsPage;
