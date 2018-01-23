import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../actions/students'
import './NewStudent.css'

class NewStudent extends PureComponent {
  constructor(props) {
    super()

    const { fullName, picUrl } = props

    this.state = {
      fullName,
      picUrl
    }
  }

  updateFullName(event) { this.setState({ fullName: this.refs.fullName.value }) }

  updatePicUrl(event) { this.setState({ picUrl: this.refs.picUrl.value }) }

  saveStudent() { this.props.save(this.state, this.props.batchNumber) }

  render() {
    return (
      <div className="newStudent">
        <h1>Add student</h1>
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

        <button className="primary" onClick={this.saveStudent.bind(this)}>Create class</button>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createStudent }

export default connect(null, mapDispatchToProps)(NewStudent)