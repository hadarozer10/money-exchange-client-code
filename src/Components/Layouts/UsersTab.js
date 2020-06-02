import React, { useEffect, useLayoutEffect, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  userLoadRequest,
} from "../../Redux/Actions/UserActions/userActions";
import { getUsersRequest } from "../../Redux/Actions/AdminActions/getUsersActions";
// @material-ui/core
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
// core components
import Table from "../Core/Table.js";
//styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dropdownStyle from "../Styles/dropdownStyle.js";
import userStyles from "../Styles/userPageStyle.js";
import Lottie from "react-lottie";
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

function UsersTab(props) {
  const {
    lex,
    users,
    session,
    loadedUser,
    loadedUsers,
    autoDisconnect,
    updateSuccess,
    deleteUserSuccess,
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
      props.getUsersRequest();
      props.userLoadRequest();
    } else {
      props.autoLogoutRequest(lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess, deleteUserSuccess]);

  return (
    <Fragment>
      <ToastContainer />
      {loadedUsers && loadedUser ? (
        <Table
          tableHeaderColor="primary"
          tableHead={[
            <h6 className={classes.cardCategory} color="primary">
              #
            </h6>,
            <h6 className={classes.cardCategory} color="primary">
              name
            </h6>,
            <h6 className={classes.cardCategory} color="primary">
              email
            </h6>,
            <h6 className={classes.cardCategory} color="primary">
              phone
            </h6>,
            <h6 className={classes.cardCategory} color="primary">
              logged in
            </h6>,
            <h6 className={classes.cardCategory} color="primary">
              id
            </h6>,
          ]}
          tableData={users.map((user) => [
            <h5 className={classes.cardTitle} color="primary">
              #
            </h5>,
            <h5 className={classes.cardTitle} color="primary">
              {`${user.name}`}
            </h5>,
            <h5 className={classes.cardTitle} color="primary">
              {`${user.email}`}
            </h5>,
            <h5 className={classes.cardTitle} color="primary">
              {`${user.phone}`}
            </h5>,
            <h5 className={classes.cardTitle} color="primary">
              {`${user.isLoggedIn}`}
            </h5>,
            <h5 className={classes.cardTitle} color="primary">
              {`${user._id}`}
            </h5>,
            <Tooltip
              id="tooltip-top"
              title="User Details"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
                onClick={() => props.handleGetUserDetails(user)}
              >
                <Edit
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                />
              </IconButton>
            </Tooltip>,
          ])}
        >
          <Fragment></Fragment>
        </Table>
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
  getUsersRequest: () => dispatch(getUsersRequest()),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadedUser: state.userReducer.loadedUser,
    autoDisconnect: state.userReducer.autoDisconnect,
    users: state.getUsersReducer.users,
    deleteUserSuccess: state.deleteUserReducer.deleteUserSuccess,
    updateSuccess: state.updateUserReducer.updateSuccess,
    loadedUsers: state.getUsersReducer.loadedUsers,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UsersTab));
