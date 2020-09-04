import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

export const toDoPage = () => {
  return (
    <div>
      Witaj na stronie todo app!<Button>Wyloguj</Button>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(toDoPage);
