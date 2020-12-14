import React from "react";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const CurrencyList = ({
  className,
  currencies,
  cacluteCurrencyValue,
  baseCurrency,
  onCurrencyCheckboxClick,
  onCurrencyChecked,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={className} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Избранное</TableCell>
              <TableCell>Валюта</TableCell>
              <TableCell align="right">Единиц</TableCell>
              <TableCell align="right">Буквенный код</TableCell>
              <TableCell align="right">Курс</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies &&
              currencies
                .map((currency) => (
                  <TableRow key={currency.ID}>
                    <TableCell align="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => onCurrencyCheckboxClick(currency.ID)}
                            checked={onCurrencyChecked}
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                            name="checkedH"
                            color="default"
                          />
                        }
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {currency.Name}
                    </TableCell>
                    <TableCell align="right">{currency.Nominal}</TableCell>
                    <TableCell align="right">{currency.CharCode}</TableCell>
                    <TableCell align="right">
                      {baseCurrency
                        ? cacluteCurrencyValue(baseCurrency, currency)
                        : currency.Value}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CurrencyList;
