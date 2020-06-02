import React, { useEffect, useLayoutEffect, useState, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import { getCurrenciesRequest } from "../../Redux/Actions/MarketDataActions/Currencies/getCurrenciesActions";
// @material-ui/core
import {
  makeStyles,
  withStyles,
  Divider,
  TextField,
  Tooltip,
  Checkbox,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import Card from "../Core/Card.js";
import CardHeader from "../Core/CardHeader.js";
import CardBody from "../Core/CardBody.js";
import CardAvatar from "../Core/CardAvatar.js";
import Button from "../Core/Button.js";
import calculator from "../../assets/img/calculator.jpg";
// styles
import dropdownStyle from "../Styles/dropdownStyle.js";
import userStyles from "../Styles/userPageStyle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import * as flags from "../../../node_modules/react-round-flags/flags";
import Lottie from "react-lottie";
import * as trailLoading from "../../assets/gifs/trailLoading.json";
import world5 from "../../assets/img/world5.jpg";
import world from "../../assets/img/world1.jpg";
import hebrewCurrencies from "../../hebrewCurrencyNames.js";
import englishCurrencies from "../../englishCurrencyNames.js";

const flag = ({ size, code, style }) => {
  const flag = flags[`icons${size}`][code];
  if (flag) {
    return (
      <img
        src={flag}
        style={({ width: size, height: size }, style)}
        alt="..."
      />
    );
  } else if (size === 24) {
    return <img width="24px" height="20px" src={world} alt="..." />;
  } else {
    return (
      <img
        src={world5}
        style={({ width: size, height: size }, style)}
        alt="..."
      />
    );
  }
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: trailLoading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const styles = (theme) => ({
  ...dropdownStyle(theme),
  ...userStyles,
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
});

const useStyles = makeStyles(styles);

function Calculator(props) {
  const {
    user,
    currencies,
    autoDisconnect,
    loadedCurrencies,
    lex,
    session,
    loadedUser,
  } = props;
  const classes = useStyles();

  const [checked, setChecked] = useState(false);
  const [currency, setCurrnecy] = useState({
    currencyName: "",
    value: 0.0,
    isInTable: false,
  });

  const [currenciesNames, setCurrencies] = useState({});
  const [rateValue, setRateValue] = useState(0.0);
  const [amount, setAmount] = useState(0.0);
  const [rateInput, setRateInput] = useState(false);
  const [chooseRate, setChooseRate] = useState(false);

  useLayoutEffect(() => {
    if (autoDisconnect) {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDisconnect]);

  useEffect(() => {
    if (
      document.cookie.match("connect.sid") &&
      document.cookie.match("connect.sid").input === session
    ) {
      props.getCurrenciesRequest();
      props.userLoadRequest();
      return () => {
        var id = window.setTimeout(null, 0);
        while (id--) {
          window.clearTimeout(id);
        }

        props.resetLoadUser();
      };
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFullValue = () => {
    setChecked(!checked);
  };

  const handleClickProfile = () => {
    setCurrencies({ ...currencies });
  };

  const handleCurrenciesList = (cName, cValue, cIfInTable) => {
    handleCurrencyChoise(cName, cValue, cIfInTable);
    return;
  };

  const handleCurrencyChoise = (currencyName, value, checkIfInTable) => {
    let isInTable = false;
    if (!checkIfInTable) {
      user.currenciesRates.forEach((rate) => {
        if (rate.currencyName === currencyName) {
          isInTable = true;
        }
      });
    } else {
      isInTable = true;
    }
    setAmount(0.0);
    setCurrnecy({ currencyName, value, isInTable });
  };

  const handleRateInput = () => {
    setRateValue(0.0);
    setRateInput(!rateInput);
    setChooseRate(true);
    return;
  };

  const handleNoRateInput = () => {
    setRateValue(0.0);
    setChooseRate(true);
    return;
  };

  const handleRateChoise = (rateAction) => {
    let rateValue;
    user.currenciesRates.forEach((rate) => {
      if (rate.currencyName === currency.currencyName) {
        rateValue = rate[rateAction];
        setRateValue(rateValue);
      }
    });
    setChooseRate(true);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedCurrencies && loadedUser ? (
        <Card>
          {user.userLanguage === "english" ? (
            <Fragment>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Calculator</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <br />
                    <br />
                    {user.currenciesRates.map(
                      (rate) =>
                        rate.isInTable && (
                          <Button
                            fullWidth
                            color="success"
                            key={rate._id}
                            onClick={() =>
                              handleCurrencyChoise(
                                rate.currencyName,
                                currencies[rate.currencyName],
                                true
                              )
                            }
                          >
                            {rate.currencyName.substring(0, 3).toUpperCase()}{" "}
                            {englishCurrencies[rate.currencyName]}
                          </Button>
                        )
                    )}
                    <h1>{""}</h1>
                    <br />
                    <Divider />
                    <Autocomplete
                      freeSolo
                      disableClearable
                      id="free-solo-2-demo"
                      getOptionLabel={(curr) => curr}
                      options={Object.keys(currenciesNames).map((curr) => curr)}
                      renderOption={(option) => {
                        return (
                          <GridContainer direction="row" justify="flex-start">
                            <GridItem justify="flex-end">
                              {flag({
                                size: 24,
                                code: `${option.substring(0, 2).toUpperCase()}`,
                              })}
                            </GridItem>
                            <GridItem justify="flex-end">
                              <p
                                onClick={() =>
                                  handleCurrenciesList(
                                    option,
                                    currencies[option],
                                    false
                                  )
                                }
                                className={classes.cardTitle}
                                style={{
                                  color: "black",
                                  textAlign: "left",
                                  fontSize: "14px",
                                }}
                              >
                                {option.substring(0, 3).toUpperCase()}{" "}
                                {englishCurrencies[option]}
                              </p>
                            </GridItem>
                          </GridContainer>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          style={{
                            right: "13px",
                            width: "34ch",
                          }}
                          onClick={handleClickProfile}
                          {...params}
                          label="search for a currency"
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <br />
                    <Card profile>
                      <CardAvatar profile>
                        {flag({
                          size: 64,
                          code: `${currency.currencyName
                            .substring(0, 2)
                            .toUpperCase()}`,
                        })}
                      </CardAvatar>
                      <CardBody profile>
                        {currency.currencyName === "" ? (
                          <Fragment>
                            <br />
                            <h4 className={classes.cardCategory}>
                              please choose currency
                            </h4>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                          </Fragment>
                        ) : (
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <h6 className={classes.cardCategory}>Currency</h6>
                              <h4 className={classes.cardTitle}>
                                {currency.currencyName
                                  .substring(0, 3)
                                  .toUpperCase()}{" "}
                                {englishCurrencies[currency.currencyName]}
                              </h4>
                              <br />
                              <h6 className={classes.cardCategory}>Value</h6>
                              {checked ? (
                                <h6 className={classes.cardTitle}>
                                  {" \u20AA" + currency.value}
                                </h6>
                              ) : (
                                <h4 className={classes.cardTitle}>
                                  {" \u20AA" + currency.value.toFixed(2)}
                                </h4>
                              )}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <Tooltip
                                id="tooltip-top"
                                title="show full value"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Checkbox
                                  classes={{
                                    root: classes.switch,
                                  }}
                                  checked={checked}
                                  onChange={handleFullValue}
                                  color="primary"
                                  name="checked"
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                />
                              </Tooltip>
                              <Button
                                onClick={() => handleNoRateInput()}
                                fullWidth
                                color="primary"
                                round
                              >
                                no rate
                              </Button>
                              <Button
                                onClick={() => handleRateInput()}
                                fullWidth
                                color="primary"
                                round
                              >
                                manual rate
                              </Button>
                              {rateInput && (
                                <TextField
                                  type="number"
                                  autoFocus
                                  label="manual rate"
                                  value={rateValue}
                                  onChange={(e) => setRateValue(e.target.value)}
                                  fullWidth
                                />
                              )}
                              {currency.isInTable && (
                                <Fragment>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("buyCashRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    buy cash
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("sellCashRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    sell cash
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("buyTransferRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    buy transfer
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("sellTransferRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    sell transfer
                                  </Button>
                                </Fragment>
                              )}
                            </GridItem>
                          </GridContainer>
                        )}
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <br />
                    <Card profile>
                      <CardAvatar profile>
                        <img src={calculator} alt="..." />
                      </CardAvatar>
                      <CardBody profile>
                        {!chooseRate ? (
                          <Fragment>
                            <br />
                            <h4 className={classes.cardCategory}>
                              please choose rate
                            </h4>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <h6 className={classes.cardCategory}>Rate</h6>
                            <h4 className={classes.cardTitle}>{rateValue}</h4>
                            <h6 className={classes.cardCategory}>
                              calculated currency
                            </h6>
                            <h4 className={classes.cardTitle}>
                              {Number(
                                Number(currency.value) + Number(rateValue)
                              ).toFixed(2) + " \u20AA"}
                            </h4>
                            <br />
                            <TextField
                              type="number"
                              label="amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              fullWidth
                            />
                            <br />
                            <Card plain>
                              <CardHeader plain color="warning">
                                <h4 className={classes.cardTitleWhite}>
                                  total :
                                  {" " +
                                    Number(
                                      (Number(currency.value) +
                                        Number(rateValue)) *
                                        Number(amount)
                                    ).toFixed(2) +
                                    " \u20AA"}
                                </h4>
                              </CardHeader>
                            </Card>
                          </Fragment>
                        )}
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Fragment>
          ) : (
            <Fragment>
              <CardHeader color="primary">
                <h4
                  className={classes.cardTitleWhite}
                  style={{
                    textAlign: "right",
                  }}
                >
                  מחשבון
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <br />
                    <Card profile>
                      <CardAvatar profile>
                        <img src={calculator} alt="..." />
                      </CardAvatar>
                      <CardBody profile>
                        {!chooseRate ? (
                          <Fragment>
                            <br />
                            <h4 className={classes.cardCategory}>בחר עמלה</h4>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                          </Fragment>
                        ) : (
                          <Fragment>
                            <h6 className={classes.cardCategory}>עמלה</h6>
                            <h4 className={classes.cardTitle}>{rateValue}</h4>
                            <h6 className={classes.cardCategory}>ערך סופי</h6>
                            <h4 className={classes.cardTitle}>
                              {" \u20AA" +
                                Number(
                                  Number(currency.value) + Number(rateValue)
                                ).toFixed(2)}
                            </h4>
                            <br />
                            <TextField
                              type="number"
                              label="הקש סכום"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              fullWidth
                            />
                            <br />
                            <Card plain>
                              <CardHeader plain color="warning">
                                <h4 className={classes.cardTitleWhite}>
                                  סה"כ
                                  {"  :  \u20AA" +
                                    Number(
                                      (Number(currency.value) +
                                        Number(rateValue)) *
                                        Number(amount)
                                    ).toFixed(2) +
                                    ""}
                                </h4>
                              </CardHeader>
                            </Card>
                          </Fragment>
                        )}
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={5}>
                    <br />
                    <Card profile>
                      <CardAvatar profile>
                        {flag({
                          size: 64,
                          code: `${currency.currencyName
                            .substring(0, 2)
                            .toUpperCase()}`,
                        })}
                      </CardAvatar>
                      <CardBody profile>
                        {currency.currencyName === "" ? (
                          <Fragment>
                            <br />
                            <h4 className={classes.cardCategory}>בחר מטבע</h4>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                          </Fragment>
                        ) : (
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <h6 className={classes.cardCategory}>מטבע</h6>
                              <h4 className={classes.cardTitle}>
                                {hebrewCurrencies[currency.currencyName]}{" "}
                                {currency.currencyName
                                  .substring(0, 3)
                                  .toUpperCase()}
                              </h4>
                              <br />
                              <h6 className={classes.cardCategory}>ערך</h6>
                              {checked ? (
                                <h6 className={classes.cardTitle}>
                                  {" \u20AA" + currency.value}
                                </h6>
                              ) : (
                                <h4 className={classes.cardTitle}>
                                  {" \u20AA" + currency.value.toFixed(2)}
                                </h4>
                              )}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <Tooltip
                                id="tooltip-top"
                                title="הצג ערך מלא"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Checkbox
                                  classes={{
                                    root: classes.switch,
                                  }}
                                  checked={checked}
                                  onChange={handleFullValue}
                                  color="primary"
                                  name="checked"
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                />
                              </Tooltip>
                              <Button
                                onClick={() => handleNoRateInput()}
                                fullWidth
                                color="primary"
                                round
                              >
                                ללא עמלה
                              </Button>
                              <Button
                                onClick={() => handleRateInput()}
                                fullWidth
                                color="primary"
                                round
                              >
                                עמלה מותאמת
                              </Button>
                              {rateInput && (
                                <TextField
                                  type="number"
                                  autoFocus
                                  label="הכנס ערך"
                                  value={rateValue}
                                  onChange={(e) => setRateValue(e.target.value)}
                                  fullWidth
                                />
                              )}
                              {currency.isInTable && (
                                <Fragment>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("buyCashRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    קנייה במזומן
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("sellCashRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    מכירה במזומן
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("buyTransferRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    קנייה בהעברה
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRateChoise("sellTransferRate")
                                    }
                                    fullWidth
                                    color="primary"
                                    round
                                  >
                                    מכירה בהעברה
                                  </Button>
                                </Fragment>
                              )}
                            </GridItem>
                          </GridContainer>
                        )}
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <br />
                    <br />
                    {user.currenciesRates.map(
                      (rate) =>
                        rate.isInTable && (
                          <Button
                            fullWidth
                            color="success"
                            key={rate._id}
                            onClick={() =>
                              handleCurrencyChoise(
                                rate.currencyName,
                                currencies[rate.currencyName],
                                true
                              )
                            }
                          >
                            {hebrewCurrencies[rate.currencyName]}{" "}
                            {rate.currencyName.substring(0, 3).toUpperCase()}
                          </Button>
                        )
                    )}
                    <h1>{""}</h1>
                    <br />
                    <Divider />
                    <Autocomplete
                      freeSolo
                      disableClearable
                      id="free-solo-2-demo"
                      getOptionLabel={(curr) => curr}
                      options={Object.keys(currenciesNames).map((curr) => curr)}
                      renderOption={(option) => {
                        return (
                          <GridContainer direction="row" justify="flex-start">
                            <GridItem justify="flex-end">
                              {flag({
                                size: 24,
                                code: `${option.substring(0, 2).toUpperCase()}`,
                              })}
                            </GridItem>
                            <GridItem justify="flex-end">
                              <p
                                onClick={() =>
                                  handleCurrenciesList(
                                    option,
                                    currencies[option],
                                    false
                                  )
                                }
                                className={classes.cardTitle}
                                style={{
                                  color: "black",
                                  textAlign: "left",
                                  fontSize: "14px",
                                }}
                              >
                                {option.substring(0, 3).toUpperCase()}{" "}
                                {hebrewCurrencies[option]}
                              </p>
                            </GridItem>
                          </GridContainer>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          style={{
                            left: "-23px",
                            width: "34ch",
                          }}
                          onClick={handleClickProfile}
                          {...params}
                          label="חפש מטבע"
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Fragment>
          )}
        </Card>
      ) : (
        <h6 className={classes.cardCategory}>
          <Lottie options={defaultOptions} height={200} width={200}>
            LOADING
          </Lottie>
        </h6>
      )}
    </Fragment>
  );
}

flag.propTypes = {
  code: PropTypes.string.isRequired,
  style: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => ({
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
  userLoadRequest: () => dispatch(userLoadRequest()),
  getCurrenciesRequest: () => dispatch(getCurrenciesRequest()),
  resetLoadUser: () => dispatch(resetLoadUser()),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    user: state.userReducer.user,
    currencies: state.getCurrenciesReducer.currencies,
    loadedCurrencies: state.getCurrenciesReducer.loadedCurrencies,
    autoDisconnect: state.userReducer.autoDisconnect,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Calculator));
