import React from "react";
import { getDaysArray, sameDay, formatDate } from "../../helpers/dateFunc";
import "./airflowDashboard.css";

export default ({ data, dates }) => {
  const [state, setState] = React.useState({
    dateArr: [],
    data: [],
  });

  //ordering data to map through and display
  React.useEffect(() => {
    const projects = [...new Set(data.map((doc) => doc.proyecto))];
    const dateArr = getDaysArray(dates.initial, dates.final);
    const newData = projects.map((project) => {
      let subprojects = [];
      data.forEach((doc) => {
        if (doc.proyecto === project) subprojects.push(doc.subproyecto);
      });
      subprojects = [...new Set(subprojects)];
      const dta = subprojects.map((sp) => {
        const defData = dateArr.map((day) => {
          let count = 0;
          let status = 0;
          let temp = [];
          data.forEach((doc) => {
            if (
              sameDay(new Date(doc.timestamp), day) &&
              doc.subproyecto === sp
            ) {
              count++;
              temp.push(doc);
              if (doc.estatus === 1) {
                status++;
              }
            }
          });
          return { day, count, data: temp, status };
        });
        return { subproject: sp, data: defData };
      });
      return { project, subprojects: dta };
    });
    setState({ dateArr, data: newData });
  }, [data, dates]);

  return (
    <div
      style={{
        boxShadow: "2px 2px 2px 4px rgba(0, 0, 0, 0.1)",
        overflowX: "scroll",
        paddingLeft: 30,
        paddingRight: 30,
        margin: 20,
        borderRadius: 20,
      }}
    >
      <p style={{ textAlign: "center", fontSize: 25 }}>Aproach 1</p>
      <div style={{ display: "inline-flex", marginBottom: -10 }}>
        <p style={{ width: 100 }}> </p>
        {state.dateArr.map((day) => (
          <p
            style={{
              transform: "rotate(-60deg) translate(-16px, 5px)",
              fontSize: 11,
              width: 20,
              height: 20,
              marginRight: 5,
              marginLeft: 5,
              paddingTop: 24,
            }}
          >
            {formatDate(day)}
          </p>
        ))}
      </div>
      {state.data.map((doc) => (
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <p>{doc.project}</p>
          {doc.subprojects.map((sp) => (
            <div style={{ display: "inline-flex" }}>
              <p
                style={{
                  width: 100,
                  fontSize: 12,
                  alignSelf: "center",
                }}
              >
                {sp.subproject}
              </p>
              {sp.data.map((spdoc) => (
                <div>
                  <p
                    className="shakeIt"
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 5,
                      marginLeft: 5,
                      borderRadius: 5000,
                      boxShadow: "1px 1px 4px 1px rgba(0,0,0,0.2)",
                      backgroundColor:
                        spdoc.count > 1
                          ? "yellow"
                          : spdoc.status === 1
                          ? "green"
                          : spdoc.status === 0 && spdoc.count === 1
                          ? "red"
                          : "white",
                    }}
                  ></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
