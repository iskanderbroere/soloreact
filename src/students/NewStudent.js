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
      <div className="card newStudent">
        <header className="card-header" style={{ color: '#363636', fontSize: '2rem', minHeight: '80px' }}>
          <h2 className="card-header-title is-size-5">
          Add student
          </h2>
        </header>
        <div className="card-content">
          <div className="field">
          <label className="label">Student name</label>
            <div className="control">
              <input required
                className="input"
                type="text"
                ref="fullName"
                placeholder="Full name"
                defaultValue={this.state.fullName}
                onChange={this.updateFullName.bind(this)}
                onKeyUp={this.updateFullName.bind(this)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Picture url</label>
            <div className="control">
              <input required
                className="input"
                type="text"
                ref="picUrl"
                placeholder="Profile picture url"
                defaultValue={'https://api.adorable.io/avatars/200/'}
                onChange={this.updatePicUrl.bind(this)}
                onKeyUp={this.updatePicUrl.bind(this)} />
            </div>
          </div>
          <div className="control">
            <button style={{ width: '100%' }} className="button is-primary" onClick={this.saveStudent.bind(this)}>Create student</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createStudent }

export default connect(null, mapDispatchToProps)(NewStudent)