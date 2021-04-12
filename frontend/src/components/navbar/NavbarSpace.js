import { makeStyles } from "@material-ui/core/styles";

export function NavbarSpace() {
  const classes = useStyles();
  return <div className={classes.offset} />;
}

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));
