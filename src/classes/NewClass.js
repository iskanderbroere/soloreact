import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createClass } from '../actions/classes'
import { format } from 'date-fns'
import './NewClass.css'

class NewClass extends PureComponent {
  constructor(props) {
    super()

    const { batchNumber, startDate, endDate } = props

    this.state = {
      batchNumber,
      startDate,
      endDate
    }
  }

  updateBatchnumber(event) { this.setState({ batchNumber: this.refs.batchNumber.value }) }

  updateStartDate(event) { this.setState({ startDate: this.refs.startDate.value }) }

  updateEndDate(event) { this.setState({ endDate: this.refs.endDate.value }) }

  saveClass() { this.props.save(this.state) }

  render() {
    return (
      <div className="newClass">
        <h1>Create class</h1>
        <input required
          type="text"
          ref="batchNumber"
          className="batchNumber"
          placeholder="Batch Number"
          defaultValue={this.state.batchNumber}
          onChange={this.updateBatchnumber.bind(this)}
          onKeyUp={this.updateBatchnumber.bind(this)} />
        <input required
          id="startDate"
          ref="startDate"
          type="date"
          defaultValue={this.state.startDate}
          onChange={this.updateStartDate.bind(this)}
          onKeyUp={this.updateStartDate.bind(this)} />
        <input required
          id="endDate"
          ref="endDate"
          type="date"
          defaultValue={this.state.endDate}
          onChange={this.updateEndDate.bind(this)}
          onKeyUp={this.updateEndDate.bind(this)} />
        <button className="primary" onClick={this.saveClass.bind(this)}>Create class</button>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createClass }

export default connect(null, mapDispatchToProps)(NewClass)