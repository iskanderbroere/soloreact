import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
// import ClassCategory from './ClassCategory'
import './ClassItem.css'

export const classShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  batchNumber: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired
})

class ClassItem extends PureComponent {
  static propTypes = {
    ...classShape.isRequired
  }

  render() {
    const { _id, startDate, endDate, batchNumber } = this.props

    return(
      <Link to={`/classes/${_id}`}>
        <article className="ClassItem">
          <header>
            <h1>{batchNumber}</h1>
          </header>
            <p>{ format(startDate, 'd MMMM YYYY') } - { format(endDate, 'd MMMM YYYY') }</p>
        </article>
      </Link>
    )
  }
}

export default ClassItem
