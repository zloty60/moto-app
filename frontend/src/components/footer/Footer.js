import { Typography, Container, makeStyles } from "@material-ui/core";

export function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container>
        <Typography style={{ color: "#eee" }}></Typography>
      </Container>
    </footer>
  );
}

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: "#455a64",
    height: "200px",
  },
}));
