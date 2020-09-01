import React from "react";
import AuthPage from "../../pages/AuthPage/AuthPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import { StateProps } from "../../interfaces/interfaces";

function Layout(props: { auth: boolean }) {
  let routes = (
    <Switch>
      <Route exact path="/">
        {!props.auth ? <Redirect to="/login" /> : null}
      </Route>
      <Route path="/login">
        <AuthPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
    </Switch>
  );

  return <>{routes}</>;
}

const mapStateToProps = (state: StateProps) => {
  return {
    auth: state.authenticated,
  };
};

export default connect(mapStateToProps)(Layout);
