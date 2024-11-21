import FormDialog from "@/components/form-dialog";
import { useDialog } from "../../contexts/dialog-context";
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export const ConfirmDialog = () => {
  const dialog = useDialog();

    return (
      <FormDialog>
        <DialogTitle>{dialog.getType().title}</DialogTitle>
        <DialogContent>
          <Typography>{dialog.getType().content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.closeDialog}>No</Button>
          <Button
            onClick={() => {
              dialog.getType().action();
              dialog.closeDialog();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </FormDialog>
    );

};
