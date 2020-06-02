import React, { useEffect, useLayoutEffect, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import { updateRateRequest } from "../../Redux/Actions/MarketDataActions/Rates/updateRateActions";
import { getCurrenciesRequest } from "../../Redux/Actions/MarketDataActions/Currencies/getCurrenciesActions";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import Card from "../Core/Card.js";
import CardBody from "../Core/CardBody.js";
import Button from "../Core/Button.js";
import CardAvatar from "../Core/CardAvatar.js";
//styles
import { withStyles, TextField } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dropdownStyle from "../Styles/dropdownStyle.js";
import userStyles from "../Styles/userPageStyle.js";
import Lottie from "react-lottie";
import * as trailLoading from "../../assets/gifs/trailLoading.json";
import PropTypes from "prop-types";
import * as flags from "../../../node_modules/react-round-flags/flags";
import world5 from "../../assets/img/world5.jpg";
import hebrewCurrencies from "../../hebrewCurrencyNames.js";
import englishCurrencies from "../../englishCurrencyNames.js";

const flag = ({ size = 64, code, type = "shiny", style }) => {
  const flag = flags[`icons${size}`][code];
  return (
    <img
      src={flag || world5}
      style={({ width: size, height: size }, style)}
      alt="..."
    />
  );
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

function UpdateRateTab(props) {
  const classes = useStyles();
  const {
    currencyName,
    currencyValue,
    buyCashRate,
    sellCashRate,
    buyTransferRate,
    sellTransferRate,
    setBuyCashRate,
    setSellCashRate,
    setBuyTransferRate,
    setSellTransferRate,
    session,
    loadedUser,
    lex,
    user,
    autoDisconnect,
    loadedCurrencies,
    updateRateSuccess,
  } = props;

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
      userLoadRequest();
    } else {
      autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateRateSuccess]);

  const handleUpdateRate = (
    currencyName,
    currencyValue,
    buyCashRate,
    sellCashRate,
    buyTransferRate,
    sellTransferRate
  ) => {
    const rate = {
      currencyName: currencyName,
      currencyValue: currencyValue,
      buyCashRate: buyCashRate,
      sellCashRate: sellCashRate,
      buyTransferRate: buyTransferRate,
      sellTransferRate: sellTransferRate,
    };
    props.updateRateRequest(rate);
    props.toggleUpdateRateTab("", 0.0, 0.0, 0.0, 0.0, 0.0);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedCurrencies && loadedUser ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardBody profile>
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
                <Button
                  fullWidth
                  color="success"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={() =>
                    handleUpdateRate(
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
                    ? "update rate"
                    : "עדכן עמלה"}
                </Button>
                <Button
                  fullWidth
                  color="success"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={() =>
                    props.toggleUpdateRateTab("", 0.0, 0.0, 0.0, 0.0, 0.0)
                  }
                >
                  {user.userLanguage === "english" ? "cancel" : "בטל"}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card profile>
              <CardAvatar profile>
                {flag({
                  code: `${currencyName.substring(0, 2).toUpperCase()}`,
                })}
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>
                  {user.userLanguage === "english" ? "Currency" : "מטבע"}
                </h6>
                {user.userLanguage === "english" ? (
                  <h4 className={classes.cardTitle}>
                    {currencyName.substring(0, 3).toUpperCase()}{" "}
                    {englishCurrencies[currencyName]}
                  </h4>
                ) : (
                  <h4 className={classes.cardTitle}>
                    {hebrewCurrencies[currencyName]}{" "}
                    {currencyName.substring(0, 3).toUpperCase()}
                  </h4>
                )}

                <br />
                <h6 className={classes.cardCategory}>
                  {user.userLanguage === "english" ? "Value" : "ערך"}
                </h6>
                <h4 className={classes.cardTitle}>
                  {currencyValue.toFixed(6).slice(0, -4) + " \u20AA"}
                </h4>
                <h6 className={classes.cardCategory}>
                  {user.userLanguage === "english"
                    ? "buy cash"
                    : "קנייה במזומן"}
                </h6>
                <h5 className={classes.cardTitle}>{buyCashRate}</h5>
                <h6 className={classes.cardCategory}>
                  {user.userLanguage === "english"
                    ? "sell cash"
                    : "מכירה במזומן"}
                </h6>
                <h5 className={classes.cardTitle}>{sellCashRate}</h5>
                <h6 className={classes.cardCategory}>
                  {user.userLanguage === "english"
                    ? "buy transfer"
                    : "קנייה בהעברה"}
                </h6>
                <h5 className={classes.cardTitle}>{buyTransferRate}</h5>
                <h6 className={classes.cardCategory}>
                  {user.userLanguage === "english"
                    ? "sell transfer"
                    : "מכירה בהעברה"}
                </h6>
                <h5 className={classes.cardTitle}>{sellTransferRate}</h5>
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
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    updateRateSuccess: state.updateRateReducer,
    loadedUser: state.userReducer.loadedUser,
    user: state.userReducer.user,
    loadedCurrencies: state.getCurrenciesReducer.loadedCurrencies,
    autoDisconnect: state.userReducer.autoDisconnect,
  };
};

flag.propTypes = {
  code: PropTypes.string.isRequired,
  style: PropTypes.any,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateRateTab));
