import React, { useEffect, useState } from "react";
import FormDialog from "../../components/form-dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { useDialog } from "../../contexts/dialog-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/router";
import { dark_green } from "../../theme/colors";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddWorkoutDialog = () => {
  const [students, setStudents] = useState([]);
  const router = useRouter();
  const [exercises, setExercises] = useState([]);

  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("/api/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      response.map((r) => {
        r.id = r._id;
      });
      setStudents(response);

      let responseExerc = await fetch("/api/exercises", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseExerc = await responseExerc.json();
      responseExerc.map((r) => {
        r.id = r._id;
      });

      const options = responseExerc.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
          firstLetter,
          ...option,
        };
      });

      setExercises(options);
    }

    fetchMyAPI();
  }, []);

  const dialog = useDialog();
  const formik = useFormik({
    initialValues: {
      name: "",
      exerciseList: [],
      students: [],
      duration: 0,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Campo obrigatório"),
      exerciseList: Yup.array()
        .min(1, "É necessário pelo menos um exercício")
        .required("Campo obrigatório"),
      students: Yup.array()
        .min(1, "É necessário pelo menos um aluno")
        .required("Campo obrigatório"),
      duration: Yup.number()
        .required("Campo obrigatório")
        .positive("O número tem que ser positivo")
        .integer("A duração tem que ser um número inteiro"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        /*TODO: um dia mais tarde, ou nunca.
         * its a bit little martelada, mas tava sem paciencia e já eram 4h da manhã
         */

        if (dialog.getType().type == "editwk") values.id = dialog.getType().workout._id;

        let valid = values.exerciseList.map((ex) => {
          return (
            ex.sets != "" &&
            ex.sets > 0 &&
            ex.reps != "" &&
            ex.reps > 0 &&
            ex.recoveryTime != "" &&
            ex.recoveryTime > 0
          );
        });
        if (valid[0]) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(true);
          await fetch("/api/workouts", {
            method: dialog.getType().type == "editwk" ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          helpers.setSubmitting(false);
          helpers.resetForm();
          dialog.closeDialog();
          router.reload();
        }
      } catch (err) {
        console.log("err", err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    let update = selectedExercises.map((ex) => ({
      name: ex?.name,
      sets: "",
      reps: "",
      recoveryTime: "",
    }));

    formik.values.exerciseList = update;
  }, [selectedExercises, setSelectedExercises]);

  useEffect(() => {
    if (dialog.getType().type == "editwk") {
      const { name, exerciseList, students, duration } = dialog.getType().workout;
      console.log(students)
      formik.setFieldValue("name", name);
      formik.setFieldValue("exerciseList", exerciseList);
      formik.setFieldValue("students", students);
      formik.setFieldValue("duration", duration);
    } else {
      formik.setFieldValue("name", "");
      formik.setFieldValue("exerciseList", []);
      formik.setFieldValue("students", []);
      formik.setFieldValue("duration", "");
    }
  }, [dialog]);

  return (
    <FormDialog>
      <DialogTitle>Adicionar um novo plano de treino</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
              label="Nome"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            <FormControl sx={{ m: 1, width: 300 }}>
              <Autocomplete
                multiple
                id="exerciseList"
                name="exerciseList"
                options={exercises}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  setSelectedExercises(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lista de exercícios"
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.exerciseList && formik.errors.exerciseList)}
                    helperText={formik.touched.exerciseList && formik.errors.exerciseList}
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    {selected ? <CheckBoxIcon style={{ color: "green", margin: "3px" }} /> : null}
                    {option.name}
                  </li>
                )}
                renderTags={(value) =>
                  value.map((option, index) => (
                    <Typography key={index} fontSize={14}>
                      {option.name}
                      {index == value.length - 1 ? "" : ","}
                    </Typography>
                  ))
                }
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>
              {selectedExercises?.map((exercise, idx) => {
                return (
                  <div key={idx} style={{ margin: 15 }}>
                    <Typography key={idx} fontSize={14}>
                      {exercise?.name}
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                      <TextField
                        label="Sets"
                        name={`exerciseList.${idx}.sets`}
                        type="number"
                        onChange={formik.handleChange}
                        error={
                          formik.values.exerciseList[idx]?.sets == "" ||
                          formik.values.exerciseList[idx]?.sets <= 0
                        }
                        onBlur={formik.handleBlur}
                        helperText={
                          (formik.values.exerciseList[idx]?.sets == "" ||
                            formik.values.exerciseList[idx]?.sets <= 0) &&
                          "Valor inválido"
                        }
                      />
                      <TextField
                        label="Reps"
                        name={`exerciseList.${idx}.reps`}
                        type="number"
                        onChange={formik.handleChange}
                        error={
                          formik.values.exerciseList[idx]?.reps == "" ||
                          formik.values.exerciseList[idx]?.reps <= 0
                        }
                        helperText={
                          (formik.values.exerciseList[idx]?.reps == "" ||
                            formik.values.exerciseList[idx]?.reps <= 0) &&
                          "Valor inválido"
                        }
                      />
                      <TextField
                        label="Descanso"
                        name={`exerciseList.${idx}.recoveryTime`}
                        type="number"
                        onChange={formik.handleChange}
                        error={
                          formik.values.exerciseList[idx]?.recoveryTime == "" ||
                          formik.values.exerciseList[idx]?.recoveryTime <= 0
                        }
                        helperText={
                          (formik.values.exerciseList[idx]?.recoveryTime == "" ||
                            formik.values.exerciseList[idx]?.recoveryTime <= 0) &&
                          "Valor inválido"
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }}>

              <Autocomplete 
              multiple
              id="students"
              name="students"
              options={students}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                formik.values.students = newValue.map((x) => x.name);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alunos"
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.students && formik.errors.students)}
                  helperText={formik.touched.students && formik.errors.students}
                />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  {selected ? <CheckBoxIcon style={{ color: "green", margin: "3px" }} /> : null}
                  {option.name}
                </li>
              )}
            />
            </FormControl>

            <TextField
              error={!!(formik.touched.duration && formik.errors.duration)}
              fullWidth
              helperText={formik.touched.duration && formik.errors.duration}
              label="Duração"
              name="duration"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.duration}
              type="number"
            />
          </Stack>
          {formik.errors.submit && (
            <Typography color="error" sx={{ mt: 3, backgroundColor: dark_green.main }} variant="body2">
              {formik.errors.submit}
            </Typography>
          )}
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3, backgroundColor: dark_green.main, "&:hover": { backgroundColor: dark_green.dark } }}
            type="submit"
            variant="contained"
            onClick={() => {
              console.log("errors", formik.errors);
            }}
          >
            Adicionar plano de treino
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.closeDialog}>Cancel</Button>
      </DialogActions>
    </FormDialog>
  );
};
