import React from "react";
import { formatTime, formatDate } from "../../helpers/dateFunc";

export default ({ data, date }) => {
  return (
    <div className="debuggerScreen">
      <p className="debuggerTitle">Fecha: {formatDate(date)}</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          minWidth: "100%",
        }}
      >
        {data.length > 0 ? (
          data.map((project, ind) => (
            <ul key={ind}>
              <li>{project.project}:</li>
              {project.subprojects.map((subproject, ind2) => (
                <ul key={ind2}>
                  <li>{subproject.name}:</li>
                  <ul>
                    <li>hora: {formatTime(new Date(subproject.date))}</li>
                    <li>
                      estatus:{" "}
                      {subproject.status === 0 ? "Negativo" : "Positivo"}
                    </li>
                  </ul>
                </ul>
              ))}
            </ul>
          ))
        ) : (
          <p
            style={{
              width: "100%",
              display: "flex",
              textAlign: "center",
              padding: 10,
            }}
          >
            No se encontraron proyectos para esta fecha
          </p>
        )}
      </div>
    </div>
  );
};
