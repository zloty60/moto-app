import { TextField, Grid, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { updateCurrentUserProfile } from "./../../../redux/actions/userActions";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Wpisz poprawny email")
    .required("Email jest wymagana")
    .max(100, "Maksymalna liczba znaków adresu email wynosi 100"),
});

export function UserEmail({ email }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateCurrentUserProfile(values));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Adres email"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            disabled={!formik.isValid || formik.values.email === email}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            zaktualizuj
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
