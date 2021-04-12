import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Link,
  Box,
  Card,
  Typography,
  Avatar,
  makeStyles,
  Container,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { register } from "./../redux/actions/userActions";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Nazwa użytkownika jest wymagana")
    .max(50, "Maksymalna liczba znaków dla nazwy użytkownika wynosi 50"),
  email: yup
    .string()
    .email("Wpisz poprawny email")
    .required("Email jest wymagany")
    .max(100, "Maksymalna liczba znaków dla adresu email wynosi 100"),
  password: yup
    .string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .max(100, "Maksymalna liczba znaków dla hasła to 100")
    .required("Hasło jest wymagane"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą być takie same"),
});

export function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, errorMsg } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { name, email, password, passwordConfirm } = values;
      dispatch(register(name, email, password, passwordConfirm));
      // history.push("/");
    },
  });

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={8}>
        <Card>
          <Box pt={5} pb={5} pr={2} pl={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Box mt={2} />
              <Typography component="h1" variant="h5">
                Zarejestruj się
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
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
              <TextField
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="Hasło"
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
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="Potwierdź hasło"
              />
              <Box mt={3} mb={3} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Zarejestruj się
              </Button>
              {loading && loading === "register" && (
                <Box mt={4} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
              {error && error === "register" && (
                <Box mt={4}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Box>
              )}
            </form>
            <Box mt={2} />
            <Link variant="body2" component={RouterLink} to="/logowanie">
              Posiadasz już konto? Zaloguj się
            </Link>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
