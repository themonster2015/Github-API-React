import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("App component", () => {
  it("render without crashing", () => {
    const wrapper = mount(<App />);
    const text = wrapper.find("h1").text();
    expect(text).toEqual(" Enter a Github Username to Search");
  });
  it("calls onClick event on click of a board square", () => {
    const onClick = jest.fn();
    let wrapper = mount(<App />);
    wrapper
      .find("form.group")
      .find("button")
      .simulate("submit");
    expect(onClick).toBeCalledWith(0);
  });
});
