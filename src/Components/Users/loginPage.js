import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { userLoginRequest } from "../../Redux/Actions/UserActions/userActions";
import { TextField, Button, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sideBarStyle from "../Styles/dropdownStyle.js";

import CssBaseline from "@material-ui/core/CssBaseline";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import bitcoin from "../../assets/img/bitcoin.jpg";
import logo from "../../assets/img/colorTransparentLogo.png";
import { blackColor } from "../Styles/material.js";

const styles = (theme) => ({
  ...sideBarStyle(theme),
  background: {
    backgroundImage:
      "url(https://image.freepik.com/free-vector/stock-market-virtual-hologram-statistics-graph-chart-dark-blue-background_41814-360.jpg)",
    position: "absolute",
    zIndex: "0",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: blackColor,
      opacity: ".8",
    },
  },
  loginSection: {
    marginTop: theme.spacing(8),
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    zIndex: "1",
    color: "antiquewhite",
    // marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  form: {
    // background: "!important transparent",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  TypographyOne: {
    zIndex: "1",
    padding: "20px",
    bottom: "20px",
    display: "inline",
    color: "black",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  TypographyTwo: {
    color: "white",
  },
  submit: {
    color: "black",
    backgroundColor: "#ffe4c4c7",
    margin: theme.spacing(3, 0, 2),
  },
  forgot: {
    color: "#ffe4c4c7",
    position: "relative",
  },
  textField: {
    color: "#ffe4c4c7",
    background: "transparent !important",
    "&$textField": {
      color: "#ffe4c4c7",
      borderColor: `#ffe4c4c7 !important`,
      background: "transparent !important",
    },
    borderColor: "#ffe4c4c7",
  },
  logo: {
    height: "140px",
    width: "500px",
  },
});

class LoginPage extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
  };

  componentDidMount() {
    if (this.props.LoggedIn) {
      this.props.history.push("/main");
    }
  }

  componentDidUpdate() {
    if (this.props.LoggedIn) {
      this.props.history.push("/main");
    }
  }

  handleChange = ({ target: input }) => {
    this.setState({
      data: {
        ...this.state.data,
        [input.name]: input.value,
      },
    });
  };

  handleForgotPassword = () => {
    this.props.history.push("/forgotPasswordPage");
  };

  submit(e) {
    e.preventDefault();
    const { data } = this.state;
    this.props.userLoginRequest(data);
  }

  copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  fakeInputStyle = {
    opacity: 0,
    float: "left",
    border: "none",
    height: "0",
    width: "0",
  };
  render() {
    const { classes, loadLogin } = this.props;
    return (
      <Fragment>
        {loadLogin && (
          <Fragment>
            <ToastContainer />
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + bitcoin + ")" }}
            />
            <div className={classes.loginSection}>
              <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <Container background="!important transparent" maxWidth="xs">
              <div className={classes.loginSection}>
                <CssBaseline />
                <form
                  autoComplete="new-password"
                  noValidate
                  className={classes.form}
                  onSubmit={this.submit.bind(this)}
                >
                  <input
                    hidden
                    type="password"
                    name="fake-password"
                    autoComplete="new-password"
                    tabIndex="-1"
                    style={this.fakeInputSyle}
                  />
                  <TextField
                    className={classes.textField}
                    InputLabelProps={{
                      className: classes.textField,
                      classes: {
                        root: classes.textField,
                        focused: classes.textField,
                      },
                    }}
                    InputProps={{
                      autoComplete: "nope",
                      className: classes.textField,
                      classes: {
                        root: classes.textField,
                        focused: classes.textField,
                        notchedOutline: classes.textField,
                      },
                    }}
                    name="email"
                    autoComplete="nope"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={this.state.data.email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    className={classes.textField}
                    InputLabelProps={{
                      className: classes.textField,
                      classes: {
                        root: classes.textField,
                        focused: classes.textField,
                      },
                    }}
                    InputProps={{
                      autoComplete: "new-password",
                      className: classes.textField,
                      classes: {
                        root: classes.textField,
                        focused: classes.textField,
                        notchedOutline: classes.textField,
                      },
                    }}
                    name="password"
                    autoComplete="new-password"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.data.password}
                    onChange={this.handleChange}
                  />
                  <Button
                    type="submit"
                    fontFamily="serif"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        classes={{ root: classes.forgot }}
                        href="#"
                        variant="body2"
                        onClick={this.handleForgotPassword}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLoginRequest: (user) => dispatch(userLoginRequest(user)),
});

const mapStateToProps = (state) => {
  return {
    loadLogin: state.userReducer.loadLogin,
    LoggedIn: state.userReducer.LoggedIn,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage));
