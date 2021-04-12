import {
  Card,
  Box,
  Grid,
  Hidden,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import { InputSelect } from "./../shared/form/InputSelect";
import { CtaBtn } from "./../shared/button/CtaBtn";
import {
  carBrandsSearch,
  carBodySearch,
  fuelSearch,
  priceTo,
  mileageTo,
  yearOfProductionFrom,
  sort,
} from "./data";
import { setQueryUrl } from "./../../utils/setQueryUrl";

export function SearchCarForm() {
  const history = useHistory();

  let initialValues = {
    brand: "all",
    carBody: "all",
    fuel: "all",
    price: "unlimited",
    mileage: "unlimited",
    yearOfProduction: "unlimited",
    sort: "default",
  };

  if (history.location.search) {
    const search = history.location.search.substring(1);
    const searchObj = JSON.parse(
      '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\[.*?\]/g, "") +
        '"}'
    );
    initialValues = { ...initialValues, ...searchObj };
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const searchQuery = setQueryUrl(values);
      if (searchQuery.length) {
        history.push(`/oferty?${searchQuery}`);
      } else {
        history.push("/oferty");
      }
    },
  });

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card>
      <Box pt={md ? 5 : 4} pb={md ? 5 : 4} pl={3} pr={3}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelect
                options={carBrandsSearch}
                value={formik.values.brand}
                onChange={formik.handleChange}
                name="brand"
                label="Marka pojazdu"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelect
                options={carBodySearch}
                value={formik.values.carBody}
                onChange={formik.handleChange}
                name="carBody"
                label="Typ nadwozia"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelect
                options={fuelSearch}
                value={formik.values.fuel}
                onChange={formik.handleChange}
                name="fuel"
                label="Rodzaj paliwa"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelect
                options={priceTo}
                value={formik.values.price}
                onChange={formik.handleChange}
                name="price"
                label="Cena do"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelect
                options={mileageTo}
                value={formik.values.mileage}
                onChange={formik.handleChange}
                name="mileage"
                label="Przebieg do"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelect
                options={yearOfProductionFrom}
                value={formik.values.yearOfProduction}
                onChange={formik.handleChange}
                name="yearOfProduction"
                label="Rok produkcji od"
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Hidden smUp>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputSelect
                    options={sort}
                    value={formik.values.sort}
                    onChange={formik.handleChange}
                    name="sort"
                    label="Sortuj"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CtaBtn
                    txt="Pokaż ogłoszenia"
                    type="submit"
                    size="large"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Hidden>
            <Hidden xsDown>
              <Grid
                container
                spacing={3}
                justify="space-between"
                alignItems="center"
              >
                <Grid item sm={6} md={4}>
                  <InputSelect
                    options={sort}
                    value={formik.values.sort}
                    onChange={formik.handleChange}
                    name="sort"
                    label="Sortuj"
                  />
                </Grid>
                <Grid item sm={6} md={4}>
                  <CtaBtn
                    txt="Pokaż ogłoszenia"
                    type="submit"
                    size="large"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Hidden>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
