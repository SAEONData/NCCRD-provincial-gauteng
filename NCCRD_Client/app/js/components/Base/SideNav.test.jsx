import React from "react";
import { Col, Row, SideNav as MSBSideNav, SideNavNav, SideNavCat, SideNavItem, Modal } from 'mdbreact';
import { mount, shallow } from "enzyme";
import store from '../../store'
import SideNav from "./SideNav.jsx";
import { data as NavData } from '../../../data/sideNavConfig'
import { Provider } from 'react-redux'
import { OidcProvider } from 'redux-oidc'
import userManager from '../Authentication/userManager'

describe("SideNav", () => {
  let mountedSideNav;
  const sideNav = () => {
    if (!mountedSideNav) {
      mountedSideNav = mount(
        <Provider store={store}>
          <OidcProvider store={store} userManager={userManager}>
            <SideNav data={NavData} isOpen={true} />
          </OidcProvider>
        </Provider>
      )
    }
    return mountedSideNav;
  }

  beforeEach(() => {
    mountedSideNav = undefined
  });

  // All tests will go here
  it("has 1 MSBSideNav", () => {
    expect(sideNav().find(MSBSideNav).length).toBe(1)
  })

  // it("has 1 header row", () => {
  //   expect(sideNav().find(".text-center").length).toBe(1)
  // })

  // it("has 1 footer row", () => {
  //   expect(sideNav().find(".footer").length).toBe(1)
  // })

  // it("has 1 SideNavNav", () => {
  //   expect(sideNav().find(SideNavNav).length).toBe(1)
  // })

  // it("has one or more SideNavCat", () => {
  //   expect(sideNav().find(SideNavCat).length).toBeGreaterThan(0)
  // })

  // it("has one or more SideNavItem", () => {
  //   expect(sideNav().find(SideNavItem).length).toBeGreaterThan(0)
  // })

  // it("has 1 Modal", () => {
  //   expect(sideNav().find(Modal).length).toBe(1)
  // })

  // describe("modal", () => {
  //   const component = shallow(<SideNav />)
  //   it("has exactly one iframe", () => {
  //     expect(component.find("iframe").length).toBe(1)
  //   })
  // })
})