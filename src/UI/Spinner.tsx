import React from "react";
import { LinearProgress } from "@material-ui/core";

function Spinner() {
  return (
    <div className="spinner-bg">
      <LinearProgress />
    </div>
  );
}

export default Spinner;
