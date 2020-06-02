import React, { useEffect, useLayoutEffect, useState, Fragment } from "react";
//redux
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  resetLoadUser,
} from "../../Redux/Actions/UserActions/userActions";
import { forceLogoutRequest } from "../../Redux/Actions/AdminActions/forceLogoutActions";
// @material-ui/core
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// core components
import GridItem from "../Core/GridItem.js";
import GridContainer from "../Core/GridContainer.js";
import CustomTabs from "../Core/CustomTabs.js";
import UsersTab from "../Layouts/UsersTab.js";
import AddUserTab from "../Layouts/AddUserTab.js";
import UpdateUserTab from "../Layouts/UpdateUserTab.js";
//styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminManagement(props) {
  const { session, lex, autoDisconnect } = props;

  const [updateUser, setUpdateUser] = useState(false);
  const [selectedUser, setUser] = useState({});

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

  const handleGetUserDetails = (sUser) => {
    setUser({ ...sUser });
    setUpdateUser(!updateUser);
    return;
  };

  const handleForceLogout = (userId) => {
    props.forceLogoutRequest(userId);
    setUpdateUser(!updateUser);
    return;
  };

  return (
    <Fragment>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary"
            tabs={
              updateUser
                ? [
                    {
                      tabName: "update user ",
                      tabIcon: EqualizerIcon,
                      tabContent: (
                        <UpdateUserTab
                          selectedUser={selectedUser}
                          handleGetUserDetails={handleGetUserDetails}
                          handleForceLogout={handleForceLogout}
                          {...props}
                        />
                      ),
                    },
                  ]
                : [
                    {
                      tabName: "users table",
                      tabIcon: EqualizerIcon,
                      tabContent: (
                        <UsersTab
                          handleGetUserDetails={handleGetUserDetails}
                          {...props}
                        />
                      ),
                    },
                    {
                      tabName: "add new user",
                      tabIcon: AddCircleOutlineIcon,
                      tabContent: <AddUserTab {...props} />,
                    },
                  ]
            }
          />
        </GridItem>
      </GridContainer>
    </Fragment>
  );
}
const mapDispatchToProps = (dispatch) => ({
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
  resetLoadUser: () => dispatch(resetLoadUser()),
  forceLogoutRequest: (id) => dispatch(forceLogoutRequest(id)),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    autoDisconnect: state.userReducer.autoDisconnect,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagement);
