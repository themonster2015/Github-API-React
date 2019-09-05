// @flow
import React from "react";
import { BarLoader } from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export default function Loading() {
  return (
    <div className="sweet-loading">
      <BarLoader css={override} sizeUnit={"px"} size={150} color={"#123abc"} />
    </div>
  );
}
