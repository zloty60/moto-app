import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Hidden,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";

import { SignedOut } from "./SignedOut";
import { MobileDrawer } from "./MobileDrawer";
import { SignedIn } from "./SignedIn";

export function Navbar() {
  const classes = useStyles();
  const { isAuth } = useSelector((state) => state.user);
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <AppBar>
      <Toolbar>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              component={Link}
              to="/"
              color="inherit"
              className={classes.logo}
            >
              <DirectionsCarIcon className={classes.carIcon} />
              <span>Moto</span>
            </Typography>
            <Hidden mdUp>
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                color="inherit"
                aria-label="menu-mobile"
                edge="end"
              >
                <MenuIcon />
              </IconButton>
              <MobileDrawer
                isMobileDrawerOpen={isMobileDrawerOpen}
                setMobileDrawerOpen={setMobileDrawerOpen}
                isAuth={isAuth}
              />
            </Hidden>
            <Hidden smDown>
              <Box>{isAuth ? <SignedIn /> : <SignedOut />}</Box>
            </Hidden>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  carIcon: {
    width: "35px",
    height: "35px",
    marginRight: "8px",
  },
  logo: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
}));
