import { TextField, Button, Box } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { updateCurrentUserPassword } from "./../../../redux/actions/userActions";

const validationSchema = yup.object({
  passwordCurrent: yup
    .string()
    .required("hasło jest wymagane")
    .min(8, "Hasło musie mieć minimum 8 znaków")
    .max(100, "Maksymalna liczba znaków dla hasła to 100"),
  password: yup
    .string()
    .required("hasło jest wymagane")
    .min(8, "Hasło musie mieć minimum 8 znaków")
    .max(100, "Maksymalna liczba znaków dla hasła to 100"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą być takie same")
    .required("Hasło jest wymagane"),
});

export function UserPassword() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateCurrentUserPassword(values));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="passwordCurrent"
        value={formik.values.passwordCurrent}
        onChange={formik.handleChange}
        error={
          formik.touched.passwordCurrent &&
          Boolean(formik.errors.passwordCurrent)
        }
        helperText={
          formik.touched.passwordCurrent && formik.errors.passwordCurrent
        }
        variant="outlined"
        margin="normal"
        fullWidth
        label="Aktualne hasło"
        type="password"
      />
      <TextField
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        variant="outlined"
        margin="normal"
        fullWidth
        label="Nowe hasło"
        type="password"
      />
      <TextField
        name="passwordConfirm"
        value={formik.values.passwordConfirm}
        onChange={formik.handleChange}
        error={
          formik.touched.passwordConfirm &&
          Boolean(formik.errors.passwordConfirm)
        }
        helperText={
          formik.touched.passwordConfirm && formik.errors.passwordConfirm
        }
        variant="outlined"
        margin="normal"
        fullWidth
        label="Potwierdź hasło"
        type="password"
      />
      <Box mt={2} />
      <Button
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
        variant="contained"
        color="primary"
        size="large"
      >
        zaktualizuj hasło
      </Button>
    </form>
  );
}
