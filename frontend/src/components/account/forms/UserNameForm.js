import { TextField, Grid, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { updateCurrentUserProfile } from "./../../../redux/actions/userActions";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Nazwa użytkownika jest wymagana")
    .max(50, "Maksymalna liczba znaków dla nazwy użytkownika wynosi 50"),
});

export function UserNameForm({ name }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name,
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
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Nazwa użytkownika"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            disabled={!formik.isValid || formik.values.name === name}
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
