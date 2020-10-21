import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import CtaStationsDropdown from "./CtaStationsDropdown";
import StationDetail from "./StationDetail";
import StationList from "./StationList";

const AppLayout = () => {
  const CTA_STATIONS_URI =
    "https://raw.githubusercontent.com/thomasjfox1/cta-stations/master/cta_stations.json";
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState({});
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const PER_PAGE = 10;
  const [displayedStations, setDisplayedStations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const getStationsPerPage = () => {
    let statons = null;
    statons = Object.keys(stations).slice(page, page + PER_PAGE - 1);

    if (statons.length > 0 && displayedStations.length <= stations.length) {
      setLoaded(true);

      setPage(page + PER_PAGE);
      setView("list");
      setDisplayedStations([...displayedStations, ...statons]);
    }
  };

  const getStations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CTA_STATIONS_URI);
      setLoading(false);
      setStations(data);
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => {
    setView("list");
  };

  const showStation = async (index) => {
    try {
      const { STATION_NAME, STOPS } = stations[index];
      const details = {};
      if (Array.isArray(STOPS)) {
        let stps = [];
        for (let stop of STOPS) {
          const stationId = stop.STOP_ID;
          if (!stationId) {
            return;
          }
          setLoading(true);
          setCurrentIndex(index);
          const url = `https://cors-anywhere.herokuapp.com/http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=e22345c93ad34bad94edbc2a46fa90ad&stpid=${stationId}&outputType=JSON`;
          const { data } = await axios.get(url);
          setLoading(false);

          stps.push(data.ctatt);
        }
        setStation({ stops: stps, name: STATION_NAME, index: index });
        setView("details");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loaded) {
      getStationsPerPage();
    }
  }, [stations]);

  useEffect(() => {
    getStations();
  }, [CTA_STATIONS_URI]);

  return (
    <Container className="m-5" data-testid="appLayout">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <CtaStationsDropdown
                stations={stations}
                showStation={showStation}
              />
              {loading && (
                <div>
                  <p className="text-center text-gray-300 my-3">fetching...</p>
                </div>
              )}
            </Col>
          </Row>
          {view === "list" ? (
            <>
              <Row>
                <Col>
                  {displayedStations.length > 0 ? (
                    <StationList
                      displayedStations={displayedStations}
                      showStation={showStation}
                      loading={loading}
                      stations={stations}
                      currentIndex={currentIndex}
                    />
                  ) : (
                    <p className="alert alert-info my-5">No stations found!</p>
                  )}
                </Col>
              </Row>
              <>
                <Row>
                  <Col>
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={getStationsPerPage}
                    >
                      Load more
                    </button>
                  </Col>
                </Row>
              </>
            </>
          ) : (
            <Row>
              <Col>
                {view === "details" && (
                  <StationDetail
                    station={station}
                    showStation={showStation}
                    goBack={goBack}
                  />
                )}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AppLayout;
