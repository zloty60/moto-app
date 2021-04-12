import {
  Card,
  Box,
  TextField,
  Container,
  Grid,
  Button,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";

import { FormHeader } from "./../shared/form/FormHeader";
import { InputSelect } from "./../shared/form/InputSelect";
import { carBrands, carBody, fuel } from "./../searchCarForm/data";
import { createOffer, updateOffer } from "./../../redux/actions/offerActions";
import { ImageUpload } from "./ImageUpload";

const currentYear = new Date().getFullYear();

const validationSchema = yup.object({
  offerHeader: yup
    .string()
    .required("Tytuł jest wymagana")
    .max(150, "Maksymalna ilość znaków dla tytułu ogłoszenia to 150"),
  brand: yup.string().required("Marka jest wymagana"),
  carBody: yup.string().required("Typ nadwozia jest wymagany"),
  fuel: yup.string().required("Rodzaj paliwa jest wymagany"),
  price: yup
    .number()
    .required("Cena jest wymagana")
    .moreThan(0, "Cena musi być większa od zera")
    .lessThan(100000001, "Maksymalna cena to 100000000"),
  yearOfProduction: yup
    .number()
    .required("Rok produkcji jest wymagany")
    .moreThan(1899, "Rok produkcji musi być większy lub równy 1900")
    .lessThan(
      currentYear + 1,
      "Rok producji nie może być większy niż aktualny rok"
    ),
  mileage: yup
    .number()
    .required("Przebieg jest wymagany")
    .moreThan(0, "Przebieg musi być większy od zera")
    .lessThan(100000001, "Maksymalny przebieg to 100000000"),
  offerDescription: yup
    .string()
    .required("Opis ogłoszenia jest wymagany")
    .max(5000, "Maksymalna ilość znaków dla opisu ogłoszenia to 5000"),
  images: yup.array().required(),
});

export function OfferForm({
  initialValues,
  isEdit,
  loading,
  error,
  errorMsg,
  singleOffer,
}) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isEdit) {
        dispatch(updateOffer(singleOffer._id, values));
      } else {
        dispatch(createOffer(values));
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Box mt={6} mb={6}>
        <Card>
          <Box pt={3} pb={3} pl={2} pr={2}>
            <FormHeader icon={<AssignmentIcon />} txt="Dodaj ogłoszenie" />
            <Box mt={3} />
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="offerHeader"
                    variant="outlined"
                    fullWidth
                    label="Tytuł ogłoszenia"
                    value={formik.values.offerHeader}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.offerHeader &&
                      Boolean(formik.errors.offerHeader)
                    }
                    helperText={
                      formik.touched.offerHeader && formik.errors.offerHeader
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    name="price"
                    fullWidth
                    label="Cena"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">PLN</InputAdornment>
                      ),
                    }}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    name="yearOfProduction"
                    fullWidth
                    label="Rok produkcji"
                    type="number"
                    value={formik.values.yearOfProduction}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.yearOfProduction &&
                      Boolean(formik.errors.yearOfProduction)
                    }
                    helperText={
                      formik.touched.yearOfProduction &&
                      formik.errors.yearOfProduction
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    variant="outlined"
                    name="mileage"
                    fullWidth
                    label="Przebieg"
                    type="number"
                    value={formik.values.mileage}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mileage && Boolean(formik.errors.mileage)
                    }
                    helperText={formik.touched.mileage && formik.errors.mileage}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputSelect
                    options={carBrands}
                    name="brand"
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    error={formik.touched.brand && Boolean(formik.errors.brand)}
                    helperText={formik.touched.brand && formik.errors.brand}
                    label="Marka pojazdu"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputSelect
                    options={carBody}
                    name="carBody"
                    value={formik.values.carBody}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.carBody && Boolean(formik.errors.carBody)
                    }
                    helperText={formik.touched.carBody && formik.errors.carBody}
                    label="Typ nadwozia"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputSelect
                    options={fuel}
                    name="fuel"
                    value={formik.values.fuel}
                    onChange={formik.handleChange}
                    error={formik.touched.fuel && Boolean(formik.errors.fuel)}
                    helperText={formik.touched.fuel && formik.errors.fuel}
                    label="Rodzaj paliwa"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    name="offerDescription"
                    value={formik.values.offerDescription}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.offerDescription &&
                      Boolean(formik.errors.offerDescription)
                    }
                    helperText={
                      formik.touched.offerDescription &&
                      formik.errors.offerDescription
                    }
                    multiline
                    rows={6}
                    fullWidth
                    label="Opis ogłoszenia"
                  />
                </Grid>
                <Grid item xs={12}>
                  {!isEdit && (
                    <ImageUpload
                      setFieldValue={formik.setFieldValue}
                      values={formik.values}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {isEdit ? (
                    <Button
                      disabled={loading === "updateOffer"}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      aktualizuj ogłoszenie
                    </Button>
                  ) : (
                    <Button
                      disabled={loading === "offerForm"}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      dodaj ogłoszenie
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Box mt={3} display="flex" justifyContent="center">
                {isEdit ? (
                  <>
                    {loading && loading === "updateOffer" && (
                      <CircularProgress />
                    )}
                    {error && error === "updateOffer" && (
                      <Alert severity="error">{errorMsg}</Alert>
                    )}
                  </>
                ) : (
                  <>
                    {loading && loading === "offerForm" && <CircularProgress />}
                    {error && error === "offerForm" && (
                      <Alert severity="error">{errorMsg}</Alert>
                    )}
                  </>
                )}
              </Box>
            </form>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
