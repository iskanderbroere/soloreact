import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { bgcolor } from '../classes/ClassPage'
// import './EvalItem.css'

export const evalShape = PropTypes.shape({
  color: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  remark: PropTypes.string
})

class EvalItem extends PureComponent {
  static propTypes = {
    ...evalShape.isRequired
  }

  changeColor(event) {
    console.log(event.target)
  }

  render() {
    const { color, date, remark } = this.props

    return(
      // <Link to={`/classes/${this.props.match.params.batchNumber}/students/${this.props.match.params.id}/evaluations/${this.props._id}`}>
      <article className="card">
      <header className="card-header" style={{ color: '#363636', fontSize: '2rem' }}>
        <p className="card-header-title is-size-6" >
          <time>{ format(date, 'D MMMM YYYY') }</time>
        </p>
        <div className="studentColor" onClick={this.changeColor.bind(this)} style={{ backgroundColor: bgcolor(color), margin: '15px' }}></div>
      </header>
      <div className="card-content">
        <div className="content">{remark}</div>
      </div>
    </article>
        // <article className="card EvalItem" style={{ backgroundColor: bgcolor(color) }}>
        //   <div className="card-content">
        //     <div className="content">
        //       <time>{ format(date, 'D MMMM YYYY') }</time>
        //     </div>
        //   </div>
        // </article>
      // </Link>
    )
  }
}

export default EvalItem
