import React, { useEffect, useLayoutEffect, useState, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import { addRateRequest } from "../../Redux/Actions/MarketDataActions/Rates/addRateActions";
import {
  updateRateRequest,
  updateFavoriteRequest,
  resetUpdateFavorite,
} from "../../Redux/Actions/MarketDataActions/Rates/updateRateActions";
import { deleteRateRequest } from "../../Redux/Actions/MarketDataActions/Rates/deleteRateActions";
// @material-ui/core
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import CustomTabs from "../Core/CustomTabs.js";
//layouts
import RatesTableTab from "../Layouts/RatesTableTab.js";
import AddRateTab from "../Layouts/AddRateTab.js";
import UpdateRateTab from "../Layouts/UpdateRateTab.js";
//styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RateManagement(props) {
  const { session, lex, user, autoDisconnect } = props;

  const [currencyName, setCurrency] = useState("");
  const [currencyValue, setCurrencyValue] = useState(0.0);
  const [buyCashRate, setBuyCashRate] = useState(0.0);
  const [sellCashRate, setSellCashRate] = useState(0.0);
  const [buyTransferRate, setBuyTransferRate] = useState(0.0);
  const [sellTransferRate, setSellTransferRate] = useState(0.0);
  const [updateRate, setUpdateRate] = useState(false);

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
      return () => {
        props.resetLoadUser();
      };
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleUpdateRateTab = (
    currencyName,
    currencyValue,
    buyCashRate,
    sellCashRate,
    buyTransferRate,
    sellTransferRate
  ) => {
    setCurrency(currencyName);
    setCurrencyValue(currencyValue);
    setBuyCashRate(buyCashRate);
    setSellCashRate(sellCashRate);
    setBuyTransferRate(buyTransferRate);
    setSellTransferRate(sellTransferRate);
    setUpdateRate(!updateRate);
    return;
  };

  const handleRemoveRate = (name) => {
    props.deleteRateRequest(name);
    return;
  };

  const handleFavorites = (chosenRate) => {
    let rate = chosenRate;
    rate.isInTable = !chosenRate.isInTable;
    props.updateFavoriteRequest(rate);

    return;
  };

  const handleAddRate = () => {
    const rate = {
      currencyName: currencyName,
      currencyValue: currencyValue,
      buyCashRate: buyCashRate,
      sellCashRate: sellCashRate,
      buyTransferRate: buyTransferRate,
      sellTransferRate: sellTransferRate,
    };
    props.addRateRequest(rate);
    setCurrency("");
    setCurrencyValue(0.0);
    setBuyCashRate(0.0);
    setSellCashRate(0.0);
    setBuyTransferRate(0.0);
    setSellTransferRate(0.0);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {user.userLanguage === "english" ? (
            <CustomTabs
              headerColor="primary"
              tabs={
                updateRate
                  ? [
                      {
                        tabName: "update rate ",
                        tabIcon: EqualizerIcon,
                        tabContent: (
                          <UpdateRateTab
                            currencyName={currencyName}
                            currencyValue={currencyValue}
                            buyCashRate={buyCashRate}
                            sellCashRate={sellCashRate}
                            buyTransferRate={buyTransferRate}
                            sellTransferRate={sellTransferRate}
                            setBuyCashRate={setBuyCashRate}
                            setSellCashRate={setSellCashRate}
                            setBuyTransferRate={setBuyTransferRate}
                            setSellTransferRate={setSellTransferRate}
                            toggleUpdateRateTab={toggleUpdateRateTab}
                            {...props}
                          />
                        ),
                      },
                    ]
                  : [
                      {
                        tabName: "rates table",
                        tabIcon: EqualizerIcon,
                        tabContent: (
                          <RatesTableTab
                            toggleUpdateRateTab={toggleUpdateRateTab}
                            handleRemoveRate={handleRemoveRate}
                            handleFavorites={handleFavorites}
                            {...props}
                          />
                        ),
                      },
                      {
                        tabName: "add new rate",
                        tabIcon: AddCircleOutlineIcon,
                        tabContent: (
                          <AddRateTab
                            currencyName={currencyName}
                            currencyValue={currencyValue}
                            buyCashRate={buyCashRate}
                            sellCashRate={sellCashRate}
                            buyTransferRate={buyTransferRate}
                            sellTransferRate={sellTransferRate}
                            setCurrency={setCurrency}
                            setCurrencyValue={setCurrencyValue}
                            setBuyCashRate={setBuyCashRate}
                            setSellCashRate={setSellCashRate}
                            setBuyTransferRate={setBuyTransferRate}
                            setSellTransferRate={setSellTransferRate}
                            handleAddRate={handleAddRate}
                            {...props}
                          />
                        ),
                      },
                    ]
              }
            />
          ) : (
            user.userLanguage === "hebrew" && (
              <CustomTabs
                headerColor="primary"
                tabs={
                  updateRate
                    ? [
                        {
                          tabName: "עדכן עמלה",
                          tabIcon: EqualizerIcon,
                          tabContent: (
                            <UpdateRateTab
                              currencyName={currencyName}
                              currencyValue={currencyValue}
                              buyCashRate={buyCashRate}
                              sellCashRate={sellCashRate}
                              buyTransferRate={buyTransferRate}
                              sellTransferRate={sellTransferRate}
                              setBuyCashRate={setBuyCashRate}
                              setSellCashRate={setSellCashRate}
                              setBuyTransferRate={setBuyTransferRate}
                              setSellTransferRate={setSellTransferRate}
                              toggleUpdateRateTab={toggleUpdateRateTab}
                              {...props}
                            />
                          ),
                        },
                      ]
                    : [
                        {
                          tabName: "טבלת עמלות",
                          tabIcon: EqualizerIcon,
                          tabContent: (
                            <RatesTableTab
                              toggleUpdateRateTab={toggleUpdateRateTab}
                              handleRemoveRate={handleRemoveRate}
                              handleFavorites={handleFavorites}
                              {...props}
                            />
                          ),
                        },
                        {
                          tabName: "הוסף עמלה למטבע",
                          tabIcon: AddCircleOutlineIcon,
                          tabContent: (
                            <AddRateTab
                              currencyName={currencyName}
                              currencyValue={currencyValue}
                              buyCashRate={buyCashRate}
                              sellCashRate={sellCashRate}
                              buyTransferRate={buyTransferRate}
                              sellTransferRate={sellTransferRate}
                              setCurrency={setCurrency}
                              setCurrencyValue={setCurrencyValue}
                              setBuyCashRate={setBuyCashRate}
                              setSellCashRate={setSellCashRate}
                              setBuyTransferRate={setBuyTransferRate}
                              setSellTransferRate={setSellTransferRate}
                              handleAddRate={handleAddRate}
                              {...props}
                            />
                          ),
                        },
                      ]
                }
              />
            )
          )}
        </GridItem>
      </GridContainer>
    </Fragment>
  );
}
const mapDispatchToProps = (dispatch) => ({
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
  updateRateRequest: (rate) => dispatch(updateRateRequest(rate)),
  updateFavoriteRequest: (rate) => dispatch(updateFavoriteRequest(rate)),
  resetUpdateFavorite: () => dispatch(resetUpdateFavorite()),
  resetLoadUser: () => dispatch(resetLoadUser()),
  deleteRateRequest: (id) => dispatch(deleteRateRequest(id)),
  addRateRequest: (rate) => dispatch(addRateRequest(rate)),
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    autoDisconnect: state.userReducer.autoDisconnect,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RateManagement);
