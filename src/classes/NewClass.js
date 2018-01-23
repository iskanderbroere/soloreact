import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createClass } from '../actions/classes'

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

  updateBatchnumber(event) {
    this.setState({
      batchNumber: this.refs.batchNumber.value
    })
    console.log(this.state.batchNumber)
  }

  saveClass() {
    //console.table(this.state)

    const newClass = {
      ...this.state,
      startDate: '2017-08-22T22:00:00.000Z',
      endDate: '2018-07-03T22:00:00.000Z'
    }

    //console.table(newClass)

    this.props.save(newClass)
  }

  render() {
    return (
      <div className="editor">
        <input
          type="text"
          ref="batchNumber"
          className="batchNumber"
          placeholder="Batch Number"
          defaultValue={this.state.batchNumber}
          onChange={this.updateBatchnumber.bind(this)}
          onKeyUp={this.updateBatchnumber.bind(this)} />

        <div className="actions">
          <button className="primary" onClick={this.saveClass.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createClass }

export default connect(null, mapDispatchToProps)(NewClass)