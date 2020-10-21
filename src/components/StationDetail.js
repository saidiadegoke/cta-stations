import React, { useEffect } from "react";
import Moment from "react-moment";

const StationDetail = React.memo(
  ({ station: { name, stops, index }, showStation, goBack }) => {
    useEffect(() => {
      const stationTimer = setInterval(function () {
        showStation(index);
      }, 60000);
      return () => {
        clearInterval(stationTimer);
      };
    });
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {stops ? (
            <table className="table details-table">
              {stops.map((item, i) => (
                <tbody key={i}>
                  <tr>
                    <th colSpan={2}>
                      {item?.eta ? item.eta[0]?.stpDe : "N/a"}
                    </th>
                  </tr>
                  {item?.eta?.map((stop, j) => (
                    <tr key={j}>
                      <td>{stop.destNm}</td>
                      <td>
                        <Moment className="float-right" unit="minute" toNow>
                          {stop.arrT}
                        </Moment>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          ) : (
            <p className="alert alert-info">No stops available</p>
          )}
          <div>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={goBack}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }
);
export default StationDetail;
