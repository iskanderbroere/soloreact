import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchClassByBatchNumber } from '../actions/classes'
import './ClassPage.css'

export class ClassPage extends PureComponent {
  static propTypes = {
    batchNumber: PropTypes.number,
  }

  componentWillMount() {
    this.props.fetchClassByBatchNumber(this.props.match.params.batchNumber)
  }

  render() {
    // console.log(this.props)
    const { _id, batchNumber } = this.props

    if (!_id) return null

    return (
      <div className="classPage">
        <h1>Batch # {batchNumber}</h1>
        <ul>
          {this.props.studentIds.map(student => <li key={student._id}>{student._id}</li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ classes }, { match }) => {
  const classy = classes.reduce((prev, next) => {
    if (next.batchNumber.toString() === match.params.batchNumber) {
      return next
    }
    return prev
  }, {})

  return {
    ...classy
  }
}

export default connect(mapStateToProps, { fetchClassByBatchNumber })(ClassPage)