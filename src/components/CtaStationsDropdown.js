import React from "react";
import { Form } from "react-bootstrap";

const CtaStationsDropdown = ({ stations, showStation }) => {
  const handleChange = (event) => {
    showStation(event.target.value);
  };
  return (
    <Form>
      <Form.Group controlId="stationsDropdown" data-testid="stationsDropdown">
        <Form.Control as="select" onChange={handleChange}>
          <option>Please select</option>
          {stations.map((station, index) => (
            <option key={index} value={index}>
              {station.STATION_NAME} Station
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default CtaStationsDropdown;
