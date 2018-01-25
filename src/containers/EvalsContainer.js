import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EvalItem, { evalShape } from '../evaluations/EvalItem'
import NewEvaluation from '../evaluations/NewEvaluation'
import { createEval } from '../actions/evaluations'
import './EvalsContainer.css'

class EvalsContainer extends PureComponent {
  static propTypes = {
    evals: PropTypes.arrayOf(evalShape).isRequired,
  }

  renderEval = (c, i) => {
    return <EvalItem className="EvalItem" key={c._id} { ...c } />
  }

  render() {
    return (   
      <main className="EvalContainer">
        <NewEvaluation id={this.props.id} evals={this.props.evals}/>
        {this.props.evals.map((this.renderEval))}
      </main>
    )
  }
}

export default connect(null,  { createEval })(EvalsContainer)