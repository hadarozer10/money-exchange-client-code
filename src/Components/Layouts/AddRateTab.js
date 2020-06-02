import React, { useEffect, useState, useLayoutEffect, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import { updateRateRequest } from "../../Redux/Actions/MarketDataActions/Rates/updateRateActions";
import { deleteRateRequest } from "../../Redux/Actions/MarketDataActions/Rates/deleteRateActions";
import { addRateRequest } from "../../Redux/Actions/MarketDataActions/Rates/addRateActions";
import { getCurrenciesRequest } from "../../Redux/Actions/MarketDataActions/Currencies/getCurrenciesActions";
// @material-ui/core
import { withStyles, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import Card from "../Core/Card.js";
import CardBody from "../Core/CardBody.js";
import Button from "../Core/Button.js";
import CardAvatar from "../Core/CardAvatar.js";
// styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dropdownStyle from "../Styles/dropdownStyle.js";
import userStyles from "../Styles/userPageStyle.js";
import * as flags from "../../../node_modules/react-round-flags/flags";
import Lottie from "react-lottie";
import * as trailLoading from "../../assets/gifs/trailLoading.json";
import world from "../../assets/img/world1.jpg";
import world5 from "../../assets/img/world5.jpg";
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

function AddRateTab(props) {
  const {
    currencyName,
    currencyValue,
    buyCashRate,
    sellCashRate,
    buyTransferRate,
    sellTransferRate,
    setCurrency,
    setCurrencyValue,
    setBuyCashRate,
    setSellCashRate,
    setBuyTransferRate,
    setSellTransferRate,
    autoDisconnect,
    loadedCurrencies,
    addRateSuccess,
    currencies,
    session,
    loadedUser,
    user,
    lex,
  } = props;
  const classes = useStyles();
  const [currenciesNames, setCurrencies] = useState({});

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
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRateSuccess]);

  const handleClickProfile = () => {
    setCurrencies({ ...currencies });
  };

  const handleChooseCurrency = (currencyName, currencyValue) => {
    setCurrency(currencyName);
    setCurrencyValue(currencyValue);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedCurrencies && loadedUser ? (
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={4}
            style={{
              width: "100%",
              height: "400px",
              overflow: "hidden",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <Autocomplete
              freeSolo
              disableClearable
              id="free-solo-2-demo"
              getOptionLabel={(curr) => curr}
              options={Object.keys(currenciesNames).map((curr) => curr)}
              renderOption={(option) => {
                return (
                  <GridContainer direction="row" justify="flex-start">
                    <GridItem>
                      {flag({
                        size: 24,
                        code: `${option.substring(0, 2).toUpperCase()}`,
                      })}
                    </GridItem>
                    <GridItem>
                      {user.userLanguage === "english" ? (
                        <p
                          onClick={() =>
                            handleChooseCurrency(option, currencies[option])
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
                      ) : (
                        <p
                          onClick={() =>
                            handleChooseCurrency(option, currencies[option])
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
                      )}
                    </GridItem>
                  </GridContainer>
                );
              }}
              renderInput={(params) => (
                <TextField
                  style={{
                    left: "20px",
                    width: "38ch",
                    marginTop: "100px",
                  }}
                  onClick={handleClickProfile}
                  {...params}
                  label={
                    user.userLanguage === "english"
                      ? "search for a currency"
                      : "חפש מטבע"
                  }
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

          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                {flag({
                  size: 64,
                  code: `${currencyName.substring(0, 2).toUpperCase()}`,
                })}
              </CardAvatar>
              <CardBody profile>
                {currencyName === "" ? (
                  <Fragment>
                    <br />
                    <h4 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "please choose currency"
                        : "בחר מטבע"}
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
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english" ? "Currency" : "מטבע"}
                    </h6>
                    <h4 className={classes.cardTitle}>
                      {user.userLanguage === "english"
                        ? currencyName.substring(0, 3).toUpperCase() +
                          " " +
                          englishCurrencies[currencyName]
                        : hebrewCurrencies[currencyName] +
                          " " +
                          currencyName.substring(0, 3).toUpperCase()}
                    </h4>
                    <br />
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english" ? "Value" : "ערך"}
                    </h6>
                    <h4 className={classes.cardTitle}>
                      {currencyValue.toFixed(2)}
                    </h4>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "buy cash"
                        : "קנייה במזומן"}
                    </h6>
                    {buyCashRate ? (
                      <h5 className={classes.cardTitle}>{buyCashRate}</h5>
                    ) : (
                      <h5 className={classes.cardTitle}>
                        {user.userLanguage === "english"
                          ? "set buy cash rate"
                          : "עדכן ערך"}
                      </h5>
                    )}

                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "sell cash"
                        : "מכירה במזומן"}
                    </h6>
                    {sellCashRate ? (
                      <h5 className={classes.cardTitle}>{sellCashRate}</h5>
                    ) : (
                      <h5 className={classes.cardTitle}>
                        {user.userLanguage === "english"
                          ? "set sell cash rate"
                          : "עדכן ערך"}
                      </h5>
                    )}

                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "buy transfer"
                        : "קנייה בהעברה"}
                    </h6>
                    {buyTransferRate ? (
                      <h5 className={classes.cardTitle}>{buyTransferRate}</h5>
                    ) : (
                      <h5 className={classes.cardTitle}>
                        {user.userLanguage === "english"
                          ? "set buy transfer rate"
                          : "עדכן ערך"}
                      </h5>
                    )}

                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "sell transfer"
                        : "מכירה בהעברה"}
                    </h6>
                    {sellTransferRate ? (
                      <h5 className={classes.cardTitle}>{sellTransferRate}</h5>
                    ) : (
                      <h5 className={classes.cardTitle}>
                        {user.userLanguage === "english"
                          ? "set sell transfer rate"
                          : "עדכן ערך"}
                      </h5>
                    )}
                  </Fragment>
                )}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <img src={world5} alt="..." />
              </CardAvatar>
              <CardBody profile>
                {currencyName === "" ? (
                  <Fragment>
                    <br />
                    <h4 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "please choose currency"
                        : "בחר מטבע"}
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
                    <TextField
                      type="number"
                      autoFocus
                      label={
                        user.userLanguage === "english"
                          ? "buy cash rate"
                          : "קנייה במזומן"
                      }
                      value={buyCashRate}
                      onChange={(e) => setBuyCashRate(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      autoFocus
                      label={
                        user.userLanguage === "english"
                          ? "sell cash rate"
                          : "מכירה במזומן"
                      }
                      value={sellCashRate}
                      onChange={(e) => setSellCashRate(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      autoFocus
                      label={
                        user.userLanguage === "english"
                          ? "buy transfer rate"
                          : "קנייה בהעברה"
                      }
                      value={buyTransferRate}
                      onChange={(e) => setBuyTransferRate(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      type="number"
                      autoFocus
                      label={
                        user.userLanguage === "english"
                          ? "sell transfer rate"
                          : "מכירה בהעברה"
                      }
                      value={sellTransferRate}
                      onChange={(e) => setSellTransferRate(e.target.value)}
                      fullWidth
                    />
                  </Fragment>
                )}
                <Button
                  fullWidth
                  color="success"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={() =>
                    props.handleAddRate(
                      currencyName,
                      currencyValue,
                      buyCashRate,
                      sellCashRate,
                      buyTransferRate,
                      sellTransferRate
                    )
                  }
                >
                  {user.userLanguage === "english"
                    ? "add rate"
                    : "הוסף עמלות למטבע"}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
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

const mapDispatchToProps = (dispatch) => ({
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
  userLoadRequest: () => dispatch(userLoadRequest()),
  updateRateRequest: (rate) => dispatch(updateRateRequest(rate)),
  resetLoadUser: () => dispatch(resetLoadUser()),
  getCurrenciesRequest: () => dispatch(getCurrenciesRequest()),
  deleteRateRequest: (id) => dispatch(deleteRateRequest(id)),
  addRateRequest: (rate) => dispatch(addRateRequest(rate)),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    user: state.userReducer.user,
    autoDisconnect: state.userReducer.autoDisconnect,
    updateRateSuccess: state.updateRateReducer,
    currencies: state.getCurrenciesReducer.currencies,
    loadedCurrencies: state.getCurrenciesReducer.loadedCurrencies,
    deleteRateSuccess: state.deleteRateReducer.deleteRateSuccess,
    addRateSuccess: state.addRateReducer.addRateSuccess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddRateTab));
