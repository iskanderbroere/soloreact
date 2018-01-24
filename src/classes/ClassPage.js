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
      <li 
        key={i}>
        <article className="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-50x50">
                  <div className="studentColor" style={{ backgroundColor: bgcolor(student.lastEvaluation) }}></div>
                </figure>
              </div>
              <div class="media-content">
                <h2 class="is-4" style={{ color: '#363636', 'font-size': '2rem' }}>
                  <Link to={'/classes/' + batchNumber + '/students/' + student._id}>
                    {student.fullName}
                  </Link>
                </h2>
              </div>
            </div>
            <div class="content">
              <img style={{ borderRadius: '50%', marginTop: '10px', maxWidth: '200px' }} src={ student.picUrl ? student.picUrl : 'https://api.adorable.io/avatars/200/'} />
            </div>
          </div>
        </article>
      </li>
    )
  }

  render() {
    const { _id, batchNumber, studentIds } = this.props
    
    if (!_id) return null

    return (
      <div className="classPage">
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