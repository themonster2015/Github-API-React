import React from "react";
import { shallow } from "enzyme";

import UserDisplay from "./UserDisplay";

describe("Search component", () => {
  it("render without crashing", () => {
    const wrapper = shallow(<UserDisplay />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
