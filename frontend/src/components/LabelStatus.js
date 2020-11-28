import React from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    // fontFamily: theme.typography.fontFamily,
    alignItems: "center",
    borderRadius: 2,
    display: "inline-flex",
    flexGrow: 0,
    whiteSpace: "nowrap",
    cursor: "default",
    flexShrink: 0,
    fontSize: 15,
    fontWeight: 800,
    height: 20,
    justifyContent: "center",
    letterSpacing: 0.5,
    minWidth: 20,
    padding: 5,
    textTransform: "uppercase",
  },
  Ready: {
    color: "#00a86b",
    backgroundColor: fade("#00a86b", 0.2),
  },
  Inprogress: {
    color: "#f2ae42",
    backgroundColor: fade("#f2ae42", 0.2),
  },
  Pending: {
    color: "#666666",
    backgroundColor: fade("#666666", 0.2),
  },
  Cancel: {
    color: "#dd3439",
    backgroundColor: fade("#dd3439", 0.2),
  },
  Done: {
    color: "#00a86b",
    backgroundColor: fade("#00a86b", 0.2),
  },
  Approve: {
    color: "#128bff",
    backgroundColor: fade("#128bff", 0.2),
  },
}));

const LabelStatus = ({
  className = "",
  color = "",
  status,
  style,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <span
      className={clsx(
        classes.root,
        {
          [classes[color]]: color,
        },
        className
      )}
      {...rest}
    >
      {status}
    </span>
  );
};

export default withRouter(LabelStatus);
