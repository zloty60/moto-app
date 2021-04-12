import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import { AppContainer } from "./../components/shared/AppContainer";
import { SearchCarForm } from "./../components/searchCarForm/SearchCarForm";
import { CarCardList } from "./../components/carCard/CarCardList";
import { CtaBtnLink } from "./../components/shared/button/CtaBtn";
import { routesConstans } from "../routes/routesConstans";
import { fetchfeaturedOffers } from "./../redux/actions/featuredOffersActions";
import { CarCardSkeletonList } from "./../components/carCard/CarCardSkeletonList";

export function RootView() {
  const dispatch = useDispatch();
  const { offers, loading, error } = useSelector(
    (state) => state.featuredOffers
  );

  useEffect(() => {
    dispatch(fetchfeaturedOffers());
  }, [dispatch]);

  if (error) {
    return (
      <AppContainer>
        <Alert severity="error">cos poszło nie tak</Alert>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <SearchCarForm />
      <Box mt={6} mb={6}>
        <Typography variant="h5" component="h2">
          Wyróżnione ogłoszenia
        </Typography>
      </Box>
      {loading ? (
        <CarCardSkeletonList skeletonCount={6} />
      ) : (
        <CarCardList offers={offers} />
      )}
      <Box mt={6}>
        <Grid container justify="center">
          <Grid item xs={12} sm={7} md={5}>
            <CtaBtnLink
              to={routesConstans.allOffers.path}
              txt="Zobacz wszystkie ogłoszenia"
              fullWidth
              size="large"
            />
          </Grid>
        </Grid>
      </Box>
    </AppContainer>
  );
}
