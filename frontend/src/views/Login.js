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

import { login } from "./../redux/actions/userActions";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Wpisz poprawny email")
    .required("Email jest wymagany")
    .max(100, "Maksymalna liczba znaków adresu email wynosi 100"),
  password: yup
    .string()
    .min(8, "Hasło musi mieć minimum 8 znaków")
    .required("Hasło jest wymagane"),
});

export function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, errorMsg } = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(login(email, password));
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
                Zaloguj się
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
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
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                label="Hasło"
              />
              <Box mt={3} mb={3} />
              <Button
                type="submit"
                disabled={!!loading}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Zaloguj się
              </Button>
              {loading && loading === "login" && (
                <Box mt={4} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
              {error && error === "login" && (
                <Box mt={4}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Box>
              )}
            </form>
            <Box mt={2} />
            <Link variant="body2" component={RouterLink} to="/rejestracja">
              Nie masz konta? Zarejestruj się
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
