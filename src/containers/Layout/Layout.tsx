import React from "react";
import AuthPage from "../../pages/AuthPage/AuthPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import { StateProps } from "../../interfaces/interfaces";
import ToDoPage from "../../pages/toDoPage/toDoPage";

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
      <Route path="/todoapp">
        <ToDoPage />
      </Route>
    </Switch>
  );

  return <>{routes}</>;
}

const mapStateToProps = (state: StateProps) => {
  return {
    auth: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Layout);
