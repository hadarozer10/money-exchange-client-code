import React, { useEffect, useState } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import CheckIcon from "@material-ui/icons/Check";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// @material-ui/icons
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
// core components
import Button from "../Core/Button.js";
import styles from "../Styles/headerLinksStyle.js";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { connect } from "react-redux";
import {
  userLoadRequest,
  logoutRequest,
  setUserLanguage,
  resetLanguageProps,
} from "../../Redux/Actions/UserActions/userActions";

const useStyles = makeStyles(styles);

function NavbarLinks(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(props.user.userLanguage);

  useEffect(() => {
    if (props.changeLanguageSuccess) {
      props.userLoadRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.changeLanguageSuccess]);

  const handleClick = () => {
    setLanguage(props.user.userLanguage);
    setOpen(!open);
  };

  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleLogout = () => {
    props.logoutRequest();
    // props.history.push("/loginPage");
    window.location = "/loginPage";
    return;
  };

  const handleEnglishLanguage = () => {
    props.setUserLanguage("english");
    setLanguage("english");
    return;
  };

  const handleHebrewLanguage = () => {
    props.setUserLanguage("hebrew");
    setLanguage("hebrew");
    return;
  };

  return (
    <div>
      <div className={classes.searchWrapper}>
        <div className={classes.manager}>
          <Button
            color={"white"}
            simple={true}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes.buttonLink}
            style={{
              marginLeft: "0px",
              marginRight: "25px",
              fontSize: "15px",
              textTransform: "none",
            }}
          >
            <SettingsOutlinedIcon
              className={classes.icons}
              style={{
                height: "1em",
                width: "1em",
              }}
            />
            {props.user.userLanguage === "english" ? "Settings" : "הגדרות"}
          </Button>
          <Poppers
            open={Boolean(openProfile)}
            anchorEl={openProfile}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: false }) +
              " " +
              classes.newpopperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseProfile}>
                    <List role="menu">
                      <ListItem
                        style={{
                          cursor: "pointer",
                        }}
                        className={classes.dropdownItem}
                        onClick={handleClick}
                      >
                        {props.user.userLanguage === "english"
                          ? "Language"
                          : "שפה"}{" "}
                        {open ? (
                          <ExpandLess className={classes.nested} />
                        ) : (
                          <ExpandMore className={classes.nested} />
                        )}
                      </ListItem>
                      <Collapse
                        in={open}
                        className={classes.icons}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <ListItem
                            className={classes.dropdownItem}
                            onClick={handleEnglishLanguage}
                            style={{
                              cursor: "pointer",
                              margin: "0",
                              lineHeight: "30px",
                            }}
                          >
                            <ListItemIcon>
                              {language === "english" ? (
                                <CheckIcon
                                  style={{
                                    fill: "darkturquoise",
                                    height: "0.8em",
                                  }}
                                />
                              ) : (
                                <CheckIcon
                                  style={{
                                    fill: "transparent",
                                    height: "0.8em",
                                  }}
                                />
                              )}
                            </ListItemIcon>
                            {props.user.userLanguage === "english"
                              ? "english"
                              : "אנגלית"}
                          </ListItem>
                          <ListItem
                            className={classes.dropdownItem}
                            onClick={handleHebrewLanguage}
                            style={{
                              cursor: "pointer",
                              margin: "0",
                              lineHeight: "30px",
                            }}
                          >
                            <ListItemIcon>
                              {language === "hebrew" ? (
                                <CheckIcon
                                  style={{
                                    fill: "darkturquoise",
                                    height: "0.8em",
                                  }}
                                />
                              ) : (
                                <CheckIcon
                                  style={{
                                    fill: "transparent",
                                    height: "0.8em",
                                  }}
                                />
                              )}
                            </ListItemIcon>
                            {props.user.userLanguage === "english"
                              ? "hebrew"
                              : "עברית"}
                          </ListItem>
                        </List>
                      </Collapse>
                      <Divider light />
                      <ListItem
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={handleLogout}
                        className={classes.dropdownItem}
                      >
                        {props.user.userLanguage === "english"
                          ? "Logout"
                          : "התנתק"}
                      </ListItem>
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    loadedUser: state.userReducer.loadedUser,
    changeLanguageSuccess: state.userReducer.changeLanguageSuccess,
    initLoadUser: state.userReducer.initLoadUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: () => dispatch(logoutRequest()),
  userLoadRequest: () => dispatch(userLoadRequest()),
  resetLanguageProps: () => dispatch(resetLanguageProps()),
  setUserLanguage: (language) => dispatch(setUserLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarLinks);
