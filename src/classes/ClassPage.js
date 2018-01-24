import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import differenceInDays from 'date-fns/difference_in_days'
import NewStudent from '../students/NewStudent'
import { fetchClassByBatchNumber } from '../actions/classes'
import { askQuestion } from '../actions/students'
import './ClassPage.css'

export class ClassPage extends PureComponent {
  constructor(props) {
    super()

    this.state = {
      modal: false
    }
  }
  static propTypes = {
    batchNumber: PropTypes.number,
  }

  componentWillMount() {
    this.props.fetchClassByBatchNumber(this.props.match.params.batchNumber)
  }

  askQuestion() {
    this.openRandomModal()
    this.props.askQuestion(this.props.match.params.batchNumber)
  }

  openRandomModal() {
    this.setState({ modal: !this.state.modal })
  }

  renderStudent(student, i, batchNumber) {
    const bgcolor = (e) => { 
      if (e === 0) { 
        return '#e9ecef' 
      } else if (e === 1) {
        return 'red'
      } else if (e === 2) {
        return 'orange'
      } 
      return 'limegreen'
    }

    return (
      <Link key={i} to={'/classes/' + batchNumber + '/students/' + student._id}>
        <li className="studentItem">
          <article className="card studentItem">
          <header className="card-header" style={{ color: '#363636', fontSize: '2rem' }}>
            <h2 className="card-header-title is-size-5" >
            {student.fullName}
            </h2>
            <div className="studentColor" style={{ backgroundColor: bgcolor(student.lastEvaluation), margin: '15px' }}></div>
          </header>
            <div className="card-content">
              <div className="content">
                <img alt="student" style={{ borderRadius: '50%' }} src={ student.picUrl ? student.picUrl : 'https://api.adorable.io/avatars/200/'} />
              </div>
            </div>
          </article>
        </li>
      </Link>
    )
  }

  render() {
    const { studentIds } = this.props

    const greenStudents = (studs) => ((studs.filter(s => s.lastEvaluation === 1)).length / studs.length) * 100
    const orangeStudents = (studs) => ((studs.filter(s => s.lastEvaluation === 2)).length / studs.length) * 100
    const redStudents = (studs) => ((studs.filter(s => s.lastEvaluation === 3)).length / studs.length) * 100
    const grayStudents = (studs) => ((studs.filter(s => s.lastEvaluation === 0)).length / studs.length) * 100

    const { _id, batchNumber, startDate, endDate } = this.props
    if (!_id) return null

    return (
      <div>
        <div className={"modal " + (this.state.modal ? 'is-active' : 'hidden')}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{this.props.randomstudent.fullName}</p>
            </header>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={this.openRandomModal.bind(this)}>Close</button>
            </footer>
          </div>
        </div>
        <div className="classPage container is-fluid">
          <header>
            <h2 style={{ marginBottom: '20px' }}>Batch # {batchNumber}</h2>
            <h3 style={{ marginBottom: '20px' }}>{differenceInDays(endDate, startDate)}</h3>
            <button className="button is-primary is-outlined is-large"
              style={{ marginBottom: '20px' }}
              onClick={this.askQuestion.bind(this)}>
              Ask a question!
            </button>
            <div className="progress" style={{ marginBottom: '20px' }}>
              <div className="progress-bar" role="progressbar" style={{ width: `${greenStudents(studentIds)}%`, backgroundColor: '#23d160' }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
              <div className="progress-bar is-warning" role="progressbar" style={{width: `${orangeStudents(studentIds)}%`, backgroundColor: '#ffdd57'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
              <div className="progress-bar is-danger" role="progressbar" style={{width: `${redStudents(studentIds)}%`, backgroundColor: '#ff3860'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </header>
          <ul className="studentList">
            <NewStudent batchNumber={batchNumber} />
            {studentIds.map((student, i) => this.renderStudent(student, i, batchNumber))}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ classes, randomstudent }, { match }) => {
  const reducedClasses = classes.reduce((prev, next) => {
    if (next.batchNumber.toString() === match.params.batchNumber) {
      return next
    }
    return prev
  }, {})

  return {
    ...reducedClasses,
    randomstudent
  }
}

export default connect(mapStateToProps, { fetchClassByBatchNumber, askQuestion })(ClassPage)