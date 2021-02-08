import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "./dateFilter.css";

//setting datepicker to spanish
registerLocale("es", es);

export default (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <label>{props.label}</label>
      <DatePicker
        className="dateFilter"
        locale="es"
        dateFormat="dd/MM/yyyy"
        selected={props.date}
        onChange={(date) => props.onChange(date)}
      />
    </div>
  );
};
