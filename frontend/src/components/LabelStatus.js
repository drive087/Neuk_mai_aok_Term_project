import React from "react";
import PropTypes from "prop-types";
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
  ready: {
    color: "#00a86b",
    backgroundColor: fade("#00a86b", 0.2),
  },
  inprogess: {
    color: "#f2ae42",
    backgroundColor: fade("#f2ae42", 0.2),
  },
  // error: {
  //   color: theme.palette.error.main,
  //   backgroundColor: fade(theme.palette.error.main, 0.08)
  // },
  // success: {
  //   color: theme.palette.success.main,
  //   backgroundColor: fade(theme.palette.success.main, 0.08)
  // },
  // warning: {
  //   color: theme.palette.warning.main,
  //   backgroundColor: fade(theme.palette.warning.main, 0.08)
  // },
  // notsave: {
  //   color : Colors.UNNAMED_COLOR_000000,
  //   backgroundColor: fade(Colors.PIE_COLOR_2,0.3)
  // },
  // outlined: {
  //   border: `1px solid ${Colors.SEARCH_BOX}`,
  //   backgroundColor: Colors.BUTTON_INACTIVE
  // }
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
