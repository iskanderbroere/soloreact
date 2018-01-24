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
        <article class="card ClassItem">
          <div class="card-content">
            <h2 class="title">
            Batch # {batchNumber}
            </h2>
            <div class="content">
              <time>{ format(startDate, 'D MMMM YYYY') } - { format(endDate, 'D MMMM YYYY') }</time>
            </div>
          </div>
        </article>
      </Link>
    )
  }
}

export default ClassItem
