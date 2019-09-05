import React from 'react'
import { Row, Col, Button } from 'mdbreact'
import { connect } from 'react-redux'
import popout from '../../../images/popout.png'
import popin from '../../../images/popin.png'
import { MapConfig } from '../../../data/mapConfig'
import loader from '../../../images/loader.gif'
import { vmsBaseURL, mapServerBaseURL } from '../../config/serviceURLs.js'

const mapStateToProps = (state, props) => {
  let { filterData: { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, favoritesFilter } } = state
  return {
    titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter, favoritesFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScrollPos: payload => {
      dispatch({ type: "SET_PROJECT_SCROLL", payload })
    }
  }
}

class MapViewCore extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeFilters: {
        region: 0,
        status: 0,
        typology: 0,
        sector: 0,
        title: ""
      }
    }
  }

  componentDidMount() {
    window.addEventListener("message", this.onMessage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.onMessage)
  }

  componentDidUpdate() {

    let { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter } = this.props
    let { activeFilters } = this.state

    if (regionFilter !== activeFilters.region || statusFilter !== activeFilters.status ||
      typologyFilter !== activeFilters.typology || sectorFilter !== activeFilters.sector ||
      titleFilter !== activeFilters.title) {
      this.setState({
        activeFilters: {
          region: regionFilter,
          status: statusFilter,
          typology: typologyFilter,
          sector: sectorFilter,
          title: titleFilter
        }
      }, () => { this.forceUpdate() })
    }

  }

  onMessage(event) {

    if (event.origin === mapServerBaseURL) {
      try {
        var message = JSON.parse(event.data)
        if (message.cmd == 'featureClick' && !location.hash.includes("projects")) {
          
          let navTo = ""
          if (location.hash.includes("map")) {
            navTo = location.hash.replace("#/map", "#/projects/" + message.id)
          }
          else {
            navTo = location.hash.replace("#/", "#/projects/" + message.id)
          }
          location.hash = navTo
        }
      }
      catch (ex) {
        console.error(ex)
      }
    }
  }

  buildMapConfig() {

    let { titleFilter, statusFilter, typologyFilter, regionFilter, sectorFilter } = this.props
    let mapConfig = MapConfig

    //Add filters
    if (parseInt(regionFilter) > 0 || parseInt(statusFilter) > 0 || parseInt(typologyFilter) > 0 ||
      parseInt(sectorFilter) > 0 || titleFilter !== "") {

      let filters = []

      if (parseInt(regionFilter) > 0) {
        filters.push(
          {
            field: "properties.regions",
            value: parseInt(regionFilter)
          }
        )
      }

      if (parseInt(statusFilter) > 0) {
        filters.push(
          {
            field: "properties.status",
            value: parseInt(statusFilter)
          }
        )
      }

      if (parseInt(typologyFilter) > 0) {
        filters.push(
          {
            field: "properties.typology",
            value: parseInt(typologyFilter)
          }
        )
      }

      if (parseInt(sectorFilter) > 0) {
        filters.push(
          {
            field: "properties.sectors",
            value: parseInt(sectorFilter)
          }
        )
      }

      // if (titleFilter !== "") {
      //   filters.push(
      //     {
      //       field: "properties.name",
      //       value: titleFilter
      //     }
      //   )
      // }

      mapConfig.filters = filters
    }
    else {
      delete mapConfig.filters
    }

    //Set viewport
    if (parseInt(regionFilter) > 0) {
      mapConfig.viewport = {
        service: {
          url: `${vmsBaseURL}regions/${regionFilter}`,
          field: "wkt",
          display: true
        }
      }
    }
    else {
      delete mapConfig.viewport
    }

    return encodeURIComponent(JSON.stringify(mapConfig))
  }

  render() {

    let { height, width, fullView } = this.props
    let mapConfig = this.buildMapConfig()
    let mapSrc = `${mapServerBaseURL}?conf=${mapConfig}`

    if (!height) {
      height = "300px"
    }

    if (!width) {
      width = "100%"
    }

    return (
      <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid gainsboro" }}>

        <h4 style={{ margin: "5px 5px 0px 19px", display: "inline-block" }}>
          <b>Map</b>
        </h4>

        <img
          src={fullView ? popin : popout}
          style={{
            width: "25px",
            float: "right",
            margin: "5px 5px 0px 0px",
            cursor: "pointer"
          }}
          onClick={() => {
            if (!fullView) this.props.setScrollPos(document.getElementById("app-content").scrollTop)

            let navTo = ""
            if (fullView) {
              navTo = location.hash.replace("#/map", "")
            }
            else {
              navTo = location.hash.replace("#/", "#/map")
            }
            location.hash = navTo
          }}
        />

        <hr />

        <iframe
          style={{
            width,
            height,
            margin: "0px",
            border: "none",
            // backgroundImage: `url(${loader})`,
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "50% 50%"
          }}
          src={mapSrc}
        />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViewCore)