import React from "react";
import { mount, shallow } from "enzyme";
import { render } from "@testing-library/react";

import Search from "./Search";
import { Consumer } from "../context";
it("calls findUser function when form is submitted", () => {
  const onSubmitFn = jest.fn();
  const wrapper = shallow(<Search onSubmit={onSubmitFn} />).dive();
  const form = wrapper.find("form");
  form.simulate("submit");
  expect(onSubmitFn).toHaveBeenCalledTimes(1);
});
test("UserGreeter salutes an anonymous user", () => {
  const { getByText } = render(
    <Consumer>
      <Search />
    </Consumer>
  );
  expect(getByText("Hello stranger!")).toBeInTheDocument();
});
