import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export function CarCard({ offer }) {
  const classes = useStyles();
  const {
    offerHeader,
    yearOfProduction,
    price,
    mileage,
    fuel,
    _id,
    images,
  } = offer;
  const dot = <span className={classes.dot}>•</span>;
  return (
    <Card>
      <CardActionArea component={Link} to={`/oferta/${_id}`}>
        <CardMedia
          component="img"
          alt="samochód"
          height="250"
          image={images[0]}
          title="title"
        />
        <CardContent>
          <Typography
            align="justify"
            component="p"
            gutterBottom
            className={`${classes.bold} ${classes.capitalize} `}
          >
            {offerHeader}
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            className={classes.carSpecification}
          >
            <span>{yearOfProduction}</span>
            {dot}
            <span>{mileage.toLocaleString()} km</span>
            {dot}
            <span className={classes.capitalize}>{fuel}</span>
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.carPrice}>
            {price.toLocaleString()} PLN
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles({
  bold: {
    fontWeight: "bold",
  },
  carSpecification: {
    fontSize: "15px",
  },
  carPrice: {
    fontWeight: "bold",
    color: "#d32f2f",
    fontSize: "17px",
  },
  dot: {
    display: "inline-block",
    margin: "0 5px",
    transform: "scale(1.5)",
  },
  capitalize: {
    textTransform: "capitalize",
  },
});
