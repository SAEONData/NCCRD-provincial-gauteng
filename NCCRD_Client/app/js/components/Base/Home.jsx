import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import { DEAGreen } from '../../config/colours.js'

import backdrop from '../../../images/backdrop.jpg'

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNav: payload => {
      dispatch({ type: "NAV", payload })
    }
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateNav(location.hash)
  }

  render() {
    return (
      <>
            <section className="ea-content dark-grey-bg-2">
        <div className="container-fluid">
        <div className="text-white pt-4 pb-3">
        <p>Please note that you are accessing the Beta Version of NCCIS website, which is in the process of being tested before its official release on March 2020. The sole purpose of this BETA Version is to conduct testing and obtain feedback.</p>
        <p>Should you encounter any bugs, lack of functionality or other problems on the beta website, please <u className="supportToggle">submit a ticket here</u></p>
        </div>
        </div>
      </section>
      <div>
        <Row style={{ marginLeft: "0px", marginRight: "0px", backgroundImage: `url(${backdrop})`, minHeight: "450px" }}>
          <Col md="12">
            <br />
            <h1 style={{ color: "white" }}>NCCRD Data Service</h1>
            <p className="lead" style={{ color: "white" }}>
              Home of the NCCRD (National Climate Change Response Database) Web site
            </p>
            <p className="lead" style={{ color: "white" }}>
              A project by SAEON (South African Environmental Observations Network)
              <br />
              for DEA (Department of Environmental Affairs)
            </p>
            <p style={{ color: "white" }}>
              <a href="http://www.saeon.ac.za" className="btn btn-sm"
                style={{ width: "150px", backgroundColor: DEAGreen }}>SAEON</a>

              <a href="http://www.environment.gov.za/" className="btn btn-sm"
                style={{ width: "150px", backgroundColor: DEAGreen }}>DEA</a>
            </p>
          </Col>
        </Row>
      </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)