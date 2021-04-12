import { Card, Box, Typography, makeStyles } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

export function NotFound() {
  const classes = useStyles();
  return (
    <Card>
      <Box p={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Brak wyników wyszukiwania
        </Typography>
        <SentimentVeryDissatisfiedIcon className={classes.icon} />
      </Box>
    </Card>
  );
}

const useStyles = makeStyles({
  icon: {
    width: "150px",
    height: "150px",
    color: "#e19e97",
  },
});
