import React from "react"
import { mount, shallow } from "enzyme"
import { Col, Row, Modal, ModalBody } from 'mdbreact';
import Footer from "./Footer.jsx"
import { footerContent } from '../../../data/footerConfig'
import { link } from "fs";

describe("Footer", () => {
  let props
  let mountedFooter
  const footer = () => {
    if (!mountedFooter) {
      mountedFooter = mount(
        <Footer />
      )
    }
    return mountedFooter
  }

  beforeEach(() => {
    props = {}
    mountedFooter = undefined
  })

  // All tests will go here
  it('should render correctly with no props', () => {
    expect(footer()).toMatchSnapshot()
  })

  it("config data exists", () => {
    expect(footerContent).toBeDefined()
  })

  it("has 2 rows", () => {
    expect(footer().find(Row).length).toBe(2)
  })

  describe("top/first row", () => {

    //Count the number of sections and text links
    let sectionCount = 0
    let linkCount = 0
    if (footerContent) {
      footerContent.sections.forEach(section => {
        sectionCount += 1
        if (section.links) {
          section.links.forEach(link => {
            if (link.text) {
              linkCount += 1
            }
          })
        }
      })
    }

    it(`has ${sectionCount} columns`, () => {
      expect(footer().find(Row).first().find(Col).length).toBe(sectionCount)
    })

    it(`has ${linkCount} links`, () => {
      expect(footer().find(".custom_link").length).toBe(linkCount)
    })
  })

  describe("bottom/second row", () => {
    it("has exactly one column", () => {
      expect(footer().find(Row).last().find(Col).length).toBe(1)
    })
  })

  it("has exactly one modal defined", () => {
    expect(footer().find(Modal).length).toBe(1)
  })

  //can't seem to test modal content with mount, but shallow works
  describe("modal", () => {
    const component = shallow(<Footer />)
    it("has exactly one iframe", () => {
      expect(component.find("iframe").length).toBe(1)
    })
  })

  it("has at least one image", () => {
    expect(footer().find("img").length).toBeGreaterThan(0)
  })

})