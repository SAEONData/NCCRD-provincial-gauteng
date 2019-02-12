import React from "react";
import { Col, Row } from 'mdbreact';
import { mount, shallow } from "enzyme";
import Header from "./Header.jsx";

describe("Header", () => {
  let mountedHeader;
  const header = () => {
    if (!mountedHeader) {
      mountedHeader = mount(
        <Header />
      );
    }
    return mountedHeader;
  }

  beforeEach(() => {
    mountedHeader = undefined
  });

  // All tests will go here
  it('should render correctly with no props', () => {
    //const component = shallow(<Header />)
    expect(header()).toMatchSnapshot()
  })

  it("always renders two images", () => {
    expect(header().find("img").length).toBe(2);
  })

  it("contains text 'NCCRD'", () => {
    expect(header().find("b").first().text()).toBe("NCCRD");
  })

  it("contains text 'National Climate Change Response Database'", () => {
    expect(header().find("b").last().text()).toBe("National Climate Change Response Database");
  })

  it("contains 1 Row", () => {
    expect(header().find(Row).length).toBe(1)
  })

  it("contains 5 Columns", () => {
    expect(header().find(Col).length).toBe(5)
  })
});