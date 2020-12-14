import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const BaseCurrency = ({ onChange, valueCurrency, className, currencies }) => {
  return (
    <>
      <FormControl className={className}>
        <InputLabel id="base-currency">Базовая валюта</InputLabel>
        <Select
          labelId="base-currency"
          id="select-base-currency"
          value={valueCurrency}
          onChange={onChange}
        >
          <MenuItem value="">
            <em>Российский рубль</em>
          </MenuItem>
          {currencies &&
            currencies.map((currency) => (
              <MenuItem key={currency.ID} value={currency.CharCode}>
                {currency.Name}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>Выберите базовую валюту</FormHelperText>
      </FormControl>
    </>
  );
};

export default BaseCurrency;
