import React from "react";
import { mount, shallow } from "enzyme";
// import { render, fireEvent, cleanup } from "react-testing-library";

import Search from "./Search";
import App from "../App";

import { Consumer, Provider } from "../context";

describe("Search component", () => {
  it("render without crashing", () => {
    const findUser = jest.fn();

    const wrapper = shallow(
      <Provider value={findUser}>
        <Consumer>
          <Search></Search>
        </Consumer>
      </Provider>
    ).dive();
    expect(wrapper.exists()).toBeTruthy();
  });
});
