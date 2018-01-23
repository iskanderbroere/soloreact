import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStudentById } from '../actions/students'
import './StudentPage.css'

export class StudentPage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.number
  }

  componentWillMount() {
    const { batchNumber, id } = this.props.match.params
    this.props.fetchStudentById(batchNumber, id)
  }

  render() {
    // console.log(this.props)
    const { _id, fullName } = this.props

    if (!_id) return null

    return (
      <div className="classPage">
        {_id}{fullName}
      </div>
    )
  }
}

const mapStateToProps = ({ students }, { match }) => {
  console.log(students)
  console.log(match.params)
  console.log(students)
  const student = students.reduce((prev, next) => {
    if (next._id.toString() === match.params.id) {
      return next
    }
    return prev
  }, {})

  return {
    ...student
  }
}

export default connect(mapStateToProps, { fetchStudentById })(StudentPage)