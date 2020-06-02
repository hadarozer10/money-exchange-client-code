/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import styles from "../Styles/sideBarStyles";
import NavbarLinks from "./NavbarLinks.js";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { language, color, logo, image, routes, open, sidebarOpen } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true,
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path),
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path),
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            {language === "english" ? (
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: false,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: false,
                    })}
                  />
                )}

                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: false,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            ) : props.user.userLanguage === "hebrew" ? (
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: false,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: false,
                    })}
                  />
                )}

                <ListItemText
                  primary={prop.hebrew}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: false,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            ) : (
              <ListItem />
            )}
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: false,
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
      </a>
      <Hidden smDown implementation="css">
        <div className={classes.toolbar}>
          <IconButton
            className={classes.closeButton}
            onClick={props.handleHideSidebar}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Hidden>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <div
          style={{
            textAlign: "end",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Hidden>

      <Hidden mdUp implementation="css">
        <Drawer //small screen
          variant="temporary"
          anchor={language === "english" ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: false,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
            <NavbarLinks />
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer //large screen
          anchor={language === "english" ? "left" : "right"}
          variant="permanent"
          open
          className={classNames(classes.drawerPaper, {
            [classes.drawerPaper]: props.sidebarOpen,
            [classes.sideBarShift]: !props.sidebarOpen,
          })}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaper]: props.sidebarOpen,
              [classes.sideBarShift]: !props.sidebarOpen,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
            <NavbarLinks />
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
