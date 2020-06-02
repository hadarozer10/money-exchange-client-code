import React, { useEffect, useState, useLayoutEffect, Fragment } from "react";
import io from "socket.io-client";
// redux components
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import {
  currenciesUpdateRequest,
  getCurrenciesRequest,
} from "../../Redux/Actions/MarketDataActions/Currencies/getCurrenciesActions";

// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import Table from "../Core/Table.js";
import Card from "../Core/Card.js";
import CardHeader from "../Core/CardHeader.js";
import CardBody from "../Core/CardBody.js";
import CardAvatar from "../Core/CardAvatar.js";
// styling components
import Banner from "../Layouts/Banner.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Styles/userPageStyle.js";
import Lottie from "react-lottie";
import * as trailLoading from "../../assets/gifs/trailLoading.json";
import * as flags from "../../../node_modules/react-round-flags/flags";
import world from "../../assets/img/world1.jpg";
import hebrewCurrencies from "../../hebrewCurrencyNames.js";
import englishCurrencies from "../../englishCurrencyNames.js";
import Ticker from "react-ticker";
// @material-ui/core
import { withStyles, Tooltip, Checkbox, makeStyles } from "@material-ui/core";

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

const useStyles = makeStyles(styles);
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: trailLoading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

//http://localhost:3000/socket.io
//https://www.moneyexchangeco.com/socket.io

