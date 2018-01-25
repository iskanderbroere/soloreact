import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import { createEval, updateEvalById } from '../actions/evaluations'
import './NewEval.css'

class NewEval extends PureComponent {
  constructor(props) {
    super()

    const { remark } = props

    this.state = {
      color: 1,
      date: moment(),
      remark,
      focusedInput: null
    }
  }

  updateColor(event) { this.setState({ color: Number(event.target.value) }) }

  updateRemark(event) { this.setState({ remark: this.refs.remark.value }) }

  evalAlreadyExists(evals, date) {
    const existance = evals.filter(evaluation => {
      return evaluation.date.slice(0, 10) === date._d.toJSON().slice(0, 10)
    })
    if (existance.length > 0) {
      return true
    }
    return false
  }

  evalToUpdate(evals, date) {
    //hackety hack
    return evals.filter(evaluation => { return evaluation.date.slice(0, 10) === date._d.toJSON().slice(0, 10) })[0]._id
  }

  saveEval() { this.props.save(this.state, this.props.id) }

  updateEvalById() { this.props.update(this.state, this.evalToUpdate(this.props.evals, this.state.date), this.props.id) }

  render() {
    return (
      <div className="card newEval">
        <div className="card-content">
          <div className="field">
            <div className="control">
              <label className="radio">
                <input type="radio" value="1" name="green" checked={this.state.color === 1}  onChange={this.updateColor.bind(this)} />
                Green
              </label>
              <label className="radio">
                <input type="radio" value="2" name="orange" checked={this.state.color === 2}  onChange={this.updateColor.bind(this)} />
                Orange
              </label>
              <label className="radio">
                <input type="radio" value="3" name="red" checked={this.state.color === 3}  onChange={this.updateColor.bind(this)} />
                Red
              </label>
            </div>
          </div>
          <label className="label">Date</label>
          <SingleDatePicker
            block
            displayFormat="DD MMM YYYY"
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
          />
          { this.evalAlreadyExists(this.props.evals, this.state.date) && 
            <p style={{ marginBottom: '.25rem' }} className="help is-danger">This date has already been evaluated!</p>
          }
          <label className="label">Remark</label>
          <textarea ref="remark" onChange={this.updateRemark.bind(this)} style={{ marginBottom: '.75rem' }} className="textarea"></textarea>
          <div className="control">
            { this.evalAlreadyExists(this.props.evals, this.state.date) ?
              <button style={{ width: '100%' }} className="button is-warning" onClick={this.updateEvalById.bind(this)}>Update evaluation</button> :
              <button style={{ width: '100%' }} className="button is-primary" onClick={this.saveEval.bind(this)}>Create evaluation</button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { save: createEval, update: updateEvalById })(NewEval)