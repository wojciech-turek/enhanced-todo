import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Logout = (props: { onLogout: Function }) => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);
  return (
    <>
      <Redirect to="/login" />
      Hello
    </>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
