import React from 'react'
import { connect } from 'react-redux'
import { UILookup } from "../../config/ui_config.js"
import { TreeSelect } from 'antd'
import DualTip from './DualTip.jsx'
import '../../../css/antd.tree-select.css'

const TreeSelectNode = TreeSelect.TreeNode;

const mapStateToProps = (state, props) => {
  let { globalData: { editMode } } = state
  let editListModalStateChanged = state.editListModalData.show
  return { editMode, editListModalStateChanged }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedValue: (key, payload) => {
      dispatch({ type: key, payload })
      dispatch({ type: "SET_PROJECT_DETAILS_VERIFIED", payload: { value: false, state: 'modified' } })
    },
    setEditList: (payload) => {
      dispatch({ type: "SET_EDIT_LIST", payload })
    }
  }
}

class TreeSelectComponent extends React.Component {

  constructor(props) {
    super(props);

    this.getDisabledState = this.getDisabledState.bind(this)
  }

  getLabelFontColour(uiconf) {
    if (typeof uiconf.required != 'undefined' && uiconf.required === true) {
      return "red"
    }
    else {
      return "black"
    }
  }

  getDisabledState() {
    let { editMode, editModeOverride } = this.props

    let disabledState = true

    if (typeof editModeOverride !== "undefined" && editModeOverride === true) {
      disabledState = false
    }
    else if (typeof editMode !== "undefined" && editMode === true) {
      disabledState = false
    }

    return disabledState
  }

  transformDataTree(effectiveData, globalData, level = 0) {

    let treeNodes = []
    let parentIdKey = "Parent" + Object.keys(effectiveData[0])[0].toString()

    if (typeof globalData === 'undefined') {
      globalData = effectiveData
    }

    if (level === 0) {
      effectiveData = effectiveData.filter(x => x[parentIdKey] === null)
    }

    effectiveData.map(item => {

      let newTreeNode = {
        key: item[Object.keys(item)[0]],
        id: item[Object.keys(item)[0]],
        text: item[Object.keys(item)[1]],
        modifiedState: item.modifiedState
      }

      let children = globalData.filter(x => x[parentIdKey] == newTreeNode.id)
      if (children.length > 0) {
        newTreeNode.children = this.transformDataTree(children, globalData, (level + 1))
      }

      treeNodes.push(newTreeNode)
    })

    return treeNodes
  }

  renderTreeSelectNodes(data, level = "top") {

    let { allowEdit } = this.props

    if (allowEdit === true && level === "top" && !this.getDisabledState()) {

      //Insert "[Edit list values...]" entry
      if (data.filter(x => x.value === "[Edit list values...]").length === 0) {
        data.splice(0, 0, {
          "id": -1,
          "text": "[Edit list values...]",
          "modifiedState": false
        })
      }
    }

    return data.map((item) => {
      if (item.children) {
        return (
          <TreeSelectNode
            key={item.id}
            value={item.text}
            title={(item.modifiedState === true ? "* " : "") + `(${item.children.length}) ` +  item.text}
          >
            {this.renderTreeSelectNodes(item.children, "child")}
          </TreeSelectNode>
        )
      }
      return <TreeSelectNode value={item.text} title={(item.modifiedState === true ? "* " : "") + item.text} key={item.id} />
    })
  }

  dependencyTreeSelect(value, label, extra) {

    if (!this.getDisabledState()) {
      let { setSelectedValueKey, setSelectedValue, editMode, parentId, setEditList, data, dispatch, persist, type, dependencies, newItemTemplate } = this.props
      let selectedValue = 0

      if (typeof extra.triggerNode !== 'undefined') {
        selectedValue = extra.triggerNode.props.eventKey
      }

      if (selectedValue == -1) {

        //Setup and Show EditListModal
        if (typeof type === 'undefined') {
          type = "std"
        }
        if (typeof dependencies === 'undefined') {
          dependencies = []
        }

        setEditList({
          show: true, data: data, dispatch: dispatch, persist: persist, type: type,
          dependencies: dependencies, newItemTemplate: newItemTemplate
        })
      }
      else {

        //Dispatch to store
        if (typeof setSelectedValueKey !== 'undefined') {
          setSelectedValue(setSelectedValueKey, { 
            value: selectedValue, id: parentId, state: editMode === true ? "modified" : "original" 
          })
        }
      }
    }
  }

  render() {

    let { col, label, id, selectedValue, data, style, labelStyle, matchWidth, placeholder, disabled } = this.props
    let uiconf = UILookup(id, label)
    let treeData = []
    let selVal = []

    if (!style) {
      style = {}
    }

    if (!labelStyle) {
      labelStyle = {}
    }

    if (!matchWidth) {
      matchWidth = false
    }

    if (!placeholder) {
      placeholder = "Select..."
    }

    if (data.length > 0) {

      //Get tree data
      treeData = this.transformDataTree(data)

      //Get selected value
      let idKey = Object.keys(data[0])[0].toString()
      let valueKey = Object.keys(data[0])[1].toString()
      let valObj = data.filter(x => x[idKey] == selectedValue)[0]
      if (typeof valObj !== 'undefined') {
        selVal = valObj[valueKey]
      }
    }

    return (
      <div className={col}>
        <DualTip label={uiconf.label} primaryTip={uiconf.tooltip} secondaryTip={uiconf.tooltip2} required={uiconf.required} />

        <TreeSelect
          showSearch
          disabled={disabled}
          searchPlaceholder="Search..."
          style={{ width: "100%", ...style }}
          value={selVal}
          dropdownStyle={{ maxHeight: "300px", maxWidth: "300px", overflow: 'auto', }}
          dropdownMatchSelectWidth={matchWidth}
          placeholder={placeholder}
          allowClear
          onChange={this.dependencyTreeSelect.bind(this)}
        >
          {this.renderTreeSelectNodes(treeData)}
        </TreeSelect>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeSelectComponent)