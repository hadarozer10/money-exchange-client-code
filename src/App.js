import React, { Component, Fragment } from "react";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import LoginPage from "./Components/Users/loginPage";
import NotFound from "./Components/Users/notFound";
import ForgotPasswordPage from "./Components/Users/forgotPasswordPage";
import { connect } from "react-redux";
import { checkLoggedIn } from "./Redux/Actions/UserActions/userActions";
import Main from "./Main.js";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.checkLoggedIn();
  }

  handleLoggedIn() {
    if (this.props.LoggedIn) {
      return <Redirect to="/main" />;
    } else {
      return <Redirect to="/loginPage" />;
    }
  }

  render() {
    return (
      <Fragment>
        <Router history={hist}>
          <Switch>
            <Route path="/main" component={Main} />
            <Route path="/loginPage" component={LoginPage} />
            <Route path="/forgotPasswordPage" component={ForgotPasswordPage} />
            <Route exact path="/" render={() => this.handleLoggedIn()} />
            <Route
              path="*"
              component={NotFound}
              render={() => <Redirect to="/notFound" />}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkLoggedIn: () => dispatch(checkLoggedIn()),
});

const mapStateToProps = (state) => {
  return {
    session: state.userReducer.session,
    lex: state.userReducer.lex,
    loadLogin: state.userReducer.loadLogin,
    LoggedIn: state.userReducer.LoggedIn,
    autoDisconnect: state.userReducer.autoDisconnect,
    LoggedInRequest: state.userReducer.LoggedInRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
