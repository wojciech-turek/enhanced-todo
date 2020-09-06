import React from "react";
import { connect } from "react-redux";
import { Button, Fade } from "@material-ui/core";

export const toDoPage = () => {
  return (
    <div>
      <Fade in={true} timeout={400}>
        <Button>Wyloguj</Button>
      </Fade>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(toDoPage);
