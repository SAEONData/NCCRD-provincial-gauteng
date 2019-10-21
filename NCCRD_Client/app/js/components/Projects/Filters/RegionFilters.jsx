import React from 'react'
import { vmsBaseURL } from "../../../config/serviceURLs.js"
import { connect } from 'react-redux'
import TreeSelectComponent from '../../Shared/TreeSelectComponent.jsx'
import { CustomFetch } from '../../../globalFunctions.js';

const mapStateToProps = (state, props) => {
  let { lookupData: { regionTree, region } } = state
  let { filterData: { regionFilter } } = state
  return { regionTree, regionFilter, region }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRegionFilter: payload => {
      dispatch({ type: "LOAD_REGION_FILTER", payload })
    },
    loadRegions: payload => {
      dispatch({ type: "LOAD_REGION", payload })
    }
  }
}

class RegionFilters extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    let { loadRegions, region } = this.props

    if (region.length === 0) {
      //Get data
      try {
        let res = await CustomFetch(vmsBaseURL + "Regions/flat")

        if (res.ok) {
          res = await res.json()

          if (res.items && res.items.length > 0) {
            let data = res.items
            loadRegions(data)
          }
        }
      }
      catch (ex) {
        console.error(ex)
      }
    }
  }

  render() {

    let { region, regionFilter } = this.props

    return (
      <>
        <TreeSelectComponent col="col-md-2"
          id="treeRegionFilter"
          label="Region"
          selectedValue={regionFilter=[7]}
          data={region}
          editModeOverride={true}
          labelStyle={{
            fontSize: "14px",
            fontWeight: "400",
            color: "grey"
          }}
          style={{
            marginTop: "-4px",
            marginBottom: "15px"
          }}
          setSelectedValueKey="LOAD_REGION_FILTER"
        />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionFilters)