import { Box, Button, Container, Fade, Modal, Stack, Typography } from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Image from "next/image";
import { dark_green } from "../theme/colors";
import { useDialog } from "../contexts/dialog-context";
import { AddExerciseDialog } from "../sections/exercises/add-dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/sections/students/confirm-dialog";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const dialog = useDialog();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/api/exercises", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      response.map((r) => {
        r.id = r._id;
      });
      setExercises(response);
    }

    fetchMyAPI();
  }, []);

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("false");
  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (value) => {
    setImage(value);
    setOpen(true);
  };

  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleDeleteClick = (id) => () => {
    const deleteAction = () => {
      fetch("/api/exercises", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setExercises(exercises.filter((s) => s.id !== id));
    };

    dialog.setDialogContent({
      title: "Eliminar um exercício",
      type: "confirmex",
      content:
        "Tem a certeza que quer eliminar o exercício '" +
        exercises.find((x) => x.id == id).name +
        "'?",
      action: deleteAction,
    });
  };

  const handleEditClick = (id) => () => {
    //set popup content
    dialog.setDialogContent({
      title: "Editar um exercício",
      type: "editex",
      exercise: exercises.find((x) => x.id == id),
    });
  };

  const columns = [
    {
      field: "photo",
      headerName: "Foto",
      width: 95,
      sortable: false,
      renderCell: (params) => (
        <Image
          onClick={() => (params?.value?.length > 0 ? handleImage(params.value[0]) : "")}
          alt={params?.value?.length > 0 ? params?.value[0] : "no-photo"}
          style={{ borderRadius: "10px" }}
          height={75}
          width={75}
          src={params?.value?.length > 0 ? params.value[0] : "/no-photo.png"}
        />
      ),
    },
    { field: "name", headerName: "Exercício", width: 150 },
    {
      field: "force",
      headerName: "Força",
      width: 130,
      sortingOrder: ["desc", "asc"],
      renderCell: (params) => (params.value ? capitalizeFirst(params.value) : ""),
    },
    {
      field: "primaryMuscles",
      headerName: "Músculo Alvo",
      width: 130,
      sortingOrder: ["desc", "asc"],
      renderCell: (params) => (params.value ? capitalizeFirst(params.value[0]) : ""),
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 130,
      sortingOrder: ["desc", "asc"],
      renderCell: (params) => (params.value ? capitalizeFirst(params.value) : ""),
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

  return (
    <>
      {dialog.getType().type == "confirmex" ? <ConfirmDialog /> : <AddExerciseDialog />}
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
              Bibilioteca de exercícios
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
              dialog.openDialog();
            }}
          >
            Adicionar Exercício
          </Button>
        </Container>
        <br />
        <Container maxWidth="xl">
          <Modal
            style={{
              position: "fixed",
              "z-index": 1300,
              right: 0,
              bottom: 0,
              top: 0,
              left: 0,
              margin: "auto",
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
            }}
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={open} timeout={500}>
              <img src={image} alt="asd" style={{ maxHeight: "90%", maxWidth: "90%" }} />
            </Fade>
          </Modal>
          <Stack spacing={3}>
            <DataGrid
              rows={exercises}
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

ExercisesPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ExercisesPage;
