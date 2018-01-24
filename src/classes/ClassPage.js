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
            <h2 className="card-header-title is-size-5" style={{ textAlign: 'left' }} >
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
    const { _id, batchNumber, studentIds } = this.props
    
    if (!_id) return null

    return (
      <div className="classPage container is-fluid">
        <h2 style={{ marginBottom: '20px' }}>Batch # {batchNumber}</h2>
        
        <ul className="studentList">
          <NewStudent batchNumber={batchNumber} />
          {studentIds.map((student, i) => this.renderStudent(student, i, batchNumber))}
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