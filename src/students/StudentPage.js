import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bgcolor } from '../classes/ClassPage'
import EvalsContainer from '../containers/EvalsContainer'
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
    const { _id, fullName, picUrl, lastEvaluation, evaluationIds } = this.props

    if (!_id) return null

    return (
      <div className="container is-fluid studentPageContainer">
        <article className="studentPage card" style={{ maxWidth: '500px' }}>
          <header className="card-header" style={{ color: '#363636', fontSize: '2rem' }}>
            <h2 className="card-header-title is-size-5" >
            {fullName}
            </h2>
            <div className="studentColor" style={{ backgroundColor: bgcolor(lastEvaluation), margin: '15px' }}></div>
          </header>
          <div className="card-content">
            <img alt="student" style={{ borderRadius: '50%' }} src={ picUrl ? picUrl : 'https://api.adorable.io/avatars/200/'} />
            <label className="label">Update information</label>
            <input required
              type="text"
              ref="fullName"
              className="input"
              placeholder="Full name"
              style={{ marginBottom: '20px' }}
              defaultValue={this.state.fullName}
              onChange={this.updateFullName.bind(this)}
              onKeyUp={this.updateFullName.bind(this)} />
            <input required
              type="text"
              ref="picUrl"
              className="input"
              placeholder="Profile picture url"
              defaultValue={this.state.picUrl}
              onChange={this.updatePicUrl.bind(this)}
              onKeyUp={this.updatePicUrl.bind(this)} />
            <p className="help">https://api.adorable.io/avatars/200/</p>
          </div>
          <footer className="card-footer">
            <a onClick={this.updateStudent.bind(this)} className="card-footer-item button is-success" style={{ marginRight: '.75rem' }}>
              <span className="icon is-small">
                <i className="fas fa-check"></i>
              </span>
              <span>Save</span>
            </a>
            <a onClick={this.deleteStudent.bind(this)} className="card-footer-item button is-danger" style={{ marginLeft: '.75rem' }}>
              <span>Delete</span>
              <span className="icon is-small">
                <i className="fas fa-times"></i>
              </span>
            </a>
          </footer>
        </article>
        <EvalsContainer evals={evaluationIds} id={_id}/>
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

export default connect(mapStateToProps, { fetchStudentById, save: updateStudentById, delete: deleteStudentById })(StudentPage)