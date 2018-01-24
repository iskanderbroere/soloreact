import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createClass } from '../actions/classes'
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
      <div className="card newClass">
        <div className="card-content">
        {/* <div className="content"> */}
        {/* <h1>Create class</h1> */}
        <div className="field">
        <div className="control">
        <input required
          className="input"
          type="number"
          ref="batchNumber"
          placeholder="Batch Number"
          defaultValue={this.state.batchNumber}
          onChange={this.updateBatchnumber.bind(this)}
          onKeyUp={this.updateBatchnumber.bind(this)} />
        </div>
        </div>
        <div className="field">
          <label className="label">Start date</label>
          <div className="control">
          <input required
            className="input"
            id="startDate"
            ref="startDate"
            type="date"
            defaultValue={this.state.startDate}
            onChange={this.updateStartDate.bind(this)}
            onKeyUp={this.updateStartDate.bind(this)} />
          </div>
        </div>
        <div className="field">
          <label className="label">End date</label>
          <div className="control">
          <input required
            className="input"
            id="endDate"
            ref="endDate"
            type="date"
            defaultValue={this.state.endDate}
            onChange={this.updateEndDate.bind(this)}
            onKeyUp={this.updateEndDate.bind(this)} />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" onClick={this.saveClass.bind(this)}>Create class</button>
        </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createClass }

export default connect(null, mapDispatchToProps)(NewClass)