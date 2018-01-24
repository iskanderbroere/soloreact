import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NewStudent from '../students/NewStudent'
import { fetchClassByBatchNumber } from '../actions/classes'
import { askQuestion } from '../actions/students'
import './ClassPage.css'

export class ClassPage extends PureComponent {
  constructor(props) {
    super()

    const { modal } = props

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
        return 'tomato' 
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
    console.log(this.props)
    const { _id, batchNumber, studentIds } = this.props
    
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
          <h2 style={{ marginBottom: '20px' }}>Batch # {batchNumber}</h2>
          <button className="button is-primary is-outlined is-large"
            style={{ marginBottom: '20px' }}
            onClick={this.askQuestion.bind(this)}>
            Ask a question!
          </button>
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