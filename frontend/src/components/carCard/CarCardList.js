import { Grid, useTheme, useMediaQuery } from "@material-ui/core";

import { CarCard } from "./CarCard";
import { NotFound } from "./NotFound";

export function CarCardList({ offers }) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container spacing={md ? 4 : 3}>
      {offers.length ? (
        offers.map((offer) => (
          <Grid key={offer._id} item xs={12} sm={6} lg={4}>
            <CarCard offer={offer} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <NotFound />
        </Grid>
      )}
    </Grid>
  );
}
