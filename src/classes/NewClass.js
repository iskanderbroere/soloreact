import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { createClass } from '../actions/classes'
import './NewClass.css'

class NewClass extends PureComponent {
  constructor(props) {
    super()

    const { batchNumber, startDate, endDate } = props

    this.state = {
      batchNumber,
      startDate,
      endDate,
      focusedInput: null
    }
  }

  updateBatchnumber(event) { this.setState({ batchNumber: this.refs.batchNumber.value }) }

  updateStartDate(event) { this.setState({ startDate: this.refs.startDate.value }) }

  updateEndDate(event) { this.setState({ endDate: this.refs.endDate.value }) }

  saveClass() { this.props.save(this.state) }

  render() {
    return (
      <div>
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
        <DateRangePicker
          block
          displayFormat="DD MMM YYYY"
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <div className="control">
          <button style={{ width: '100%' }} className="button is-primary" onClick={this.saveClass.bind(this)}>Create class</button>
        </div>
        </div>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createClass }

export default connect(null, mapDispatchToProps)(NewClass)