import React from "react";
import { shallow } from "enzyme";

import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("render without crashing", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
