import React from "react";
import { shallow } from "enzyme";

import Loading from "./Loading";

describe("Loading component", () => {
  it("render without crashing", () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
