import React, { useEffect, Fragment } from "react";
//redux
import { connect } from "react-redux";
import { userLoadRequest } from "../../Redux/Actions/UserActions/userActions";
// @material-ui/core
import { makeStyles, withStyles } from "@material-ui/core";
// core components
import Card from "../Core/Card.js";
import CardBody from "../Core/CardBody.js";
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import styles from "../Styles/userPageStyle.js";
import * as flags from "../../../node_modules/react-round-flags/flags";
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

function Banner(props) {
  const classes = useStyles();
  const { user, loadedUser, currencies } = props;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loadedUser ? (
    <GridContainer
      style={{
        width: `${28 * user.currenciesRates.length}vw`,
        height: "105px",
      }}
    >
      {user.currenciesRates.map((rate) => (
        <GridItem key={rate.currencyName} style={{ marginLeft: "49px" }}>
          <Card tickerCard>
            <CardBody style={{ height: "102px", width: "250px" }}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={7} align="center">
                  {user.userLanguage === "hebrew" ? (
                    <h5
                      className={classes.cardTitle}
                      color="primary"
                      style={{ fontSize: "20px" }}
                    >
                      {hebrewCurrencies[rate.currencyName]}
                    </h5>
                  ) : (
                    <p style={{ fontSize: "17px" }}>
                      {englishCurrencies[rate.currencyName]}
                    </p>
                  )}

                  {user.userLanguage === "hebrew" ? (
                    <Fragment>
                      <h4
                        className={classes.cardTitle}
                        color="primary"
                        style={{ fontSize: "20px", textAlign: "left" }}
                      >
                        b | קנייה :{" "}
                        {`${(
                          rate.buyCashRate + currencies[rate.currencyName]
                        ).toFixed(2)}`}
                      </h4>
                      <h4
                        className={classes.cardTitle}
                        color="primary"
                        style={{ fontSize: "20px", textAlign: "left" }}
                      >
                        s | מכירה :{" "}
                        {`${(
                          rate.sellCashRate + currencies[rate.currencyName]
                        ).toFixed(2)}`}
                      </h4>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p
                        className={classes.cardTitle}
                        color="primary"
                        style={{ fontSize: "20px", textAlign: "left" }}
                      >
                        we buy :{" "}
                        {`${(
                          rate.buyCashRate + currencies[rate.currencyName]
                        ).toFixed(2)}`}
                      </p>
                      <p
                        className={classes.cardTitle}
                        color="primary"
                        style={{ fontSize: "20px", textAlign: "left" }}
                      >
                        we sell :{" "}
                        {`${(
                          rate.sellCashRate + currencies[rate.currencyName]
                        ).toFixed(2)}`}
                      </p>
                    </Fragment>
                  )}
                </GridItem>
                <GridItem xs={12} sm={12} md={5} align="center">
                  {flag({
                    size: 48,
                    code: `${rate.currencyName.substring(0, 2).toUpperCase()}`,
                  })}
                  <h4
                    className={classes.cardTitle}
                    align="center"
                    color="primary"
                  >
                    {rate.currencyName.substring(0, 3).toUpperCase()}
                  </h4>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </GridContainer>
  ) : (
    <p style={{ visibility: "hidden" }}>Placeholder</p>
  );
}

const mapDispatchToProps = (dispatch) => ({
  userLoadRequest: () => dispatch(userLoadRequest()),
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loadedUser: state.userReducer.loadedUser,
    currencies: state.getCurrenciesReducer.currencies,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Banner));
