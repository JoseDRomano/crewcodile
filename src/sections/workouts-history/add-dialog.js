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
import Typography, { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { dark_green } from "../../theme/colors";
import { useRouter } from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const AddWorkoutHistoryDialog = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const router = useRouter();

  const dialog = useDialog();
  useEffect(() => {
    async function fetchMyAPI() {
      let responseStudents = await fetch("/api/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseStudents = await responseStudents.json();
      setStudents(responseStudents);

      let responseWorkouts = await fetch("/api/workouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseWorkouts = await responseWorkouts.json();
      setWorkoutPlans(responseWorkouts);
    }

    fetchMyAPI();
  }, []);

  const formik = useFormik({
    initialValues: {
      student: null,
      workoutPlan: null,
      localization: "",
      duration: null,
      submit: null,
    },
    validationSchema: Yup.object().shape({
      student: Yup.string().required("Aluno é obrigatório"),
      workoutPlan: Yup.string().required("Plano de treino é obrigatório"),
      localization: Yup.string().required("Localização é obrigatório"),
      duration: Yup.number()
        .required("Duração é obrigatório")
        .integer("Duração é um número inteiro")
        .positive("Tem de ser um número positivo"),
    }),

    onSubmit: async (values, helpers) => {
      try {

        if (dialog.getType().type == "editwkh") values.id = dialog.getType().workout._id;

        helpers.setStatus({ success: true });
        helpers.setSubmitting(true);
        await fetch("/api/workoutHistory", {
          method: dialog.getType().type == "editwkh" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        helpers.setSubmitting(false);
        helpers.resetForm();
        dialog.closeDialog();
        router.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (dialog.getType().type == "editwkh") {
      formik.setFieldValue("student", dialog.getType().workout.student);
      formik.setFieldValue("workoutPlan", dialog.getType().workout.workoutPlan);
      formik.setFieldValue("localization", dialog.getType().workout.localization);
      formik.setFieldValue("duration", dialog.getType().workout.duration);
    } else {
      formik.setFieldValue("student", null);
      formik.setFieldValue("workoutPlan", "");
      formik.setFieldValue("localization", "");
      formik.setFieldValue("duration", null);
    }
  }, [dialog]);

  return (
    <FormDialog>
      <DialogTitle>Adicionar um novo registo de treino</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <Autocomplete
                id="student"
                name="student"
                options={students}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  formik.values.student = newValue?.name || "";
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Aluno"
                    onBlur={formik.handleBlur}
                    error={!!(formik.touched.student && formik.errors.student)}
                    helperText={formik.touched.student && formik.errors.student}
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={props.id + Math.random()}>
                    {selected ? <CheckBoxIcon style={{ color: "green", margin: "3px" }} /> : null}
                    {option.name}
                  </li>
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Autocomplete
              id="workoutPlan"
              name="workoutPlan"
              options={workoutPlans}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                formik.values.workoutPlan = newValue?.name || "";
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Plano de treino"
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.workoutPlan && formik.errors.workoutPlan)}
                  helperText={formik.touched.workoutPlan && formik.errors.workoutPlan}
                />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={props.id + Math.random()}>
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
            <TextField
              error={!!(formik.touched.localization && formik.errors.localization)}
              fullWidth
              helperText={formik.touched.localization && formik.errors.localization}
              label="Localização"
              name="localization"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.localization}
            />
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
          >
            Adicionar treino
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.closeDialog}>Cancel</Button>
      </DialogActions>
    </FormDialog>
  );
};
