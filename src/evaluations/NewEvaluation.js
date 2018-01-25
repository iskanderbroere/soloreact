import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import { createEval } from '../actions/evaluations'
import './NewEval.css'

class NewEval extends PureComponent {
  constructor(props) {
    super()

    const { color, remark } = props

    this.state = {
      color,
      date: moment(),
      remark,
      focusedInput: null
    }
  }

  updateColor(event) {
    this.setState({ color: event.target.value })
    console.log(this.state.date)
  }

  updateRemark(event) { this.setState({ remark: this.refs.remark.value }) }

  // updateEndDate(event) { this.setState({ endDate: this.refs.endDate.value }) }

  saveEval() { this.props.save(this.state, this.props.id) }

  render() {
    return (
      <div className="card newEval">
        <div className="card-content">
          <div className="field">
            <div className="control">
              <label className="radio">
                <input type="radio" value="1" name="green" checked={this.state.color === '1'}  onChange={this.updateColor.bind(this)} />
                Green
              </label>
              <label className="radio">
                <input type="radio" value="2" name="orange" checked={this.state.color === '2'}  onChange={this.updateColor.bind(this)} />
                Orange
              </label>
              <label className="radio">
                <input type="radio" value="3" name="red" checked={this.state.color === '3'}  onChange={this.updateColor.bind(this)} />
                Red
              </label>
            </div>
          </div>
          <label className="label">Date</label>
          <SingleDatePicker
            block
            displayFormat="DD MMM YYYY"
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          />
          <label className="label">Remark</label>
          <textarea ref="remark" onChange={this.updateRemark.bind(this)} style={{ marginBottom: '.75rem' }} className="textarea"></textarea>
          <div className="control">
            <button style={{ width: '100%' }} className="button is-primary" onClick={this.saveEval.bind(this)}>Create evaluation</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createEval }

export default connect(null, mapDispatchToProps)(NewEval)