'use strict'

import React from 'react'
import { Button } from 'mdbreact'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { LOAD_PROJECT_STATUS, LOAD_STATUS_FILTER } from "../../constants/action-types"
import { apiBaseURL } from "../../constants/apiBaseURL";
import SelectComponent from '../SelectComponent.jsx'

const queryString = require('query-string')

const mapStateToProps = (state, props) => {
    let { lookupData: { projectStatus } } = state
    let { filterData: { statusFilter } } = state
    return { projectStatus, statusFilter }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: payload => {
            dispatch({ type: LOAD_PROJECT_STATUS, payload })
        },
        loadStatusFilter: payload => {
            dispatch({ type: LOAD_STATUS_FILTER, payload })
        }
    }
}

class StatusFilter extends React.Component {

    constructor(props) {
        super(props);

        //Read initial filter from URL
        const parsedHash = queryString.parse(location.hash.replace("/projects?", ""))
        if (typeof parsedHash.status !== 'undefined') {

            //Dispatch to store
            let { loadStatusFilter } = this.props
            loadStatusFilter(parsedHash.status)
        }
    }

    componentDidMount() {

        //Load data
        let { loadData } = this.props
        fetch(apiBaseURL + 'api/ProjectStatus/GetAll', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                loadData(res)
            })
    }

    render() {

        let { statusFilter } = this.props

        return (
            <SelectComponent 
                col="col-md-4" 
                label="Status:" 
                selectedValue={statusFilter} 
                options={this.props.projectStatus}
                setSelectedValueKey={LOAD_STATUS_FILTER}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter)