import React from "react";
import { shallow } from "enzyme";

import Details from "./Details";

describe("Details component", () => {
  it("render without crashing", () => {
    const wrapper = shallow(<Details />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
