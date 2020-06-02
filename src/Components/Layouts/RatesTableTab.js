import React, { useEffect, useLayoutEffect, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
} from "../../Redux/Actions/UserActions/userActions";
import { getCurrenciesRequest } from "../../Redux/Actions/MarketDataActions/Currencies/getCurrenciesActions";
// @material-ui/core
import {
  withStyles,
  makeStyles,
  Checkbox,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
// core components
import Table from "../Core/Table.js";
import CardAvatar from "../Core/CardAvatar.js";
//styles
import dropdownStyle from "../Styles/dropdownStyle.js";
import userStyles from "../Styles/userPageStyle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import * as flags from "../../../node_modules/react-round-flags/flags";
import Lottie from "react-lottie";
import world from "../../assets/img/world1.jpg";
import * as trailLoading from "../../assets/gifs/trailLoading.json";
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
  } else {
    return (
      <img
        width="48px"
        height="36px"
        src={world}
        maxWidth="64px"
        maxHeight="64px"
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

function RatesTableTab(props) {
  const {
    user,
    currencies,
    deleteRateSuccess,
    autoDisconnect,
    session,
    loadedUser,
    lex,
    loadedCurrencies,
    updateRateSuccess,
  } = props;
  const classes = useStyles();

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
      if (props.updateFavoriteSuccess === false) {
        props.getCurrenciesRequest();
        props.userLoadRequest();
      }
      return () => {
        props.resetUpdateFavorite();
      };
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteRateSuccess, updateRateSuccess]);

  const renderHeadLines = (name, type) => {
    if (type === "category") {
      return (
        <h6 className={classes.cardCategory} color="primary">
          {name}
        </h6>
      );
    } else {
      return (
        <h6 className={classes.cardTitle} color="primary">
          {name}
        </h6>
      );
    }
  };

  const renderRatesValues = (value) => {
    return (
      <h4 className={classes.cardTitle} color="primary">
        {`${value.toFixed(6).slice(0, -4)}`}
      </h4>
    );
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedCurrencies && loadedUser ? (
        <Fragment>
          {user.userLanguage === "english" ? (
            <Table
              tableHeaderColor="primary"
              tableHead={[
                <Tooltip
                  id="tooltip-top"
                  title="Choose your favorties rates"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                  >
                    <CheckBoxIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>,
                renderHeadLines("", "category"),
                renderHeadLines("currency", "category"),
                renderHeadLines("value", "category"),
                renderHeadLines("buy cash", "category"),
                renderHeadLines("sell cash", "category"),
                renderHeadLines("buy transfer", "category"),
                renderHeadLines("sell transfer", "category"),
              ]}
              tableData={user.currenciesRates.map((rate) => [
                <Checkbox
                  checked={rate.isInTable}
                  tabIndex={-1}
                  onClick={() => props.handleFavorites(rate)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root,
                  }}
                />,
                <CardAvatar>
                  {flag({
                    size: 48,
                    code: `${rate.currencyName.substring(0, 2).toUpperCase()}`,
                  })}
                </CardAvatar>,
                <h6 className={classes.cardTitle} align="left" color="primary">
                  {rate.currencyName.substring(0, 3).toUpperCase()}{" "}
                  {englishCurrencies[rate.currencyName]}
                </h6>,
                renderRatesValues(currencies[rate.currencyName]),
                renderRatesValues(rate.buyCashRate),
                renderRatesValues(rate.sellCashRate),
                renderRatesValues(rate.buyTransferRate),
                renderRatesValues(rate.sellTransferRate),
                <Tooltip
                  id="tooltip-top"
                  title="Edit Rate"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() =>
                      props.toggleUpdateRateTab(
                        rate.currencyName,
                        currencies[rate.currencyName],
                        rate.buyCashRate,
                        rate.sellCashRate,
                        rate.buyTransferRate,
                        rate.sellTransferRate
                      )
                    }
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>,
                <Tooltip
                  id="tooltip-top-start"
                  title="Remove"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    onClick={() => props.handleRemoveRate(rate.currencyName)}
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>,
              ])}
            />
          ) : (
            <Table
              tableHeaderColor="primary"
              tableHead={[
                renderHeadLines("", "category"),
                renderHeadLines("", "category"),
                renderHeadLines("מכירה בהעברה", "category"),
                renderHeadLines("קנייה בהעברה", "category"),
                renderHeadLines("מכירה במזומן", "category"),
                renderHeadLines("קנייה במזומן", "category"),
                renderHeadLines("ערך", "category"),
                renderHeadLines("מטבע", "category"),
                renderHeadLines("", "category"),
                <Tooltip
                  id="tooltip-top"
                  title="בחר את המטבעות המועדפים שלך"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="ערוך עמלת מטבע"
                    className={classes.tableActionButton}
                  >
                    <CheckBoxIcon
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>,
              ]}
              tableData={user.currenciesRates.map((rate) => [
                <Tooltip
                  id="tooltip-top-start"
                  title="הסר עמלה"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    onClick={() => props.handleRemoveRate(rate.currencyName)}
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>,
                <Tooltip
                  id="tooltip-top"
                  title="עדכן עמלה"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Edit"
                    className={classes.tableActionButton}
                    onClick={() =>
                      props.toggleUpdateRateTab(
                        rate.currencyName,
                        currencies[rate.currencyName],
                        rate.buyCashRate,
                        rate.sellCashRate,
                        rate.buyTransferRate,
                        rate.sellTransferRate
                      )
                    }
                  >
                    <Edit
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>,
                renderRatesValues(rate.sellTransferRate),
                renderRatesValues(rate.buyTransferRate),
                renderRatesValues(rate.sellCashRate),
                renderRatesValues(rate.buyCashRate),
                renderRatesValues(currencies[rate.currencyName]),
                <h6 className={classes.cardTitle} align="right" color="primary">
                  {hebrewCurrencies[rate.currencyName]}{" "}
                  {rate.currencyName.substring(0, 3).toUpperCase()}
                </h6>,
                <CardAvatar>
                  {flag({
                    size: 48,
                    code: `${rate.currencyName.substring(0, 2).toUpperCase()}`,
                  })}
                </CardAvatar>,
                <Checkbox
                  checked={rate.isInTable}
                  onClick={() => props.handleFavorites(rate)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root,
                  }}
                />,
              ])}
            />
          )}
        </Fragment>
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
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    deleteRateSuccess: state.deleteRateReducer.deleteRateSuccess,
    autoDisconnect: state.userReducer.autoDisconnect,
    user: state.userReducer.user,
    currencies: state.getCurrenciesReducer.currencies,
    updateRateSuccess: state.updateRateReducer.updateRateSuccess,
    updateFavoriteSuccess: state.updateRateReducer.updateFavoriteSuccess,
    loadedCurrencies: state.getCurrenciesReducer.loadedCurrencies,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RatesTableTab));
