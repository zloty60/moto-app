import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { routesConstans } from "../../routes/routesConstans";
import { CtaBtnLink } from "./../shared/button/CtaBtn";

export function SignedOut() {
  const classes = useStyles();
  const { login, register } = routesConstans;
  return (
    <>
      <CtaBtnLink txt="Dodaj ogłoszenie" to="/dodaj" />
      <Button
        component={Link}
        to={login.path}
        color="primary"
        variant="contained"
        className={classes.btn}
      >
        Logowanie
      </Button>
      <Button
        component={Link}
        to={register.path}
        color="primary"
        variant="contained"
      >
        Rejestracja
      </Button>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: "20px",
    marginLeft: "20px",
  },
}));