function Currencies(props) {
  const {
    lex,
    user,
    session,
    currencies,
    loadedUser,
    autoDisconnect,
    loadedCurrencies,
  } = props;
  const [time, setTime] = useState("");
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  let clientnow = new Date();
  let clientDate = clientnow.toLocaleDateString("he-IL", {
    timeZone: "Asia/Jerusalem",
  });
  let clientTime = clientnow.toLocaleTimeString("he-IL", {
    hour12: false,
    timeZone: "Asia/Jerusalem",
  });

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
      props.userLoadRequest();
      props.getCurrenciesRequest();
      const socket = io("url not available - demonstration purposes");
      socket.on("some message", ({ currencies, serverTime }) => {
        setTime(serverTime);
        props.currenciesUpdateRequest(currencies);
      });
      return () => {
        socket.close();
        props.resetLoadUser();
      };
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = () => {
    setChecked(!checked);
  };

  const renderHeadLines = (name) => {
    return (
      <h2
        className={classes.cardCategory}
        color="primary"
        style={{ fontSize: "24px" }}
      >
        {name}
      </h2>
    );
  };

  const renderRatesValues = (value) => {
    return (
      <h4
        className={classes.cardTitle}
        color="primary"
        style={{ fontSize: "20px" }}
      >
        {`${value.toFixed(2)}`}
      </h4>
    );
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedCurrencies && loadedUser ? (
        <Fragment>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader
                  color="primary"
                  style={{
                    paddingTop: "2px",
                  }}
                >
                  <GridContainer>
                    {user.userLanguage === "english" ? (
                      <Fragment>
                        <GridItem xs={12} sm={12} md={5}>
                          <h1 className={classes.cardTitleWhite}>
                            Currencies Table
                          </h1>
                          <h4 className={classes.cardTitleWhite}>
                            no commission
                          </h4>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7}>
                          <h4
                            className={classes.cardTitleWhite}
                            style={{
                              textAlign: "right",
                              marginTop: "55px",
                              marginRight: "30px",
                            }}
                          >
                            {time
                              ? "last update : " + clientDate + " " + time
                              : "last update : " +
                                clientDate +
                                " " +
                                clientTime}
                          </h4>
                        </GridItem>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <GridItem xs={12} sm={12} md={9}>
                          <h4
                            className={classes.cardTitleWhite}
                            style={{
                              textAlign: "left",
                              marginTop: "55px",
                              marginLeft: "30px",
                            }}
                          >
                            {time
                              ? "עדכון אחרון :" + clientDate + " " + time
                              : "עדכון אחרון :" + clientDate + " " + clientTime}
                          </h4>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <h1
                            className={classes.cardTitleWhite}
                            style={{
                              padding: "0px",
                              textAlign: "right",
                            }}
                          >
                            שערי מט"ח
                          </h1>
                          <h4
                            className={classes.cardTitleWhite}
                            style={{
                              textAlign: "right",
                            }}
                          >
                            ללא עמלות | no commission
                          </h4>
                        </GridItem>
                      </Fragment>
                    )}
                  </GridContainer>
                </CardHeader>
                <CardBody>
                  {user.userLanguage === "english" ? (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={[
                        <Tooltip
                          id="tooltip-top"
                          title="show transfers"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                            name="checked"
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </Tooltip>,
                        renderHeadLines("currency"),
                        renderHeadLines("we buy"),
                        renderHeadLines("we sell"),
                        checked && renderHeadLines("buy transfer"),
                        checked && renderHeadLines("sell transfer"),
                      ]}
                      tableData={user.currenciesRates.map((rate) =>
                        rate.isInTable
                          ? [
                              <CardAvatar>
                                {flag({
                                  size: 48,
                                  code: `${rate.currencyName
                                    .substring(0, 2)
                                    .toUpperCase()}`,
                                })}
                              </CardAvatar>,
                              <h3
                                className={classes.cardTitle}
                                align="left"
                                color="primary"
                              >
                                {rate.currencyName
                                  .substring(0, 3)
                                  .toUpperCase()}
                                {"  "}
                                {englishCurrencies[rate.currencyName]}
                              </h3>,
                              renderRatesValues(
                                rate.buyCashRate + currencies[rate.currencyName]
                              ),
                              renderRatesValues(
                                rate.sellCashRate +
                                  currencies[rate.currencyName]
                              ),
                              checked &&
                                renderRatesValues(
                                  rate.buyTransferRate +
                                    currencies[rate.currencyName]
                                ),
                              checked &&
                                renderRatesValues(
                                  rate.sellTransferRate +
                                    currencies[rate.currencyName]
                                ),
                            ]
                          : undefined
                      )}
                    />
                  ) : (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={[
                        checked && renderHeadLines("מכירה בהעברה"),
                        checked && renderHeadLines("קנייה בהעברה"),
                        renderHeadLines("מכירה | we sell"),
                        renderHeadLines("קנייה | we buy"),
                        renderHeadLines("מטבע"),
                        <Tooltip
                          id="tooltip-top"
                          title="הצג העברות"
                          placement="top"
                          classes={{
                            tooltip: classes.tooltip,
                          }}
                        >
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            name="checked"
                            color="primary"
                            inputProps={{
                              "aria-label": " primary checkbox",
                            }}
                          />
                        </Tooltip>,
                      ]}
                      tableData={user.currenciesRates.map((rate) =>
                        rate.isInTable
                          ? [
                              checked &&
                                renderRatesValues(
                                  rate.sellTransferRate +
                                    currencies[rate.currencyName]
                                ),
                              checked &&
                                renderRatesValues(
                                  rate.buyTransferRate +
                                    currencies[rate.currencyName]
                                ),
                              renderRatesValues(
                                rate.sellCashRate +
                                  currencies[rate.currencyName]
                              ),
                              renderRatesValues(
                                rate.buyCashRate + currencies[rate.currencyName]
                              ),
                              <h3
                                className={classes.cardTitle}
                                align="right"
                                color="primary"
                              >
                                {hebrewCurrencies[rate.currencyName]}
                                {"  "}
                                {rate.currencyName
                                  .substring(0, 3)
                                  .toUpperCase()}
                              </h3>,
                              <CardAvatar>
                                {flag({
                                  size: 48,
                                  code: `${rate.currencyName
                                    .substring(0, 2)
                                    .toUpperCase()}`,
                                })}
                              </CardAvatar>,
                            ]
                          : undefined
                      )}
                    />
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <div style={{ marginTop: "-25px", height: "105px" }}>
            <Ticker offset="run-in" move={true} speed={10} height={105}>
              {() => <Banner />}
            </Ticker>
          </div>
        </Fragment>
      ) : (
        <Lottie options={defaultOptions} height={200} width={200}>
          LOADING
        </Lottie>
      )}
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
  getCurrenciesRequest: () => dispatch(getCurrenciesRequest()),
  userLoadRequest: () => dispatch(userLoadRequest()),
  currenciesUpdateRequest: (currencies) =>
    dispatch(currenciesUpdateRequest(currencies)),
  resetLoadUser: () => dispatch(resetLoadUser()),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    autoDisconnect: state.userReducer.autoDisconnect,
    user: state.userReducer.user,
    currencies: state.getCurrenciesReducer.currencies,
    loadedCurrencies: state.getCurrenciesReducer.loadedCurrencies,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Currencies));
