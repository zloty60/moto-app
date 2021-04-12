import { Box, Avatar, Typography, makeStyles } from "@material-ui/core";

export function FormHeader({ icon, txt }) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar className={classes.avatar}>{icon}</Avatar>
      <Box mt={2} />
      <Typography component="h1" variant="h5">
        {txt}
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
