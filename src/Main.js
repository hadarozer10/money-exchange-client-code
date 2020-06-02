import React, { useLayoutEffect, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import classNames from "classnames";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
// core components
import Sidebar from "./Components/Layouts/Sidebar.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";

import styles from "./Components/Styles/mainStyles.js";

import bgImage from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/WhiteTransparentlogo.png";
import { connect } from "react-redux";
import {
  autoLogoutRequest,
  checkIfAdmin,
} from "./Redux/Actions/UserActions/userActions";

let ps;

const switchAdminRoutes = (
  <Switch>
    {adminRoutes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
    <Redirect from="/main" to="/main/currencies" />
  </Switch>
);

const switchRoutes = (
  <Switch>
    {userRoutes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
    <Redirect from="/main" to="/main/currencies" />
  </Switch>
);

const useStyles = makeStyles(styles);

function Main(props) {
  useLayoutEffect(() => {
    if (props.autoDisconnect) {
      props.autoLogoutRequest(props.lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.autoDisconnect]);

  useLayoutEffect(() => {
    if (
      document.cookie.match("connect.sid") &&
      document.cookie.match("connect.sid").input === props.session
    ) {
      props.checkIfAdmin();
    } else {
      props.autoLogoutRequest(props.lex);
      props.history.push("/loginPage");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  const mainPanel = React.createRef();

  const [image] = React.useState(bgImage);
  const [color] = React.useState("purple");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const handleHideSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={classes.wrapper}>
      {props.initLoadUser && (
        <Sidebar
          language={
            props.user.userLanguage === "english"
              ? "english"
              : props.user.userLanguage === "hebrew"
              ? "hebrew"
              : ""
          }
          routes={props.user.isAdmin ? adminRoutes : userRoutes}
          logo={logo}
          image={image}
          sidebarOpen={sidebarOpen}
          handleHideSidebar={handleHideSidebar}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...props}
        />
      )}
      <Hidden smDown implementation="css">
        <div
          classes={{
            div: classNames(classes.bar, {
              [classes.sideBarShift]: props.sidebarOpen,
            }),
          }}
        >
          <IconButton
            className={classes.closeButton}
            onClick={handleHideSidebar}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </Hidden>
      <div
        className={classNames(classes.mainPanel, {
          [classes.mainPanelShift]: !sidebarOpen,
        })}
        ref={mainPanel}
      >
        {props.initLoadUser && (
          <Fragment>
            <div className={classes.content}>
              {props.user.isAdmin ? (
                <div className={classes.container}>{switchAdminRoutes}</div>
              ) : (
                <div className={classes.container}>{switchRoutes}</div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  checkIfAdmin: () => dispatch(checkIfAdmin()),
  autoLogoutRequest: (email) => dispatch(autoLogoutRequest(email)),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    autoDisconnect: state.userReducer.autoDisconnect,
    initLoadUser: state.userReducer.initLoadUser,
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
