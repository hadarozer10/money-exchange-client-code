import React, { useEffect, useLayoutEffect, useState, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
} from "../../Redux/Actions/UserActions/userActions";
import { registerUserRequest } from "../../Redux/Actions/AdminActions/registerUserActions";
// @material-ui/core
import { makeStyles, withStyles, TextField } from "@material-ui/core";
// core components
import Card from "../Core/Card.js";
import Button from "../Core/Button.js";
import CardBody from "../Core/CardBody.js";
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
//styles
import Lottie from "react-lottie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import userStyles from "../Styles/userPageStyle.js";
import dropdownStyle from "../Styles/dropdownStyle.js";
import * as trailLoading from "../../assets/gifs/trailLoading.json";

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

function AddUserTab(props) {
  const {
    session,
    loadedUser,
    lex,
    registerUserSuccess,
    autoDisconnect,
  } = props;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");
  const [ipAdrress, setIpAdrress] = useState("");
  const [userLanguage, setUserLanguage] = useState("");

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
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setStoreName("");
      setAddress("");
      setLicenceNumber("");
      setIpAdrress("");
      setUserLanguage("");
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerUserSuccess]);

  const handleAddUser = () => {
    const user = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      storeName: storeName,
      address: address,
      licenceNumber: licenceNumber,
      ipAdrress: ipAdrress,
      userLanguage: userLanguage,
      isLoggedIn: false,
    };
    props.registerUserRequest(user);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedUser ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card profile>
              <CardBody profile>
                <TextField
                  type="text"
                  autoFocus
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="password"
                  autoFocus
                  label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="store name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="licence number"
                  value={licenceNumber}
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="ip adrress"
                  value={ipAdrress}
                  onChange={(e) => setIpAdrress(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="user language"
                  value={userLanguage}
                  onChange={(e) => setUserLanguage(e.target.value)}
                  fullWidth
                />
                <Button
                  fullWidth
                  color="success"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleAddUser}
                >
                  add user
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card profile>
              <CardBody profile>
                <h6 className={classes.cardCategory}>name</h6>
                <h4 className={classes.cardTitle}>{name}</h4>
                <h6 className={classes.cardCategory}>email</h6>
                <h4 className={classes.cardTitle}>{email}</h4>
                <h6 className={classes.cardCategory}>password</h6>
                <h4 className={classes.cardTitle}>{password}</h4>
                <h6 className={classes.cardCategory}>phone</h6>
                <h4 className={classes.cardTitle}>{phone}</h4>
                <h6 className={classes.cardCategory}>store name</h6>
                <h4 className={classes.cardTitle}>{storeName}</h4>
                <h6 className={classes.cardCategory}>address</h6>
                <h4 className={classes.cardTitle}>{address}</h4>
                <h6 className={classes.cardCategory}>licence number</h6>
                <h4 className={classes.cardTitle}>{licenceNumber}</h4>
                <h6 className={classes.cardCategory}>ip adrress</h6>
                <h4 className={classes.cardTitle}>{ipAdrress}</h4>
                <h6 className={classes.cardCategory}>user language</h6>
                <h4 className={classes.cardTitle}>{userLanguage}</h4>
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
  registerUserRequest: (user) => dispatch(registerUserRequest(user)),
  userLoadRequest: () => dispatch(userLoadRequest()),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    autoDisconnect: state.userReducer.autoDisconnect,
    registerUserSuccess: state.registerReducer.registerUserSuccess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddUserTab));
