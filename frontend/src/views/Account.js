import {
  Card,
  Box,
  Typography,
  CircularProgress,
  Grid,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import { AppContainer } from "./../components/shared/AppContainer";
import { closeCurrentUserProfileNotification } from "./../redux/actions/userActions";
import { UserNameForm } from "./../components/account/forms/UserNameForm";
import { UserEmail } from "./../components/account/forms/UserEmail";
import { UserCard } from "./../components/account/UserCard";
import { FormHeader } from "./../components/shared/form/FormHeader";
import { UserPassword } from "./../components/account/forms/UserPassword";

export function Account() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    userProfile,
    loading,
    error,
    errorMsg,
    userProfileNotification,
    userProfileNotificationMsg,
  } = useSelector((state) => state.user);

  return (
    <AppContainer>
      <Card>
        <Box p={2}>
          <Typography gutterBottom variant="h5" component="h2">
            Moje konto
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            Edytuj ustawienia konta i zmień swoje hasło w tym miejscu.
          </Typography>
        </Box>
      </Card>
      <Box mt={5} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} className={classes.userCard}>
          <UserCard name={userProfile.name} email={userProfile.email} />
        </Grid>
        <Grid item xs={12} md={8} className={classes.forms}>
          <Card>
            <Box p={2}>
              <FormHeader icon={<AccountCircleIcon />} txt="Zmień dane" />
              <UserNameForm name={userProfile.name} />
              <UserEmail email={userProfile.email} />
              <Box mt={3} mb={3} />
              {loading && loading === "userProfile" && (
                <Box mt={4} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
              {error && error === "userProfile" && (
                <Box mt={4}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Box>
              )}
              {userProfileNotification &&
                userProfileNotification === "userProfile" && (
                  <Box mt={4}>
                    <Alert
                      onClose={() =>
                        dispatch(closeCurrentUserProfileNotification())
                      }
                      severity="success"
                    >
                      {userProfileNotificationMsg}
                    </Alert>
                  </Box>
                )}
            </Box>
          </Card>
          <Box mt={3} />
          <Card>
            <Box p={2}>
              <FormHeader icon={<LockOutlinedIcon />} txt="Zmień hasło" />
              <UserPassword />
              {loading && loading === "password" && (
                <Box mt={4} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
              {error && error === "password" && (
                <Box mt={4}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Box>
              )}
              {userProfileNotification &&
                userProfileNotification === "password" && (
                  <Box mt={4}>
                    <Alert
                      onClose={() =>
                        dispatch(closeCurrentUserProfileNotification())
                      }
                      severity="success"
                    >
                      {userProfileNotificationMsg}
                    </Alert>
                  </Box>
                )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </AppContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  userCard: {
    order: "1",
    [theme.breakpoints.up("md")]: {
      order: "2",
    },
  },
  forms: {
    order: "2",
    [theme.breakpoints.up("md")]: {
      order: "1",
    },
  },
}));
