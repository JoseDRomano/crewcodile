import React, { useEffect } from "react";
import FormDialog from "../../components/form-dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDialog } from "../../contexts/dialog-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import Typography, { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { dark_green } from "../../theme/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ConfirmDialog } from "./confirm-dialog";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const AddUserDialog = () => {
  const dialog = useDialog();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      objective: "",
      weight: "",
      height: "",
      bodyFat: "",
      photo: null,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("O nome é necessário"),
      email: Yup.string()
        .email("O email tem que ser válido")
        .max(255)
        .required("O email é necessário"),
      objective: Yup.string().max(255).required("O objetivo é necessário."),
      weight: Yup.number().positive("O peso deve ser positivo").required("O peso é necessário."),
      height: Yup.number().positive("A altura deve ser positiva").required("A altura é necessária"),
      bodyFat: Yup.number()
        .positive("A massa gorda deve ser positiva")
        .required("A massa gorda(%) é necessária"),
    }),
    onSubmit: async (values, helpers) => {
      //console.log(values);
      try {
        //add student to db

        const addMessage = `Ao adicionar um novo estudante, irá ser enviado para o email ${values.email} uma palavra-passe gerada para o mesmo aceder ao website.`;
        const editMessage = `Tem a certeza que quer editar o estudante ${values.email}?`;

        helpers.setStatus({ success: true });
        helpers.setSubmitting(true);

        if (dialog.getType().type == "editstd") values.id = dialog.getType().user._id;

        const addEditUserAction = () => {
          fetch("/api/students", {
            method: dialog.getType().type == "editstd" ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          
        helpers.setSubmitting(false);
        helpers.resetForm();
        dialog.closeDialog();

        router.reload();
        };

        dialog.setDialogContent({
          title: dialog.getType().type == "editstd" ? "Editar um aluno" : "Adicionar um aluno",
          type: "confirmstd",
          content: dialog.getType().type == "editstd" ? editMessage : addMessage,
          action: addEditUserAction,
        });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (dialog.getType().type == "editstd") {
      formik.setFieldValue("name", dialog.getType().user.name);
      formik.setFieldValue("email", dialog.getType().user.email);
      formik.setFieldValue("objective", dialog.getType().user.objective);
      formik.setFieldValue("weight", dialog.getType().user.weight);
      formik.setFieldValue("height", dialog.getType().user.height);
      formik.setFieldValue("bodyFat", dialog.getType().user.bodyFat);
      formik.setFieldValue("photo", dialog.getType().user.photo);
    } else {
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("objective", "");
      formik.setFieldValue("weight", "");
      formik.setFieldValue("height", "");
      formik.setFieldValue("bodyFat", "");
      formik.setFieldValue("photo", null);
    }
  }, [dialog]);

  return (
    <FormDialog>
      <DialogTitle>{dialog.getType().title}</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              error={!!(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nome"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              error={!!(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
            />
            <TextField
              error={!!(formik.touched.objective && formik.errors.objective)}
              fullWidth
              helperText={formik.touched.objective && formik.errors.objective}
              label="Objetivo (Ex: ganho de massa muscular)"
              name="objective"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.objective}
            />
            <TextField
              error={!!(formik.touched.weight && formik.errors.weight)}
              fullWidth
              helperText={formik.touched.weight && formik.errors.weight}
              label="Peso (kg)"
              name="weight"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.weight}
            />
            <TextField
              error={!!(formik.touched.height && formik.errors.height)}
              fullWidth
              helperText={formik.touched.height && formik.errors.height}
              label="Altura (cm)"
              name="height"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.height}
            />
            <TextField
              error={!!(formik.touched.bodyFat && formik.errors.bodyFat)}
              fullWidth
              helperText={formik.touched.bodyFat && formik.errors.bodyFat}
              label="Massa Gorda (%)"
              name="bodyFat"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.bodyFat}
            />
            <Button
              component="label"
              onChange={(event) => {
                let reader = new FileReader();
                let file = event.target.files[0];
                reader.onloadend = () => {
                  formik.setFieldValue("photo", reader.result);
                };
                reader.readAsDataURL(file);
              }}
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              {formik.values?.photo
                ? "Foto carregada com sucesso"
                : "Escolher uma foto para o aluno"}
              <VisuallyHiddenInput name="photo" type="file" />
            </Button>
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
            {dialog.getType().type == "editstd" ? "Editar" : "Adicionar"} aluno
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.closeDialog}>Cancel</Button>
      </DialogActions>
    </FormDialog>
  );
};
