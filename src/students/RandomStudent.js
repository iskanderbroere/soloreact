import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStudentById, updateStudentById, deleteStudentById } from '../actions/students'
import './StudentPage.css'

export class StudentPage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    fullName: PropTypes.string
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchStudentById(id)
  }

  render() {
    const { _id, fullName } = this.props

    if (!_id) return null

    return (
      <div className="studentPage">
        <h1>{fullName}</h1>
        <code>{_id}</code>

      </div>
    )
  }
}

const mapStateToProps = ({ students }, { match }) => {
  const student = students.reduce((prev, next) => {
    // this may be buggy
    if (!next) return students[0]
    if (next._id.toString() === match.params.id) {
      return next
    }
    return prev
  }, {})

  return {
    ...student
  }
}

export default connect(mapStateToProps)(StudentPage)