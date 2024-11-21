import React, {useState, useEffect} from 'react';
import FormDialog from '../../components/form-dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import {useDialog} from '../../contexts/dialog-context';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Typography, {Autocomplete, Stack, createFilterOptions } from '@mui/material';
import {useRouter} from 'next/router'
import {dark_green} from '../../theme/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from '@mui/material/styles';
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const filter = createFilterOptions();
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const muscles = ["Quadríceps", "Abdominais", "Peitorais", "Dorsais", "Lombar", "Bíceps", "Tríceps",
    "Posterior de coxa", "Gémeos", "Deltoides", "Trapézios", "Glúteos", "Adutores", "Abdutores"].sort();

export const AddExerciseDialog = () => {
    const router = useRouter()
    const dialog = useDialog();
    const formik = useFormik({
        initialValues: {
            name: '',
            force: '',
            primaryMuscles: null,
            instructions: '',
            videoLink: '',
            category: '',
            photo: null,
            submit: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255).required('O nome é necessário'),
            force: Yup.string().max(255).required('A força é necessária'),
            primaryMuscles: Yup.string().max(255).required('O músculo é necessário'),
            category:  Yup.string().max(255).required('A categoria é necessária')
        }),

        onSubmit: async (values, helpers) => {
            try {
                helpers.setStatus({success: true});
                helpers.setSubmitting(true);
                if (dialog.getType().type == "editex") values.id = dialog.getType().exercise._id;
                await fetch('/api/exercises', {
                    method: dialog.getType().type == "editex" ? "PUT" : "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
                helpers.setSubmitting(false);
                helpers.resetForm();
                dialog.closeDialog();
                router.reload()
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        },
    });

    
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setSelectedCategories(response);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    if (dialog.getType().type == "editex") {
        formik.setFieldValue("name", dialog.getType().exercise.name);
        formik.setFieldValue("force", dialog.getType().exercise.force);
        formik.setFieldValue("primaryMuscles", dialog.getType().exercise.primaryMuscles);
        formik.setFieldValue("instructions", dialog.getType().exercise.instructions);
        formik.setFieldValue("videoLink", dialog.getType().exercise.videoLink);
        formik.setFieldValue("category", dialog.getType().exercise.category);
        formik.setFieldValue("photo", dialog.getType().exercise.photo);
    } else {
        formik.setFieldValue("name", "");
        formik.setFieldValue("force", "");
        formik.setFieldValue("primaryMuscles", "");
        formik.setFieldValue("instructions", "");
        formik.setFieldValue("videoLink", "");
        formik.setFieldValue("category", "");
        formik.setFieldValue("photo", null);
    }
  }, [dialog]);

    return (
        <FormDialog>
            <DialogTitle>Adicionar um novo exercício</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            error={!!(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
                            label="Nome do Exercício"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                          <TextField
                            error={!!(formik.touched.force && formik.errors.force)}
                            fullWidth
                            helperText={formik.touched.force && formik.errors.force}
                            label="Força"
                            name="force"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.force}
                        />
                        <FormControl fullWidth>
                            <Autocomplete
                                id="primaryMuscles"
                                name="primaryMuscles"
                                options={muscles}
                                getOptionLabel={(option) => option}
                                onChange={(event, newValue) => {
                                    
                                    formik.values.primaryMuscles = newValue || ""
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Músculo Alvo"
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.primaryMuscles && formik.errors.primaryMuscles)}
                                        helperText={formik.touched.primaryMuscles && formik.errors.primaryMuscles}
                                    />
                                )}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                      {selected ? <CheckBoxIcon style={{ color: "green", margin: "3px" }} /> : null}
                                      {option}
                                    </li>
                                  )}

                                />
                        </FormControl>
                        <FormControl fullWidth>
                                    <Autocomplete
                                        id="category"
                                        name="category"
                                        options={selectedCategories}

                                        getOptionLabel={(option) => option}
                                        onChange={(event, newValue) => {
                                            formik.values.category = newValue || ""
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Categoria"
                                                onBlur={formik.handleBlur}
                                                error={!!(formik.touched.category && formik.errors.category)}
                                                helperText={formik.touched.category && formik.errors.category}
                                            />
                                        )}
                                        freeSolo
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);
                                    
                                            const { inputValue } = params;
                                            // Sugfgest the creation of a new value
                                            const isExisting = options.some((option) => inputValue === option);
                                            if (inputValue !== '' && !isExisting) {
                                              filtered.push(inputValue);
                                              setSelectedCategories([...selectedCategories, inputValue])
                                            }
                                    
                                            return filtered;
                                          }}
                                          renderOption={(props, option, { selected }) => (
                                            <li {...props}>
                                              {selected ? <CheckBoxIcon style={{ color: "green", margin: "3px" }} /> : null}
                                              {option}
                                            </li>
                                          )}
                                        />
                            </FormControl>

                        <TextField
                            error={!!(formik.touched.instructions && formik.errors.instructions)}
                            fullWidth
                            helperText={formik.touched.instructions && formik.errors.instructions}
                            label="Descrição"
                            name="instructions"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.instructions}
                        />
                        <TextField
                            error={!!(formik.touched.videoLink && formik.errors.videoLink)}
                            fullWidth
                            helperText={formik.touched.videoLink && formik.errors.videoLink}
                            label="Link do vídeo"
                            name="videoLink"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.videoLink}
                        />

                        <Button component="label" onChange={(event) => {
                                    let reader = new FileReader();
                                    let file = event.target.files[0];
                                    reader.onloadend = () => {
                                        formik.setFieldValue("photo", reader.result);
                                    };
                                    reader.readAsDataURL(file);}}
                                variant="contained"
                                startIcon={<CloudUploadIcon/>}>
                            {formik.values?.photo ? "Foto carregada com sucesso" : "Escolher uma foto para o exercício"}
                            <VisuallyHiddenInput name="photo" type="file"/>
                        </Button>
                    </Stack>
                    {formik.errors.submit && (
                        <Typography
                            color="error"
                            sx={{mt: 3, backgroundColor: dark_green.main}}
                            variant="body2"
                        >
                            {formik.errors.submit}
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        size="large"
                        sx={{mt: 3, backgroundColor: dark_green.main, '&:hover': {backgroundColor: dark_green.dark}}}
                        type="submit"
                        variant="contained"
                    >
                        Adicionar exercício
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={dialog.closeDialog}>Cancel</Button>
            </DialogActions>
        </FormDialog>
    );
};
