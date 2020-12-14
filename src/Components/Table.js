import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import BaseCurrency from "../Components/BaseCurrency";
import CurrencyList from "../Components/CurrencyList";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const BasicTable = () => {
  const classes = useStyles();
  const [cbrJson, setCbrJson] = useState({});
  const [baseCurrencyCharcode, setBaseCurrencyCharcode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [favorites, setFavorites] = useState(
    window.localStorage.getItem("favorite_currency_ids")
      ? JSON.parse(window.localStorage.getItem("favorite_currency_ids"))
      : []
  );
  const catchMessages = (error) => {
    if (error.result && error.result.status) {
      if (error.result.status === 500) {
        setErrorMessage("Cерверная ошибка");
      } else if (error.result.status === 404) {
        setErrorMessage("Cущность не найдена в системе");
      } else if (error.result.status === 400) {
        setErrorMessage("Неверный запрос");
      } else if (error.result.status === 200) {
        setErrorMessage("Верный запрос");
      }
    } else setErrorMessage(error.message);
  };

  const handleChange = (e) => {
    setBaseCurrencyCharcode(e.target.value);
  };
  const currencies = cbrJson.Valute
    ? Object.keys(cbrJson.Valute).map((key, index) => cbrJson.Valute[key])
    : [];
  const baseCurrency = currencies.find(
    (currency) => currency.CharCode === baseCurrencyCharcode
  );
  const onCurrencyChecked=favorites.includes(currencies.id);
    

  const apiUrl = "https://www.cbr-xml-daily.ru/daily_json.js";
  const cacluteCurrencyValue = (baseCurrency, currency) => {
    return (currency.Value / baseCurrency.Value).toFixed(4);
  };
  const makeFavorite = (newFav) => {
    window.localStorage.setItem(
      "favorite_currency_ids",
      JSON.stringify(newFav)
    );
  };
  useEffect(() => {
    const fetchCbrJson = async () => {
      try {
        const result = await axios(apiUrl);
        setCbrJson(result.data);
        setErrorMessage("Верный запрос");
      } catch (error) {
        catchMessages(error);
      }
    };
    fetchCbrJson();
  }, []);

  const compare = (a, b) => {
    const compareByName = (a, b) => a.Name - b.Name;
    if (
      (favorites.includes(a.ID) && favorites.includes(b.ID)) ||
      (!favorites.includes(a.ID) && !favorites.includes(b.ID))
    ) {
      return compareByName(a, b);
    } else if (favorites.includes(a.ID) && !favorites.includes(b.ID)) {
      return -1;
    } else {
      return 1;
    }
  };
  currencies.sort(compare);

  return (
    <>
      <BaseCurrency
        onChange={handleChange}
        valueCurrency={baseCurrencyCharcode}
        className={classes.formControl}
        currencies={currencies}
      />
      <CurrencyList
        className={classes.table}
        currencies={currencies.filter(
          (currency) => currency.CharCode !== baseCurrencyCharcode
        )}
        favorites={favorites}
        onCurrencyCheckboxClick={(id) => {
          const newFav = favorites.includes(id)
            ? favorites.filter((f) => f !== id)
            : [...favorites, id];
          setFavorites(newFav);
          makeFavorite(newFav);
        }}
        checked={onCurrencyChecked}
        cacluteCurrencyValue={cacluteCurrencyValue}
        baseCurrency={baseCurrency}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={errorMessage !== ""}
        autoHideDuration={2500}
        onClose={() => setErrorMessage("")}
        message={errorMessage}
      />
    </>
  );
};

export default BasicTable;
