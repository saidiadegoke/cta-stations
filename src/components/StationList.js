import React from "react";
import { Row, Col } from "react-bootstrap";

const StationList = ({
  displayedStations,
  showStation,
  loading,
  stations,
  currentIndex,
}) => {
  return (
    <>
      <h4 className="display-4 mt-3">Stations Available</h4>
      <ul className="table my-5 station-list">
        {displayedStations.map((item, i) => (
          <li key={i}>
            <button type="button" onClick={() => showStation(item)}>
              <Col className="mr-auto">
                <h4>{stations[item].STATION_NAME}</h4>
              </Col>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StationList;
