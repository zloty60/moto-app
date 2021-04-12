import { useState } from "react";
import { MenuItem, IconButton, Menu, makeStyles } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CtaBtnLink } from "./../shared/button/CtaBtn";
import { logout } from "./../../redux/actions/userActions";
import { routesConstans } from "../../routes/routesConstans";

export function SignedIn() {
  const { userAccount, myOffers } = routesConstans;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  const classes = useStyles();

  return (
    <>
      <CtaBtnLink txt="Dodaj ogłoszenie" to="/dodaj" />
      <IconButton
        className={classes.IconBtn}
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle className={classes.avatar} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to={userAccount.path}>
          Ustawienia konta
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={myOffers.path}>
          Moje ogłoszenia
        </MenuItem>
        <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
      </Menu>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  IconBtn: {
    marginLeft: "25px",
  },
  avatar: {
    width: "35px",
    height: "35px",
  },
}));
