import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

export function CtaBtn({ txt, type, size, fullWidth }) {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      variant="contained"
      type={type ? type : "button"}
      size={size ? size : "medium"}
      fullWidth={fullWidth ? fullWidth : false}
      classes={{
        root: classes.root,
        containedPrimary: classes.containedPrimary,
      }}
    >
      {txt}
    </Button>
  );
}

export function CtaBtnLink({ txt, to, size, fullWidth }) {
  const classes = useStyles();
  return (
    <Button
      component={Link}
      to={to}
      color="primary"
      variant="contained"
      size={size ? size : "medium"}
      fullWidth={fullWidth ? fullWidth : false}
      classes={{
        root: classes.root,
        containedPrimary: classes.containedPrimary,
      }}
    >
      {txt}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#d32f2f",
  },
  containedPrimary: {
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },
}));
