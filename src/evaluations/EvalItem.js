import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
// import './EvalItem.css'

export const evalShape = PropTypes.shape({
  color: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  remark: PropTypes.string
})

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

class EvalItem extends PureComponent {
  static propTypes = {
    ...evalShape.isRequired
  }

  render() {
    const { color, date, remark } = this.props

    return(
      // <Link to={`/classes/${this.props.match.params.batchNumber}/students/${this.props.match.params.id}/evaluations/${this.props._id}`}>
        <article className="card EvalItem" style={{ backgroundColor: bgcolor(color) }}>
          <div className="card-content">
            <div className="content">
              <time>{ format(date, 'D MMMM YYYY') }</time>
            </div>
          </div>
        </article>
      // </Link>
    )
  }
}

export default EvalItem
