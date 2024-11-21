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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
      role: "Manager", // Valor padrão
      restaurant: "LIS1 - Vasco da Gama", // Valor padrão
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
        .required("The email is necessary"),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
      try {
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
            .then((response) => response.json())
            .then((data) => {
              console.log("Response from the server:", data);
            })
            .catch((error) => {
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
          content:
            dialog.getType().type == "editstaff"
              ? `Are you sure you want to edit the staff member ${values.email}?`
              : `Are you sure you want to add this new staff member?`,
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
      formik.setFieldValue("role", "default-role"); // Valor padrão
      formik.setFieldValue("restaurant", "default-restaurant"); // Valor padrão
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
              label="Name"
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
            <FormControl fullWidth error={!!(formik.touched.role && formik.errors.role)}>
              <InputLabel>Role</InputLabel>
              <Select
                fullWidth
                label="Role"
                name="role"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role || ""}
              >
                <MenuItem value="" disabled>
                  Select a role
                </MenuItem>
                <MenuItem value="Chef">Chef</MenuItem>
                <MenuItem value="Cook">Cook</MenuItem>
                <MenuItem value="Dishwasher">Dishwasher</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Waiter">Waiter</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role && (
                <Typography color="error">{formik.errors.role}</Typography>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={!!(formik.touched.restaurant && formik.errors.restaurant)}
            >
              <InputLabel>Restaurant</InputLabel>
              <Select
                fullWidth
                label="Restaurant"
                name="restaurant"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.restaurant || ""}
              >
                <MenuItem value="" disabled>
                  Select a restaurant
                </MenuItem>
                <MenuItem value="ALMD1 - Praça de Almada">ALMD1 - Praça de Almada</MenuItem>
                <MenuItem value="ALMD2 - Almada fórum">ALMD2 - Almada fórum</MenuItem>
                <MenuItem value="LIS1 - Vasco da Gama">LIS1 - Vasco da Gama</MenuItem>
                <MenuItem value="LIS2 - Amoreiras">LIS2 - Amoreiras</MenuItem>
                <MenuItem value="LIS3 - Colombo">LIS3 - Colombo</MenuItem>
              </Select>
              {formik.touched.restaurant && formik.errors.restaurant && (
                <Typography color="error">{formik.errors.restaurant}</Typography>
              )}
            </FormControl>
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
                : "Choose a photo for the staff member"}
              <VisuallyHiddenInput name="photo" type="file" />
            </Button>
          </Stack>
          {formik.errors.submit && (
            <Typography
              color="error"
              sx={{ mt: 3, backgroundColor: dark_green.main }}
              variant="body2"
            >
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
