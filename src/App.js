import React from "react";
import db from "./database/bbdd.json";
import DateFilter from "./components/dateFilter";
import CustomSelect from "./components/customSelect";
import ProjectCalendar from "./components/ProjectCalendar/projectCalendar";
import AirflowDashboard from "./components/AirflowDashboard/airflowDashboard";
import "react-calendar/dist/Calendar.css";

export default () => {
  const [state, setState] = React.useState({
    data: db.data,
    dataFiltered: db.data,
    projectFilter: "all",
    initialDate: new Date(),
    finalDate: new Date(),
  });

  //set first and last dates of db in state
  React.useEffect(() => {
    const dataOrderedByDate = state.data.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    const initialDate = new Date(dataOrderedByDate[0].timestamp);
    const finalDate = new Date(dataOrderedByDate.slice(-1)[0].timestamp);
    setState((prev) => ({ ...prev, initialDate, finalDate }));
  }, [state.data]);

  //pass data through the filters
  React.useEffect(() => {
    const dataFiltered = state.data.filter(
      (doc) =>
        toDateTime(doc.timestamp) <= toDateTime(state.finalDate) &&
        toDateTime(doc.timestamp) >= toDateTime(state.initialDate) &&
        (state.projectFilter === "all" || doc.proyecto === state.projectFilter)
    );
    setState((prev) => ({ ...prev, dataFiltered }));
  }, [state.initialDate, state.finalDate, state.data, state.projectFilter]);

  //get all projects in db as an array of options
  const projectsAsOptions = () => {
    const projectsArr = [...new Set(db.data.map((doc) => doc.proyecto))];
    return projectsArr.map((pj, ind) => (
      <option key={ind} value={pj}>
        {pj}
      </option>
    ));
  };

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Desafío Técnico CADEM
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <CustomSelect
          label="Proyectos"
          value={state.projectFilter}
          onChange={(e) =>
            setState((prev) => ({ ...prev, projectFilter: e.target.value }))
          }
        >
          <option value="all">Todos</option>
          {projectsAsOptions()}
        </CustomSelect>
        <div style={{ display: "flex" }}>
          <DateFilter
            label="fecha inicial"
            date={state.initialDate}
            onChange={(date) =>
              setState((prev) => ({ ...prev, initialDate: date }))
            }
          />
          <DateFilter
            label="fecha final"
            date={state.finalDate}
            onChange={(date) =>
              setState((prev) => ({ ...prev, finalDate: date }))
            }
          />
        </div>
      </div>
      <AirflowDashboard
        data={state.dataFiltered}
        dates={{ initial: state.initialDate, final: state.finalDate }}
      />
      <ProjectCalendar
        data={state.dataFiltered}
        dates={{ initial: state.initialDate, final: state.finalDate }}
      />
    </div>
  );
};

const toDateTime = (val) => new Date(val).getTime();
