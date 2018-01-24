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
    const bgcolor = (e) => { 
      if (e === 0) { 
        return 'red' 
      } else if (e === 1) {
        return 'red'
      } else if (e === 2) {
        return 'orange'
      } 
      return 'limegreen'
    }
    if (!_id) return null

    return (
      <div className="classPage">
        <h1>Batch # {batchNumber}</h1>
        <NewStudent batchNumber={batchNumber} />
        <ul className="studentList">
          {studentIds.map((student, i) => <li style={{ backgroundColor: bgcolor(student.lastEvaluation) }} className="studentItem" key={i}><Link to={'/classes/' + batchNumber + '/students/' + student._id}>{student.fullName} - {student._id} - {student.lastEvaluation}</Link></li>)}
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