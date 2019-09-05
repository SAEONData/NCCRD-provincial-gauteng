import React from 'react'
import { Button, Fa, Row, Col } from 'mdbreact'
import { connect } from 'react-redux'
import DualTip from '../../Shared/DualTip.jsx';
import { UILookup } from '../../../config/ui_config.js'
import { DEAGreen } from '../../../config/colours';

import './shared.css'
import './ProjectVerifyStep.css'

const mapStateToProps = (state, props) => {
  let { projectData: { projectDetails } } = state
  return { projectDetails }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVerified: payload => {
      dispatch({ type: "SET_PROJECT_DETAILS_VERIFIED", payload: { value: payload, state: 'modified' } })
    }
  }
}

class ProjectVerifyStep extends React.Component {

  constructor(props) {
    super(props);

    this.verify = this.verify.bind(this)
  }

  verify(state){
    this.props.setVerified(state)
  }

  render() {

    let { projectDetails } = this.props
    let verifyConf = UILookup("btnVerify", "Project verification status:")

    return (
      <>
        <Row>
          <Col md="6">
            <DualTip
              label={verifyConf.label}
              primaryTip={verifyConf.tooltip}
              secondaryTip={verifyConf.tooltip2}
              required={verifyConf.required}
            />
            {
              projectDetails.Verified === false &&
              <Button className="btnVerify" color="white" size="sm" onClick={() => this.verify(true)}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Fa className="red-text fa-2x button-icon" icon="times-circle" />
                      </td>
                      <td>
                        Not Verified
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Button>
            }
            {
              projectDetails.Verified === true &&
              <Button className="btnVerify" color="white" size="sm" onClick={() => this.verify(false)}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Fa className="green-text fa-2x button-icon" icon="check-circle" />
                      </td>
                      <td>
                        Verified
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Button>
            }
          </Col>
        </Row>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVerifyStep)