import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import AppLayout from "../AppLayout";
import axios from "axios";

describe("Test App Layout", function () {
  test("It contains a select dropdwon element", function () {
    const { getByTestId } = render(<AppLayout />);
    const selectDropdown = getByTestId("stationsDropdown");

    expect(selectDropdown).toBeInTheDocument();
  });

  test("It gets the json resource via axios", async function () {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<AppLayout />);
    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});
