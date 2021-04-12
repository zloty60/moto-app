import { useState } from "react";
import {
  Card,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteOffer,
  closeOfferError,
} from "./../../redux/actions/offerActions";

export function SellerActionCard({ id, error, errorMsg, loading }) {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    dispatch(closeOfferError());
  };

  return (
    <>
      <Card>
        <Box p={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/edytuj/${id}`}
          >
            edytuj ogłoszenie
          </Button>
          <Box mr={2} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDialog(true)}
          >
            usuń ogłoszenie
          </Button>
        </Box>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Czy na pewno chcesz usunąć te ogłoszenie ?
        </DialogTitle>
        {error === "deleteOffer" && (
          <DialogContent>
            <Alert severity="error">{errorMsg}</Alert>
          </DialogContent>
        )}
        {loading === "deleteOffer" && (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Anuluj
          </Button>
          <Box mr={1} />
          <Button
            onClick={() => dispatch(deleteOffer(id))}
            variant="contained"
            color="secondary"
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
