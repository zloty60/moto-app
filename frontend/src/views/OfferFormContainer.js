import { useSelector } from "react-redux";

import { OfferForm } from "./../components/offerForm/OfferForm";

export function OfferFormContainer() {
  const { loading, error, singleOffer, errorMsg } = useSelector(
    (state) => state.offer
  );
  const initialValues = {
    offerHeader: "",
    brand: "",
    carBody: "",
    fuel: "",
    price: "",
    mileage: "",
    yearOfProduction: "",
    offerDescription: "",
    images: [],
  };
  return (
    <OfferForm
      initialValues={initialValues}
      isEdit={false}
      loading={loading}
      singleOffer={singleOffer}
      error={error}
      errorMsg={errorMsg}
    />
  );
}
