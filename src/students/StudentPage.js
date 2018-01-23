import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStudentById, updateStudentById, deleteStudentById } from '../actions/students'
import './StudentPage.css'

export class StudentPage extends PureComponent {
  constructor(props) {
    super()

    const { fullName, picUrl } = props

    this.state = {
      fullName,
      picUrl
    }
  }

  static propTypes = {
    _id: PropTypes.string,
    batchNumber: PropTypes.number,
    fullName: PropTypes.string
  }

  updateFullName(event) { this.setState({ fullName: this.refs.fullName.value }) }

  updatePicUrl(event) { this.setState({ picUrl: this.refs.picUrl.value }) }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.fetchStudentById(id)
  }

  updateStudent() { this.props.save(this.props.match.params.id, this.state) }

  deleteStudent() { this.props.delete(this.props.match.params.id, this.props.match.params.batchNumber) }

  render() {
    const { _id, fullName } = this.props

    if (!_id) return null

    return (
      <div className="studentPage">
        <h1>{fullName}</h1>
        <code>{_id}</code>
        <input required
          type="text"
          ref="fullName"
          className="fullName"
          placeholder="Full name"
          defaultValue={this.state.fullName}
          onChange={this.updateFullName.bind(this)}
          onKeyUp={this.updateFullName.bind(this)} />
          <input required
          type="text"
          ref="picUrl"
          className="picUrl"
          placeholder="Profile picture url"
          defaultValue={this.state.picUrl}
          onChange={this.updatePicUrl.bind(this)}
          onKeyUp={this.updatePicUrl.bind(this)} />

        <button className="primary" onClick={this.updateStudent.bind(this)}>Update student</button>
        <button className="primary" onClick={this.deleteStudent.bind(this)}>Delete student</button>
      </div>
    )
  }
}

const mapStateToProps = ({ students }, { match }) => {
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

export default connect(mapStateToProps, { fetchStudentById, save: updateStudentById, delete: deleteStudentById })(StudentPage)