import {
  Drawer,
  makeStyles,
  Button,
  Container,
  Box,
  MenuItem,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";

import { CtaBtnLink } from "./../shared/button/CtaBtn";
import { routesConstans } from "../../routes/routesConstans";
import { logout } from "./../../redux/actions/userActions";

export function MobileDrawer({
  isMobileDrawerOpen,
  setMobileDrawerOpen,
  isAuth,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userAccount, myOffers, login, register } = routesConstans;

  const handleLogout = () => {
    setMobileDrawerOpen(false);
    dispatch(logout());
  };

  return (
    <Drawer
      open={isMobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      anchor="right"
      PaperProps={{ className: classes.drawer }}
    >
      <Container>
        <Box marginTop={6} display="flex" flexDirection="column">
          {isAuth ? (
            <>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar alt="user logo" className={classes.avatar}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography component="h2" variant="h6">
                  Janusz
                </Typography>
                <Box mb={2} />
              </Box>
              <Divider />
              <div>
                <Box mt={2} />
                <MenuItem
                  component={Link}
                  to={userAccount.path}
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  Ustawienia konta
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={myOffers.path}
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  Moje ogłoszenia
                </MenuItem>

                <Box mt={2} />
                <div onClick={() => setMobileDrawerOpen(false)}>
                  <CtaBtnLink fullWidth txt="Dodaj ogłoszenie" to="/dodaj" />
                </div>
                <Box mt={2} />
                <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
              </div>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to={login.path}
                onClick={() => setMobileDrawerOpen(false)}
                color="primary"
                variant="contained"
                className={classes.mb}
              >
                Logowanie
              </Button>
              <Button
                component={Link}
                to={register.path}
                onClick={() => setMobileDrawerOpen(false)}
                color="primary"
                variant="contained"
                className={classes.mb}
              >
                Rejestracja
              </Button>
              <Box onClick={() => setMobileDrawerOpen(false)}>
                <CtaBtnLink fullWidth txt="Dodaj ogłoszenie" to="/dodaj" />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "300px",
    maxWidth: "100%",
  },
  mb: {
    marginBottom: "20px",
  },
  ul: {
    padding: 0,
  },
}));
