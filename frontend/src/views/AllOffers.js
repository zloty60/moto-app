import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { AppContainer } from "./../components/shared/AppContainer";
import { SearchCarForm } from "./../components/searchCarForm/SearchCarForm";
import { fetchAllOffers } from "./../redux/actions/allOffersActions";
import { CarCardList } from "./../components/carCard/CarCardList";
import { CarCardSkeletonList } from "./../components/carCard/CarCardSkeletonList";

export function AllOffers(props) {
  const pageProps = props.match.params.page;
  let page = 1;
  if (pageProps) {
    if (!isNaN(parseInt(pageProps))) {
      page = parseInt(pageProps);
    }
  }

  const { search } = useLocation();
  const dispatch = useDispatch();
  const { offers, loading, error, totalNumberOfResults } = useSelector(
    (state) => state.allOffers
  );

  useEffect(() => {
    dispatch(fetchAllOffers(search, page));
  }, [dispatch, search, page]);

  if (error === "fetchAllOffers") {
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
          Wszystkie oferty
        </Typography>
      </Box>
      {loading === "fetchAllOffers" ? (
        <CarCardSkeletonList skeletonCount={6} />
      ) : (
        <CarCardList offers={offers} />
      )}
      {totalNumberOfResults > 1 ? (
        <Box mt={5} display="flex" justifyContent="center">
          <Pagination
            page={page}
            count={Math.ceil(totalNumberOfResults / 12)}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={
                  item.page === 1
                    ? `/oferty${search}`
                    : `/${item.page}/oferty${search}`
                }
                {...item}
              />
            )}
          />
        </Box>
      ) : null}
    </AppContainer>
  );
}
