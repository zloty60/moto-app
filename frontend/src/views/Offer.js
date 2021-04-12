import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Card, Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { fetchSingleOffer } from "./../redux/actions/offerActions";
import { AppContainer } from "./../components/shared/AppContainer";
import { CarImageGallery } from "./../components/offerDetails/CarImageGallery";
import { OfferDescription } from "./../components/offerDetails/OfferDescription";
import { OfferDescriptionSkeleton } from "./../components/offerDetails/OfferDescriptionSkeleton";
import { Seller } from "./../components/offerDetails/Seller";
import { SellerSkeleton } from "./../components/offerDetails/SellerSkeleton";
import { SellerActionCard } from "./../components/offerDetails/SellerActionCard";
import { ImageGalleryLoader } from "./../components/offerDetails/ImageGalleryLoader";

export function Offer(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const { singleOffer, loading, error, errorMsg } = useSelector(
    (state) => state.offer
  );
  const { isAuth } = useSelector((state) => state.user);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(fetchSingleOffer(id));
  }, [dispatch, id]);

  if (error && error === "fetchSingleOffer") {
    return (
      <AppContainer>
        <Alert severity="error">Nie ma takiego ogłoszenia</Alert>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={12} md={8}>
          <Card>
            <Box p={3}>
              {loading && loading === "fetchSingleOffer" ? (
                <ImageGalleryLoader />
              ) : (
                <CarImageGallery offerImages={singleOffer.images} />
              )}
            </Box>
          </Card>
          <Box mt={3} />
          {loading && loading === "fetchSingleOffer" ? (
            <OfferDescriptionSkeleton />
          ) : (
            <OfferDescription offer={singleOffer} />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {loading && loading === "fetchSingleOffer" ? (
            <SellerSkeleton />
          ) : (
            <Seller offer={singleOffer} />
          )}
          <Box mt={4} />
          {currentUser &&
            !loading &&
            !!singleOffer.createdBy &&
            isAuth &&
            currentUser.user._id === singleOffer.createdBy._id && (
              <SellerActionCard
                id={singleOffer._id}
                error={error}
                errorMsg={errorMsg}
                loading={loading}
              />
            )}
        </Grid>
      </Grid>
    </AppContainer>
  );
}
