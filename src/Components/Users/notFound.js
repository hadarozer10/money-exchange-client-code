import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  container: {
    marginLeft: "500px",
    marginTop: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
});

class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <div
          style={{
            fontSize: "30px",
            marginLeft: "50px",
            marginTop: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          404 not found
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(NotFound);
