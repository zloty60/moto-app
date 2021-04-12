export const carBrands = [
  { value: "audi", txt: "audi" },
  { value: "bmw", txt: "bmw" },
  { value: "volkswagen", txt: "volkswagen" },
  { value: "mercedes-benz", txt: "mercedes-benz" },
  { value: "renault", txt: "renault" },
  { value: "skoda", txt: "skoda" },
  { value: "toyota", txt: "toyota" },
  { value: "opel", txt: "opel" },
  { value: "ford", txt: "ford" },
  { value: "kia", txt: "kia" },
  { value: "others", txt: "pozostałe" },
];

export const carBrandsSearch = [
  { value: "all", txt: "wszystkie" },
  ...carBrands,
];

export const carBody = [
  { value: "cabriolet", txt: "kabriolet" },
  { value: "sedan", txt: "sedan" },
  { value: "coupe", txt: "coupe" },
  { value: "kombi", txt: "kombi" },
  { value: "pickup", txt: "pickup" },
  { value: "hatchback", txt: "hatchback" },
  { value: "off-road", txt: "terenowy" },
  { value: "suv", txt: "suv" },
];

export const carBodySearch = [{ value: "all", txt: "wszystkie" }, ...carBody];

export const fuel = [
  { value: "petrol", txt: "benzyna" },
  { value: "diesel", txt: "diesel" },
  { value: "lpg", txt: "lpg" },
  { value: "hybrid", txt: "hybryda" },
  { value: "electric", txt: "elektryczny" },
];

export const fuelSearch = [{ value: "all", txt: "wszystkie" }, ...fuel];

export const priceTo = [
  { value: "unlimited", txt: "bez limitu" },
  { value: "5000", txt: "do 5 000" },
  { value: "10000", txt: "do 10 000" },
  { value: "15000", txt: "do 15 000" },
  { value: "20000", txt: "do 20 000" },
  { value: "25000", txt: "do 25 000" },
  { value: "30000", txt: "do 30 000" },
  { value: "35000", txt: "do 35 000" },
  { value: "40000", txt: "do 40 000" },
  { value: "45000", txt: "do 45 000" },
  { value: "50000", txt: "do 50 000" },
  { value: "60000", txt: "do 60 000" },
  { value: "80000", txt: "do 80 000" },
  { value: "100000", txt: "do 100 000" },
  { value: "150000", txt: "do 150 000" },
  { value: "200000", txt: "do 200 000" },
];

export const mileageTo = [
  { value: "unlimited", txt: "bez limitu" },
  { value: "20000", txt: "do 20 000 km" },
  { value: "30000", txt: "do 30 000 km" },
  { value: "40000", txt: "do 40 000 km" },
  { value: "50000", txt: "do 50 000 km" },
  { value: "75000", txt: "do 75 000 km" },
  { value: "100000", txt: "do 100 000 km" },
  { value: "125000", txt: "do 125 000 km" },
  { value: "150000", txt: "do 150 000 km" },
  { value: "200000", txt: "do 200 000 km" },
  { value: "250000", txt: "do 250 000 km" },
  { value: "300000", txt: "do 300 000 km" },
  { value: "500000", txt: "do 500 000 km" },
];

export const yearOfProductionFrom = [
  { value: "unlimited", txt: "bez limitu" },
  { value: "2021", txt: "od 2021" },
  { value: "2020", txt: "od 2020" },
  { value: "2019", txt: "od 2019" },
  { value: "2018", txt: "od 2018" },
  { value: "2017", txt: "od 2017" },
  { value: "2016", txt: "od 2016" },
  { value: "2015", txt: "od 2015" },
  { value: "2012", txt: "od 2012" },
  { value: "2010", txt: "od 2010" },
  { value: "2008", txt: "od 2008" },
  { value: "2006", txt: "od 2006" },
  { value: "2004", txt: "od 2004" },
  { value: "2002", txt: "od 2002" },
  { value: "2000", txt: "od 2000" },
  { value: "lt2000", txt: "< 2000" },
];

export const sort = [
  { value: "default", txt: "domyślnie" },
  { value: "price", txt: "najtańsze" },
  { value: "-price", txt: "najdroższe" },
];
