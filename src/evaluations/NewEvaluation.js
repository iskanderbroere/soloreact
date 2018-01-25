import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import { createEval } from '../actions/evaluations'
import './NewEval.css'

class NewEval extends PureComponent {
  constructor(props) {
    super()

    const { color, date, remark } = props

    this.state = {
      color,
      date,
      remark,
      focusedInput: null
    }
  }

  updateColor(event) {
    console.log(this.state.color)
    this.setState({ color: this.refs.color.value })
    console.log(this.state.color)
  }

  updateRemark(event) { this.setState({ remark: this.refs.remark.value }) }

  // updateEndDate(event) { this.setState({ endDate: this.refs.endDate.value }) }

  saveEval() { this.props.save(this.state, this.props.id) }

  render() {
    return (
      <div className="card newEval">
        <div className="card-content">
          <div className="control">
            <input type="radio" name="rsvp" onChange={this.updateColor.bind(this)} />
            <input type="radio" name="rsvp" />
            <input type="radio" name="rsvp" />
          </div>
          <div className="field">
            <div className="control">
              <input required
                className="input"
                type="number"
                ref="color"
                placeholder="Batch Number"
                defaultValue={this.state.color}
                onChange={this.updateColor.bind(this)}
                onKeyUp={this.updateColor.bind(this)} />
            </div>
          </div>
          <SingleDatePicker
            block
            displayFormat="DD MMM YYYY"
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          />
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