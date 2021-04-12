import { Card, Box, Typography, Chip, makeStyles } from "@material-ui/core";

export function OfferDescription({ offer }) {
  const {
    offerHeader,
    price,
    yearOfProduction,
    mileage,
    carBody,
    fuel,
    brand,
    offerDescription,
  } = offer;

  const classes = useStyles();

  return (
    <Card>
      <Box pt={4} pl={3} pr={3} pb={3} position="relative">
        <Typography variant="h5" component="h2" className={classes.title}>
          {offerHeader}
        </Typography>
        <Box mt={2} />
        <Typography className={classes.price} component="h3">
          {price && `${price.toLocaleString()}PLN`}
        </Typography>
        <Box mt={3} />
        <Box className={classes.chipWrapper}>
          <Chip
            label={`Rok produkcji: ${yearOfProduction}`}
            variant="outlined"
            classes={{ root: classes.root, outlined: classes.outlined }}
          />
          <Chip
            label={`Przebieg: ${mileage} km`}
            variant="outlined"
            classes={{ root: classes.root, outlined: classes.outlined }}
          />
          <Chip
            label={`Paliwo: ${fuel}`}
            variant="outlined"
            classes={{ root: classes.root, outlined: classes.outlined }}
          />
          <Chip
            label={`Marka pojazdu: ${brand}`}
            variant="outlined"
            classes={{ root: classes.root, outlined: classes.outlined }}
          />
          <Chip
            label={`Typ nadwozia: ${carBody}`}
            variant="outlined"
            classes={{ root: classes.root, outlined: classes.outlined }}
          />
        </Box>
        <Box mt={3} />
        <Typography variant="h6" component="h4">
          Opis
        </Typography>
        <Box mt={1} />
        <Typography variant="body1" gutterBottom>
          {offerDescription}
        </Typography>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "6px",
  },
  outlined: {
    border: "2px solid #b3b3b3",
  },
  chipWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  favorite: {
    width: "27px",
    height: "27px",
    cursor: "pointer",
  },
  price: {
    fontWeight: "bold",
    fontSize: "24px",
    textTransform: "uppercase",
    color: "#d32f2f",
  },
  title: {
    marginRight: "30px",
  },
}));
