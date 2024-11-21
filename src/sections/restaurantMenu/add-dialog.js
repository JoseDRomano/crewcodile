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

export const AddRestaurantMenuDialog = () => {
  const dialog = useDialog();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      price: "",
      image: null,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("The name is necessary"),
      category: Yup.string().max(255).required("The category is necessary"),
      price: Yup.number().required("The price is necessary").positive("Price must be positive"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(true);

        if (dialog.getType().type == "editmenu") values.id = dialog.getType().item._id;

        const addEditMenuItemAction = () => {
          fetch("/api/restaurantMenu", {
            method: dialog.getType().type == "editmenu" ? "PUT" : "POST",
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
          title: dialog.getType().type == "editmenu" ? "Edit a menu item" : "Add a menu item",
          type: "confirmmenu",
          content:
            dialog.getType().type == "editmenu"
              ? `Are you sure you want to edit the menu item ${values.name}?`
              : `Are you sure you want to add this new menu item?`,
          action: addEditMenuItemAction,
        });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (dialog.getType().type == "editmenu") {
      formik.setFieldValue("name", dialog.getType().item.name);
      formik.setFieldValue("category", dialog.getType().item.category);
      formik.setFieldValue("description", dialog.getType().item.description);
      formik.setFieldValue("price", dialog.getType().item.price);
      formik.setFieldValue("image", dialog.getType().item.image);
    } else {
      formik.setFieldValue("name", "");
      formik.setFieldValue("category", "");
      formik.setFieldValue("description", "");
      formik.setFieldValue("price", "");
      formik.setFieldValue("image", null);
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
              error={!!(formik.touched.category && formik.errors.category)}
              fullWidth
              helperText={formik.touched.category && formik.errors.category}
              label="Category"
              name="category"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            <TextField
              error={!!(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Description"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <TextField
              error={!!(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="Price"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.price}
            />
            <Button
              component="label"
              onChange={(event) => {
                let reader = new FileReader();
                let file = event.target.files[0];
                reader.onloadend = () => {
                  formik.setFieldValue("image", reader.result);
                };
                reader.readAsDataURL(file);
              }}
              variant="contained"
            >
              {formik.values?.image ? "Image uploaded successfully" : "Upload Image"}
              <input type="file" hidden />
            </Button>
          </Stack>
          {formik.errors.submit && (
            <Typography color="error" sx={{ mt: 3 }} variant="body2">
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
            {dialog.getType().type == "editmenu" ? "Edit" : "Add"} Menu Item
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialog.closeDialog}>Cancel</Button>
      </DialogActions>
    </FormDialog>
  );
};
