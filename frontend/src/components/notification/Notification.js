import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

import { closeNotification } from "./../../redux/actions/notificationActions";

export function Notification() {
  const dispatch = useDispatch();
  const { isOpen, msg } = useSelector((state) => state.notification);
  return (
    <Snackbar
      open={isOpen}
      onClose={() => dispatch(closeNotification())}
      autoHideDuration={3000}
    >
      <Alert
        severity="success"
        variant="filled"
        onClose={() => dispatch(closeNotification())}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
