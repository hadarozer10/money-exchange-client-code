import React, { useEffect, useState, useLayoutEffect, Fragment } from "react";
import { withStyles, TextField } from "@material-ui/core";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
} from "../../Redux/Actions/UserActions/userActions";
import { deleteUserRequest } from "../../Redux/Actions/AdminActions/deleteUserActions";
import { updateUserRequest } from "../../Redux/Actions/AdminActions/updateUserActions";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import Card from "../Core/Card.js";
import CardBody from "../Core/CardBody.js";
import Button from "../Core/Button.js";
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

function UpdateUserTab(props) {
  const classes = useStyles();
  const [name, setName] = useState(props.selectedUser.name);
  const [email, setEmail] = useState(props.selectedUser.email);
  const [phone, setPhone] = useState(props.selectedUser.phone);
  const [address, setAddress] = useState(props.selectedUser.address);
  const [storeName, setStoreName] = useState(props.selectedUser.storeName);
  const [licenceNumber, setLicenceNumber] = useState(
    props.selectedUser.licenceNumber
  );
  const [ip, setIp] = useState(props.selectedUser.ip);
  const [userLanguage, setUserLanguage] = useState(
    props.selectedUser.userLanguage
  );
  const { session, loadedUser, lex, autoDisconnect } = props;

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
      userLoadRequest();
    } else {
      autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUser = () => {
    const user = {
      tmpid: props.selectedUser._id,
      tmpname: name,
      tmpemail: email,
      tmpphone: phone,
      tmppassword: "",
      tmpnewPassword: "",
      tmpstoreName: storeName,
      tmpaddress: address,
      tmplicenceNumber: licenceNumber,
      tmpIp: ip,
      tmpUserLanguage: userLanguage,
    };
    props.updateUserRequest(user);
    props.handleGetUserDetails({});
    return;
  };

  const handleDeleteUser = () => {
    props.deleteUserRequest(props.selectedUser._id);
    props.handleGetUserDetails({});
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedUser ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
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
                  label="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  label="licence number"
                  value={licenceNumber}
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  autoFocus
                  label="ip"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
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
                  color="primary"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleUpdateUser}
                >
                  update user
                </Button>
                <Button
                  fullWidth
                  disabled={!props.selectedUser.isLoggedIn}
                  color="warning"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={() =>
                    props.handleForceLogout(props.selectedUser._id)
                  }
                >
                  force logout
                </Button>
                <Button
                  fullWidth
                  color="danger"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleDeleteUser}
                >
                  delete user
                </Button>
                <Button
                  fullWidth
                  color="success"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={() => props.handleGetUserDetails({})}
                >
                  cancel
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card profile>
              <CardBody profile>
                <h6 className={classes.cardCategory}>Name</h6>
                <h4 className={classes.cardTitle}>{name}</h4>
                <h6 className={classes.cardCategory}>Email</h6>
                <h4 className={classes.cardTitle}>{email}</h4>
                <h6 className={classes.cardCategory}>phone</h6>
                <h5 className={classes.cardTitle}>{phone}</h5>
                <h6 className={classes.cardCategory}>address</h6>
                <h5 className={classes.cardTitle}>{address}</h5>
                <h6 className={classes.cardCategory}>store name</h6>
                <h5 className={classes.cardTitle}>{storeName}</h5>
                <h6 className={classes.cardCategory}>licence number</h6>
                <h5 className={classes.cardTitle}>{licenceNumber}</h5>
                <h6 className={classes.cardCategory}>user ip</h6>
                <h5 className={classes.cardTitle}>{ip}</h5>
                <h6 className={classes.cardCategory}>user language</h6>
                <h5 className={classes.cardTitle}>{userLanguage}</h5>
                <h6 className={classes.cardCategory}>id</h6>
                <h5 className={classes.cardTitle}>{props.selectedUser._id}</h5>
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
  updateUserRequest: (user) => dispatch(updateUserRequest(user)),
  deleteUserRequest: (id) => dispatch(deleteUserRequest(id)),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    autoDisconnect: state.userReducer.autoDisconnect,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateUserTab));
