import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
// import ClassCategory from './ClassCategory'
import './ClassItem.css'

export const classShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  batchNumber: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
})

class ClassItem extends PureComponent {
  static propTypes = {
    ...classShape.isRequired
  }

  render() {
    const { startDate, endDate, batchNumber } = this.props

    return(
      <Link to={`/classes/${batchNumber}`}>
        <article className="ClassItem">
          <header>
            <h1>Batch # {batchNumber}</h1>
          </header>
            <p>{ format(startDate, 'D MMMM YYYY') } - { format(endDate, 'D MMMM YYYY') }</p>
        </article>
      </Link>
    )
  }
}

export default ClassItem
