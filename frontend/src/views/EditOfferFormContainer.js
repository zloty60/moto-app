import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { Box, Container } from "@material-ui/core";

import { fetchSingleOffer } from "./../redux/actions/offerActions";
import { AppContainer } from "./../components/shared/AppContainer";
import { OfferForm } from "./../components/offerForm/OfferForm";
import { EditFormSkeleton } from "./../components/offerForm/EditFormSkeleton";

export function EditOfferFormContainer(props) {
  const editOfferId = props.match.params.id;
  const dispatch = useDispatch();
  const { loading, error, singleOffer, errorMsg } = useSelector(
    (state) => state.offer
  );

  useEffect(() => {
    if (!!editOfferId) {
      dispatch(fetchSingleOffer(editOfferId));
    }
  }, [editOfferId, dispatch]);

  if (error === "fetchSingleOffer") {
    return (
      <AppContainer>
        <Alert severity="error">Nie ma takiego ogłoszenia</Alert>
      </AppContainer>
    );
  }

  if (loading === "fetchSingleOffer") {
    return (
      <Container maxWidth="md">
        <Box mt={6} mb={6}>
          <EditFormSkeleton />
        </Box>
      </Container>
    );
  }

  if (!!singleOffer.offerHeader) {
    const initialValues = { ...singleOffer };
    delete initialValues._id;
    delete initialValues.createdBy;
    delete initialValues.slug;
    return (
      <OfferForm
        initialValues={initialValues}
        isEdit={true}
        loading={loading}
        error={error}
        singleOffer={singleOffer}
        errorMsg={errorMsg}
      />
    );
  }

  return null;
}
