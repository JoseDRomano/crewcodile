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
      role: "",
      restaurant: "",
      photo: null,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("The name is necessary"),
      role: Yup.string().max(255).required("The role is necessary"),
      restaurant: Yup.string().max(255).required("The restaurant is necessary"),
      email: Yup.string()
        .email("The email address must be valid")
        .max(255)
        .required("The email is necessary")
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      try {
        //add staff member to db

        const addMessage = `By adding this new staff member, an email will be sent to ${values.email}.`;
        const editMessage = `Are you sure you want to add the staff member ${values.email}?`;

        helpers.setStatus({ success: true });
        helpers.setSubmitting(true);

        if (dialog.getType().type == "editstaff") values.id = dialog.getType().user._id;

        const addEditUserAction = () => {
          console.log("Sending request to the server...");
          fetch("/api/staff", {
            method: dialog.getType().type == "editstaff" ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
              .then(response => response.json())
              .then(data => {
                console.log("Response from the server:", data);
              })
              .catch(error => {
                console.error("Error during fetch:", error);
              });

        helpers.setSubmitting(false);
        helpers.resetForm();
        dialog.closeDialog();

        router.reload();
        };

        dialog.setDialogContent({
          title: dialog.getType().type == "editstaff" ? "Edit a staff member" : "Add a staff member",
          type: "confirmstaff",
          content: dialog.getType().type == "editstaff" ? editMessage : addMessage,
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
    if (dialog.getType().type == "editstaff") {
      formik.setFieldValue("name", dialog.getType().user.name);
      formik.setFieldValue("email", dialog.getType().user.email);
      formik.setFieldValue("role", dialog.getType().user.role);
      formik.setFieldValue("restaurant", dialog.getType().user.restaurant);
      formik.setFieldValue("photo", dialog.getType().user.photo);
    } else {
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("role", "");
      formik.setFieldValue("restaurant", "");
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
                error={!!(formik.touched.role && formik.errors.role)}
                fullWidth
                helperText={formik.touched.role && formik.errors.role}
                label="Role"
                name="role"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role}
            />
            <TextField
                error={!!(formik.touched.restaurant && formik.errors.restaurant)}
                fullWidth
                helperText={formik.touched.restaurant && formik.errors.restaurant}
                label="Restaurant"
                name="restaurant"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.restaurant}
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
                ? "Photo uploaded successfully"
                : "Choose a photo for the  staff member"}
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
            {dialog.getType().type == "editstaff" ? "Edit" : "Add"} Staff Member
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.closeDialog}>Cancel</Button>
      </DialogActions>
    </FormDialog>
  );
};
