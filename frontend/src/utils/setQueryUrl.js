export function setQueryUrl(values) {
  let query = "";
  const withoutQuerySelector = ["brand", "carBody", "fuel", "sort"];

  Object.keys(values).forEach((el) => {
    if (
      values[el] !== "all" &&
      values[el] !== "unlimited" &&
      values[el] !== "default"
    ) {
      if (withoutQuerySelector.includes(el)) {
        if (query.length) {
          query += `&${el}=${values[el]}`;
        } else {
          query += `${el}=${values[el]}`;
        }
      } else {
        switch (el) {
          case "price":
            if (query.length) {
              query += `&price[lt]=${values[el]}`;
            } else {
              query += `price[lt]=${values[el]}`;
            }
            break;
          case "mileage":
            if (query.length) {
              query += `&mileage[lt]=${values[el]}`;
            } else {
              query += `mileage[lt]=${values[el]}`;
            }
            break;
          case "yearOfProduction":
            if (query.length) {
              query += `&yearOfProduction[gt]=${values[el]}`;
            } else {
              query += `yearOfProduction[gt]=${values[el]}`;
            }
            break;
          default:
            break;
        }
      }
    }
  });
  return query;
}
