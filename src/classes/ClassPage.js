import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NewStudent from '../students/NewStudent'
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
    const { _id, batchNumber, studentIds } = this.props

    if (!_id) return null

    return (
      <div className="classPage">
        <h1>Batch # {batchNumber}</h1>
        <ul>
          <li><NewStudent batchNumber={batchNumber} /></li>
          {studentIds.map((student, i) => <li key={i}><Link to={'/classes/' + batchNumber + '/students/' + student._id}>{student.fullName} - {student._id}</Link></li>)}
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