import React from 'react'
import { Row, Col, Button, Input, Card, CardBody, CardText, Fa } from 'mdbreact'
import { connect } from 'react-redux'
import TextComponent from '../../Shared/TextComponent.jsx'
import { ndaoBaseURL } from '../../../config/serviceURLs.js'
import OData from 'react-odata'
import { DEAGreen, DEAGreenDark } from '../../../config/colours.js'

const mapStateToProps = (state, props) => {
  let user = state.oidc.user
  let { globalData: { editMode } } = state
  return { user, editMode }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: payload => {
      dispatch({ type: "SET_EDIT_MODE", payload })
    }
  }
}

class DAOLinkStep extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { ProjectDAOs, user, linkCallback, editMode, setEditMode } = this.props

    return (
      <>
        <div>
          {(!user || user.expires) &&
            <b><i><a href="#/login">Login</a> to allow editing</i></b>
          }

          {(!editMode && (user && !user.expired)) &&
            <b>
              <i>
                Enable
                &nbsp;
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setEditMode(true) }}>
                  EDIT-MODE
                  </span>
                &nbsp;
                to allow editing
                </i>
            </b>
          }
        </div>

        {/* LINKED */}
        {editMode &&
          <div>
            <h5 style={{ marginBottom: "15px", fontWeight: "bold", color:  DEAGreenDark}}>
              Linked DAOs:
            </h5>

            <div>
              <OData
                baseUrl={ndaoBaseURL + `Goals?$expand=Questions&$filter=Id in (${ProjectDAOs.map(x => `'${x.DAOId}'`).join(", ")})`}>
                {({ loading, error, data }) => {

                  if (loading) {
                    return (
                      <h6>
                        Fetching your DAOs...
                    </h6>
                    )
                  }

                  if (error) {
                    console.error(error)
                    return (
                      <p>
                        Unable to fetch DAOs. (See log for details)
                    </p>
                    )
                  }

                  if (data) {
                    let yourGoals = []

                    if (data.value.length === 0) {

                      yourGoals.push(
                        <p key="linked_no_goals_msg">
                          No DAOs found.
                        </p>
                      )

                      if(ProjectDAOs && ProjectDAOs.length > 0){
                        yourGoals.push(
                          <p key="linked_no_goals_msg_2">
                            This is normal if your DAO has not been submitted yet.
                            <br/>
                            Once you have submitted your DAO in the CCIS, your DAO's details will become available here.
                          </p>
                        )
                      }
                    }
                    else {
                      data.value.forEach(item => {

                        let docLink = ""
                        let hasAssessment = ""
                        let docLastUpated = ""
                        
                      

                        //Get DocumentLink
                        let tmp = item.Questions.filter(q => q.Key === "DocumentLink")
                        if (tmp.length > 0) {
                          docLink = tmp[0].Value
                        }

                        //Get HasAssessment
                        tmp = item.Questions.filter(q => q.Key === "HasAssessment")
                        if (tmp.length > 0) {
                          hasAssessment = tmp[0].Value === 'true' ? "Yes" : "No"
                        }

                        //Get DocLastUpdated
                        tmp = item.Questions.filter(q => q.Key === "DocLastUpdated")
                        if (tmp.length > 0) {
                          docLastUpated = tmp[0].Value
                        }

                        yourGoals.push(
                          <Card key={item.Id} style={{ marginBottom: "10px", backgroundColor: "whitesmoke", border: "1px solid gainsboro" }}>
                            <CardBody>

                              <div style={{ color: "grey" }}>
                                <b>Document Link:</b><br />
                                <div style={{ marginLeft: "15px" }}>
                                  <a href={docLink} target="blank">
                                    {docLink}
                                  </a>
                                </div>
                                <div>
                                  <b>Id:</b> {item.Id}
                                </div>
                                <div>
                                  <b>Has Assessment:</b> {hasAssessment}
                                </div>
                                <div>
                                  <b>Document Last Updated:</b> {docLastUpated}
                                </div>
                                <div>
                                  <b>Goal Created:</b> {item.CreateDate}
                                </div>
                                <div>
                                  <b>Goal Last Updated: </b> {
                                    item.UpdateDate === null ? item.CreateDate : item.UpdateDate
                                  }
                                </div>
                              </div>
                              <Button
                                size="sm"
                                color=""
                                style={{ backgroundColor: DEAGreen, marginLeft: "0px", marginTop: "15px" }}
                                onClick={() => {
                                  if (linkCallback) {
                                    setTimeout(linkCallback(item.Id, "remove"), 1000)
                                  }
                                }}>
                                <Fa className="button-icon" icon="unlink" />
                                Unlink
                        </Button>
                            </CardBody>
                          </Card>
                        )
                      })
                    }

                    return yourGoals
                  }

                }}
              </OData>

            </div>

            <hr style={{ margin: "30px 0px 25px 0px" }} />
          </div>
        }

        {/* NOT LINKED */}
        <div>

          {editMode &&
            <div>
              <h5 style={{ marginBottom: "15px", fontWeight: "bold", color: DEAGreenDark }}>
                Search for DAOs:
              </h5>
              <br />
              <h5 style={{ fontWeight: "400", marginBottom: "15px" }}>
                Your DAOs:
                </h5>

              <OData
                baseUrl={ndaoBaseURL + "Goals"}
                query={{
                  filter: {
                    and: [
                      { CreateUser: { eq: { type: 'guid', value: user ? user.profile.UserId : "" } } },
                      { Type: 1 },
                      ProjectDAOs.map(x => ({
                        Id: { ne: { type: 'guid', value: x.DAOId } }
                      }))
                    ]
                  },
                  select: ['Id', 'CreateDate', 'UpdateDate'],
                  orderBy: ["CreateDate DESC"]
                }}
              >
                {({ loading, error, data }) => {

                  if (loading) {
                    return (
                      <h6>
                        Fetching your DAOs...
                    </h6>
                    )
                  }

                  if (error) {
                    console.error(error)
                    return (
                      <p>
                        Unable to fetch DAOs. (See log for details)
                    </p>
                    )
                  }

                  if (data) {
                    let yourGoals = []

                    if (data.value.length === 0) {
                      yourGoals.push(
                        <p key={new Date().valueOf()}>
                          No DAOs found.
                      </p>
                      )
                    }
                    else {
                      data.value.forEach(item => {
                        yourGoals.push(
                          <Card key={item.Id} style={{ marginBottom: "10px", backgroundColor: "whitesmoke", border: "1px solid gainsboro" }}>
                            <CardBody>
                              <CardText>
                                <b>DAO Id: </b>{item.Id}
                                <br />
                                <b>Created on: </b>{item.CreateDate}
                                <br />
                                <b>Last updated on: </b>{item.UpdateDate === null ? item.CreateDate : item.UpdateDate}
                              </CardText>
                              <Button
                                size="sm"
                                color=""
                                style={{ backgroundColor: DEAGreen, marginLeft: "0px" }}
                                onClick={() => {
                                  if (linkCallback) {
                                    setTimeout(linkCallback(item.Id, "add"), 1000)
                                  }
                                }}>
                                <Fa className="button-icon" icon="link" />
                                Link
                            </Button>
                            </CardBody>
                          </Card>
                        )
                      })
                    }

                    return yourGoals
                  }

                }}
              </OData>
              <br />

              <h5 style={{ fontWeight: "400", marginBottom: "15px" }}>
                Recently added DAOs (top 25):
              </h5>

              <OData
                baseUrl={ndaoBaseURL + "Goals"}
                query={{
                  filter: {
                    and: [
                      { Type: 1 },
                      ProjectDAOs.map(x => ({
                        Id: { ne: { type: 'guid', value: x.DAOId } }
                      }))
                    ]
                  },
                  top: 25,
                  select: ['Id', 'CreateDate', 'UpdateDate'],
                  orderBy: ["CreateDate DESC"],
                }}
              >
                {({ loading, error, data }) => {

                  if (loading) {
                    return (
                      <h6>
                        Fetching your DAOs...
                    </h6>
                    )
                  }

                  if (error) {
                    console.error(error)
                    return (
                      <p>
                        Unable to fetch DAOs. (See log for details)
                    </p>
                    )
                  }

                  if (data) {
                    let yourGoals = []

                    if (data.value.length === 0) {
                      yourGoals.push(
                        <p key={new Date().valueOf()}>
                          No DAOs found.
                      </p>
                      )
                    }
                    else {
                      data.value.forEach(item => {
                        yourGoals.push(
                          <Card key={item.Id} style={{ marginBottom: "15px", backgroundColor: "whitesmoke", border: "1px solid gainsboro" }}>
                            <CardBody>
                              <CardText>
                                <b>DAO Id: </b>{item.Id}
                                <br />
                                <b>Created on: </b>{item.CreateDate}
                                <br />
                                <b>Last updated on: </b>{item.UpdateDate === null ? item.CreateDate : item.UpdateDate}
                              </CardText>
                              <Button
                                size="sm"
                                color=""
                                style={{ backgroundColor: DEAGreen, marginLeft: "0px" }}
                                onClick={() => {
                                  if (linkCallback) {
                                    setTimeout(linkCallback(item.Id, "add"), 1000)
                                  }
                                }}>
                                <Fa className="button-icon" icon="link" />
                                Link
                            </Button>
                            </CardBody>
                          </Card>
                        )
                      })
                    }

                    return yourGoals
                  }

                }}
              </OData>

              <br />
              
            </div>
          }
        </div>

      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DAOLinkStep)