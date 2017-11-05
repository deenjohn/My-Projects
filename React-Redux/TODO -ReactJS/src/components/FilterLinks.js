const React = require("react");
const constants = require("../constants");
const ALL = constants.ALL;
const ACTIVE = constants.ACTIVE;
const COMPLETED = constants.COMPLETED;

const Link = function(props) {
  let currentFilter = props.currentFilter;
  let filterName = props.filterName;

  let linkStyle = { marginLeft: "3px", marginRight: "3px" };
  if (currentFilter === filterName) {
    linkStyle = {
      marginLeft: "3px",
      marginRight: "3px",
      backgroundColor: "#e6e6e6",
      borderColor: "#adadad",
      lineHeight: "1.5"
    };
  }

  return (
    <a
      href="#"
      className="btn btn-default btn-sm"
      style={linkStyle}
      onClick={function(evt) {
        props.onFilterChange(evt, filterName);
      }}
    >
      <strong>{props.children}</strong>
    </a>
  );
};

let FilterLinks = function(props) {
  return (
    <div style={{ marginBottom: "30px" }}>
      {"Display: "}
      <Link
        currentFilter={props.currentFilter}
        filterName={ALL}
        onFilterChange={props.onFilterChange}
      >
        {ALL}
      </Link>
      <Link
        currentFilter={props.currentFilter}
        filterName={ACTIVE}
        onFilterChange={props.onFilterChange}
      >
        {ACTIVE}
      </Link>
      <Link
        currentFilter={props.currentFilter}
        filterName={COMPLETED}
        onFilterChange={props.onFilterChange}
      >
        {COMPLETED}
      </Link>
    </div>
  );
};

module.exports = FilterLinks;
