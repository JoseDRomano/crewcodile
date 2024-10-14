import {Avatar, Box, Button, CircularProgress, Container, Stack, Typography} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {Layout as DashboardLayout} from '@/layouts/dashboard/layout';
import {useEffect, useState} from 'react';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {dark_green} from '../theme/colors';
import {useDialog} from "../contexts/dialog-context"
import {AddUserDialog} from '../sections/students/add-dialog';
import {useRouter} from 'next/router';
import {formatCreatedDate} from "@/utils/format"
import NProgress from "nprogress";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { ConfirmDialog } from '@/sections/students/confirm-dialog';
const StudentsPage = () => {


    const dialog = useDialog();
    const router = useRouter();

    const [students, setStudents] = useState([]);
    useEffect(() => {
        NProgress.start()
        async function fetchMyAPI() {
            let response = await fetch('/api/students', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            response = await response.json()

            response.map((r) => {
                r.id = r._id
            })
            setStudents(response)
            NProgress.done()
        }

        fetchMyAPI()
    }, [])

    const handleDeleteClick = (id) => () => {

        const deleteAction = () =>{
            fetch('/api/students', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id})
            })
            setStudents(students.filter((s) => s.id !== id))
        }


        dialog.setDialogContent({
            title: "Eliminar um aluno",
            type: "confirmstd",
            content: "Tem a certeza que quer eliminar o aluno " + students.find((x)=>x.id == id).name + "?",
            action: deleteAction
        })
      };

      const handleEditClick = (id) => () =>{
        //set popup content
        dialog.setDialogContent({
            title: "Editar um aluno",
            type: "editstd",
            user: students.find((x)=>x.id == id)
        })
        
      }
      

    const columns = [
        {field: 'photo', headerName: 'Avatar', width: 100, renderCell: (params) => <Avatar src={params.value}/>},
        {field: 'name', headerName: 'Nome', width: 200},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'objective', headerName: 'Objetivo', width: 200},
        {field: 'weight', headerName: 'Peso (kg)', width: 100},
        {field: 'height', headerName: 'Altura (cm)', width: 100},
        {field: 'bodyFat', headerName: 'Massa Gorda (%)', width: 130},
        {
            field: 'createdAt',
            headerName: 'Data de Criação',
            width: 200,
            renderCell: (params) => formatCreatedDate(params.value)
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Editar/Remover',
            width: 150,
            cellClassName: 'actions',
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
              
            }
        }
    ];

    const handleRowClick = (params) => {
        router.push(`/students/${params.id}`)
    };

    return (
        <>

        {dialog.getType().type == "confirmstd" ? <ConfirmDialog/>:<AddUserDialog/>}
        
        
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={3}
                >
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        Alunos
                    </Typography>
                </Stack>
                <Button
                    startIcon={<PlusIcon/>}
                    variant="contained"
                    sx={{
                        backgroundColor: dark_green.main,
                    }}
                    onClick={() => {
                        dialog.setDialogContent({
                            title: "Adicionar um novo Aluno",
                            type: "createstd",
                        })
                    }}
                >
                    Adicionar Aluno
                </Button>
            </Container>
            <Container maxWidth="xl">
                <Stack spacing={3}>
                    <DataGrid
                        onRowClick={handleRowClick}
                        rows={students}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 10},
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

StudentsPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default StudentsPage;
