import { Avatar, makeStyles } from "@material-ui/core";

export function UserAvatar({ name }) {
  const classes = useStyles();
  return <Avatar className={classes.avatar}>{name[0]}</Avatar>;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#607d8b",
    width: "65px",
    height: "65px",
    fontSize: "2.25rem",
    textTransform: "uppercase",
  },
}));
