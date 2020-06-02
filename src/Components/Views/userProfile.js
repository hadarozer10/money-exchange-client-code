import React, { useEffect, useLayoutEffect, useState, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import { updateUserRequest } from "../../Redux/Actions/AdminActions/updateUserActions";

// @material-ui/core
import { withStyles, makeStyles, TextField } from "@material-ui/core";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import Card from "../Core/Card.js";
import CardHeader from "../Core/CardHeader.js";
import CardBody from "../Core/CardBody.js";
import CardFooter from "../Core/CardFooter.js";
import CardAvatar from "../Core/CardAvatar.js";
import Button from "../Core/Button.js";

// styles
import profile from "../../assets/img/profile.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../Styles/userPageStyle.js";
import Lottie from "react-lottie";
import * as trailLoading from "../../assets/gifs/trailLoading.json";

const useStyles = makeStyles(styles);
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: trailLoading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function UserProfile(props) {
  const {
    user,
    updateSuccess,
    autoDisconnect,
    lex,
    session,
    loadedUser,
  } = props;

  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [licenceNumber, setLicenceNumber] = useState("");

  useLayoutEffect(() => {
    if (autoDisconnect) {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDisconnect]);

  useEffect(() => {
    props.userLoadRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  useEffect(() => {
    if (
      document.cookie.match("connect.sid") &&
      document.cookie.match("connect.sid").input === session
    ) {
      props.userLoadRequest();
      return () => {
        props.resetLoadUser();
      };
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = () => {
    const tmpUser = {
      tmpUserLanguage: user.userLanguage,
      tmpid: user._id,
      tmpname: "",
      tmpemail: "",
      tmpphone: "",
      tmppassword: "",
      tmpnewPassword: "",
      tmpstoreName: "",
      tmpaddress: "",
      tmplicenceNumber: "",
    };
    userName === ""
      ? (tmpUser.tmpname = user.name)
      : (tmpUser.tmpname = userName);
    email === "" ? (tmpUser.tmpemail = user.email) : (tmpUser.tmpemail = email);
    phone === "" ? (tmpUser.tmpphone = user.phone) : (tmpUser.tmpphone = phone);
    storeName === ""
      ? (tmpUser.tmpstoreName = user.storeName)
      : (tmpUser.tmpstoreName = storeName);
    address === ""
      ? (tmpUser.tmpaddress = user.address)
      : (tmpUser.tmpaddress = address);
    licenceNumber === ""
      ? (tmpUser.tmplicenceNumber = user.licenceNumber)
      : (tmpUser.tmplicenceNumber = licenceNumber);
    tmpUser.tmppassword = password;
    tmpUser.tmpnewPassword = newPassword;
    props.updateUserRequest(tmpUser);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      {loadedUser ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                {user.userLanguage === "english" ? (
                  <Fragment>
                    <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                    <p className={classes.cardCategoryWhite}>
                      Update your profile
                    </p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h4
                      className={classes.cardTitleWhite}
                      style={{
                        textAlign: "right",
                      }}
                    >
                      פרופיל
                    </h4>
                    <p
                      className={classes.cardCategoryWhite}
                      style={{
                        textAlign: "right",
                      }}
                    >
                      ערוך את הפרופיל שלך
                    </p>
                  </Fragment>
                )}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <input
                      hidden
                      type="password"
                      name="fake-password"
                      autoComplete="new-password"
                      tabIndex="-1"
                      style={{
                        opacity: 0,
                        float: "left",
                        border: "none",
                        height: "0",
                        width: "0",
                      }}
                    />
                    <TextField
                      autoFocus
                      name="name"
                      autoComplete="nope"
                      type="text"
                      label={user.userLanguage === "english" ? "name" : "שם"}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      name="email"
                      autoComplete="nope"
                      type="text"
                      label={
                        user.userLanguage === "english" ? "email" : "אימייל"
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      name="phone"
                      autoComplete="nope"
                      type="text"
                      label={
                        user.userLanguage === "english" ? "phone" : "טלפון"
                      }
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      name="address"
                      autoComplete="nope"
                      type="text"
                      label={
                        user.userLanguage === "english" ? "address" : "כתובת"
                      }
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      name="storeName"
                      autoComplete="nope"
                      type="text"
                      label={
                        user.userLanguage === "english"
                          ? "store name"
                          : "שם חנות"
                      }
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      name="licenceNumber"
                      autoComplete="nope"
                      type="text"
                      label={
                        user.userLanguage === "english"
                          ? "licence number"
                          : "מספר רשיון"
                      }
                      value={licenceNumber}
                      onChange={(e) => setLicenceNumber(e.target.value)}
                      fullWidth
                    />
                  </GridItem>
                </GridContainer>
                <br />
                {changePassword && (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        name="password"
                        autoComplete="new-password"
                        type="password"
                        label={
                          user.userLanguage === "english"
                            ? "password"
                            : "סיסמא נוכחית"
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        name="password"
                        autoComplete="new-password"
                        type="password"
                        label={
                          user.userLanguage === "english"
                            ? "new password"
                            : "סיסמא חדשה"
                        }
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                )}
              </CardBody>
              <CardFooter>
                <Button
                  onClick={() => setChangePassword(!changePassword)}
                  color="primary"
                >
                  {user.userLanguage === "english"
                    ? "Change Password"
                    : "שנה סיסמא"}
                </Button>
                <Button onClick={submit} color="primary">
                  {user.userLanguage === "english"
                    ? "Update Profile"
                    : "עדכן פרופיל"}
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              {loadedUser !== false ? (
                <Fragment>
                  <CardAvatar profile>
                    <img src={profile} alt="..." />
                  </CardAvatar>
                  <CardBody profile>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english" ? "OWNER" : "מנהל"}
                    </h6>
                    <h5 className={classes.cardTitle}>{user.name}</h5>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english" ? "email" : "אימייל"}
                    </h6>
                    <h5 className={classes.cardTitle}>{user.email}</h5>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english" ? "phone" : "טלפון"}
                    </h6>
                    <h5 className={classes.cardTitle}>{user.phone}</h5>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english" ? "address" : "כתובת"}
                    </h6>
                    <h5 className={classes.cardTitle}>{user.address}</h5>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "store name"
                        : "שם חנות"}
                    </h6>
                    <h5 className={classes.cardTitle}>{user.storeName}</h5>
                    <h6 className={classes.cardCategory}>
                      {user.userLanguage === "english"
                        ? "licence number"
                        : "מספר רשיון"}
                    </h6>
                    <h5 className={classes.cardTitle}>{user.licenceNumber}</h5>
                  </CardBody>
                </Fragment>
              ) : (
                <Fragment>
                  <CardAvatar profile>
                    <img src={profile} alt="..." />
                  </CardAvatar>
                  <CardBody profile>
                    <h6 className={classes.cardCategory}>loading...</h6>
                  </CardBody>
                </Fragment>
              )}
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
  updateUserRequest: (user) => dispatch(updateUserRequest(user)),
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
  userLoadRequest: () => dispatch(userLoadRequest()),
  resetLoadUser: () => dispatch(resetLoadUser()),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    user: state.userReducer.user,
    autoDisconnect: state.userReducer.autoDisconnect,
    updateSuccess: state.updateUserReducer.updateSuccess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
