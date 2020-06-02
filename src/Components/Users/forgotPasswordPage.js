import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { forgotPasswordRequest } from "../../Redux/Actions/UserActions/forgotPasswordActions";
import { TextField, Button, Paper, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import logo from "../../assets/img/WhiteTransparentlogo.png";

const styles = (theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundImage:
      "url(https://image.freepik.com/free-vector/stock-market-virtual-hologram-statistics-graph-chart-dark-blue-background_41814-360.jpg)",
    display: "inline-table",
    height: "-webkit-fill-available",
    width: "-webkit-fill-available",
  },
  loginSection: {
    marginTop: theme.spacing(8),
    background: "!important transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    color: "antiquewhite",
    marginLeft: theme.spacing(3),
  },
  form: {
    background: "!important transparent",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  TypographyOne: {
    padding: "20px",
    bottom: "20px",
    display: "inline",
    color: "antiquewhite",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  TypographyTwo: {
    color: "antiquewhite",
  },
  submit: {
    margin: theme.spacing(3, 3, 2),
  },
  logoSection: {
    marginTop: theme.spacing(8),
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    height: "140px",
    width: "500px",
  },
  textField: {
    color: "antiquewhite",
    background: "transparent !important",
    "&$textField": {
      color: "antiquewhite",
      borderColor: `antiquewhite !important`,
      background: "transparent !important",
    },
    borderColor: "antiquewhite",
  },
});

class ForgotPasswordPage extends Component {
  state = {
    data: {
      email: "",
    },
  };

  handleChange = ({ target: input }) => {
    this.setState({
      data: {
        ...this.state.data,
        [input.name]: input.value,
      },
    });
  };

  submit(e) {
    // e.preventDefault();
    const { data } = this.state;
    this.props.forgotPasswordRequest(data.email);
    this.props.history.push("/loginPage");
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

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper
          variant="outlined"
          square={true}
          classes={{ root: classes.root }}
        >
          <div className={classes.logoSection}>
            <img src={logo} alt="logo" className={classes.logo} />
          </div>
          <Container background="!important transparent" maxWidth="xs">
            <div className={classes.loginSection}>
              <CssBaseline />

              <Typography
                component="h1"
                variant="h5"
                classes={{ root: classes.TypographyTwo }}
              >
                please enter your email
              </Typography>

              <form
                noValidate
                className={classes.form}
                onSubmit={this.submit.bind(this)}
              >
                <TextField
                  InputLabelProps={{
                    className: classes.textField,
                    classes: {
                      root: classes.textField,
                      focused: classes.textField,
                    },
                  }}
                  InputProps={{
                    className: classes.textField,
                    classes: {
                      root: classes.textField,
                      focused: classes.textField,
                      notchedOutline: classes.textField,
                    },
                  }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.data.email}
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    this.props.history.push("/loginPage");
                  }}
                >
                  cancel
                </Button>
              </form>
            </div>
          </Container>
        </Paper>
      </Fragment>
    );
  }
}

ForgotPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email)),
});

const mapStateToProps = (state) => {
  return {
    LoggedIn: state.userReducer.LoggedIn,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ForgotPasswordPage));
