import React from "react";
import { getDaysArray, formatDate, sameDay } from "../../helpers/dateFunc";
import DebuggerCalendar from "./debuggerCalendar";
import "./projectCalendar.css";

export default (props) => {
  const [state, setState] = React.useState({
    dateSelected: props.dates.initial,
    dataToDisplay: [],
    dataByDate: [],
  });

  //handle edgecase with date selection
  //also make an object for every day
  React.useEffect(() => {
    if (state.dateSelected.getTime() < props.dates.initial.getTime())
      setState((prev) => ({ ...prev, dateSelected: props.dates.initial }));
    else if (state.dateSelected.getTime() > props.dates.final.getTime())
      setState((prev) => ({ ...prev, dateSelected: props.dates.final }));
    const datesArr = getDaysArray(props.dates.initial, props.dates.final);
    const dataByDate = datesArr.map((day) => {
      let count = 0;
      let data = [];
      let estatus = 0;
      props.data.forEach((doc) => {
        if (sameDay(new Date(doc.timestamp), day)) {
          count++;
          data.push(doc);
          doc.estatus && estatus++;
        }
      });
      return { day, count, data, estatus };
    });
    setState((prev) => ({ ...prev, dataByDate }));
  }, [props, state.dateSelected]);

  //get the object of the day selected
  React.useEffect(() => {
    const dataOfSelectedDay =
      state.dataByDate.find((doc) => sameDay(doc.day, state.dateSelected))
        ?.data || [];
    const projects =
      [...new Set(dataOfSelectedDay.map((doc) => doc.proyecto))] || [];
    const dataToDisplay = projects.map((project) => {
      let subprojects = [];
      dataOfSelectedDay.forEach((doc) => {
        doc.proyecto === project &&
          subprojects.push({
            name: doc.subproyecto,
            date: doc.timestamp,
            status: doc.estatus,
          });
      });
      return { project, subprojects };
    });
    setState((prev) => ({ ...prev, dataToDisplay }));
  }, [state.dateSelected, props.data, state.dataByDate]);

  return (
    <div className="container">
      <p style={{ width: "100%", textAlign: "center", fontSize: 25 }}>
        Aproach 2
      </p>
      <DebuggerCalendar data={state.dataToDisplay} date={state.dateSelected} />
      <div className="calendarContainer">
        {state.dataByDate.map((doc, ind) => (
          <div
            onClick={() =>
              setState((prev) => ({ ...prev, dateSelected: new Date(doc.day) }))
            }
            key={ind}
            className="calendarButton"
            style={{
              backgroundColor: bgc(doc, state.dateSelected),
              borderColor: sameDay(doc.day, state.dateSelected)
                ? "rgba(0,0,0,0.3)"
                : "rgba(0,0,0,0)",
            }}
          >
            <p>{formatDate(doc.day)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const bgc = (doc, selected) => {
  const opacity = sameDay(doc.day, selected) ? 1 : 0.3;
  if (doc.count > 1) return `rgba(255,255,0,${opacity})`;
  if (doc.estatus === 1) return `rgba(0,255,0,${opacity})`;
  if (doc.estatus === 0 && doc.count > 0) return `rgba(255,0,0,${opacity})`;
  return `rgba(250,250,250,${opacity})`;
};
