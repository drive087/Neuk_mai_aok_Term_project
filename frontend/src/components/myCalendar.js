import React, { useState, Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
const i = 0;

const getRandomColor = (i) => {
  if (i < 0) {
    return "#E0E0E0";
  } else {
    var colors = [
      "#FF9999",
      "#FFCC99",
      "#FFFF99",
      "#CCFF99",
      "#99FF99",
      "#99FFCC",
      "#99FFFF",
      "#99CCFF",
      "#9999FF",
      "#CC99FF",
      "#FF99FF",
      "#FF99CC",
    ];
    return colors[i % 12];
  }
};

const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = event.hexColor;
  var style = {
    backgroundColor: backgroundColor,
    borderRadius: "0px",
    opacity: 0.8,
    color: "black",
    border: "0px",
    display: "block",
    justifyContent: "center",
  };
  return {
    style: style,
  };
};

const localizer = momentLocalizer(moment);



const MyCalendar = () => {
  
  return (
    <div>
      <Calendar
        views={["month", "week"]}
        localizer={localizer}
        events={events}
        step={60}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 ,width : 900}}
      />
    </div>
  );
};

export default MyCalendar;
