import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import './RandomStudent.css'

export class RandomStudent extends PureComponent {
  static propTypes = {
    modal: PropTypes.bool,
    fullName: PropTypes.string
  }
  
  render() {
    const { _id, fullName, modal } = this.props

    // if (!_id) return null

    return (
      <div className={"modal is-active" + modal ? "is-active" : ""}>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{fullName}</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}

export default (RandomStudent)