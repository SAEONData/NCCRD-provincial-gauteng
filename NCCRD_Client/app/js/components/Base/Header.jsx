import React from 'react'
import { Col, Row, Container } from 'mdbreact';
import { DEAGreen, DEAGreenDark } from '../../config/colours.js'

//Images
import logo from '../../custom/logo.png'
import sa_flag from '../../../images/sa_flag.jpg'

class Header extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
      <>
      <div style={{ backgroundColor: "white" }}>
        <Row className="align-items-center" style={{ /*marginBottom: "15px",*/ height: 100 }}>
          <Col md="2" className="d-none d-md-block">
            <img
              onClick={() => window.open("https://www.gauteng.gov.za/Departments/DepartmentDetails?departmentId=CPM-001000")}
              src={logo}
              style={{
                height: 80,
                marginLeft: 5,
                cursor: "pointer"
              }}
              align="left"
            />
          </Col>
          <Col md="1"/>
          <Col md="6">
            <div>
              <h1 style={{ textAlign: "center", letterSpacing: "2px", color: "#2e7d32" }}>
                <b>GCCRD</b>

                {/* BETA tag */}
                <sub style={{ fontSize: "18px", backgroundColor: "#78e26c", borderRadius: "5px", padding: "2px" }}>
                  <i>BETA</i>
                </sub>

              </h1>
              
              <h5 style={{ textAlign: "center", letterSpacing: "2px", marginTop: "-8px", color: "grey" }}>
                <b>Gauteng Climate Change Response Database</b>
              </h5>
           
            </div>
          </Col>
          <Col md="1"/>
          <Col md="2" className="d-none d-md-block">
            <img
              src={sa_flag}
              style={{
                height: 80,
                marginRight: 5
              }}
              align="right"
            />
          </Col>
        </Row>
      </div>
       <section className="ea-content dark-grey-bg-2">
       <div className="container-fluid">
     
       <b>Please note that you are accessing the Beta Version of GCCRD website, which is in the process of being tested before its official release in 2020. The sole purpose of this BETA Version is to conduct testing and obtain feedback.
       Should you encounter any bugs, lack of functionality or other problems on the beta website, please <a href="https://ccis.environment.gov.za/support.html">submit a ticket.</a></b>
      
       </div>
     </section>
     </>
    )
  }
}

export default Header