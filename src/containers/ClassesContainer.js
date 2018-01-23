import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ClassItem, { classShape } from '../classes/ClassItem'
import NewClass from '../classes/NewClass'
import { fetchClasses } from '../actions/classes'
import './ClassesContainer.css'

class ClassesContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.arrayOf(classShape).isRequired,
  }

  componentWillMount() {
    //this.props.dispatch(fetchClasses())
    this.props.fetch() // see mapDispatchToProps below
  }

  renderClass = (c, i) => {
    return <ClassItem className="ClassItem" key={i} { ...c } />
  }

  render() {
    return (   
      <main className="ClassContainer">
        {this.props.classes.map((this.renderClass))}
        <NewClass />
      </main>
    )
  }
}

const mapStateToProps = ({ classes }) => ({ classes })
const mapDispatchToProps = { fetch: fetchClasses }

// Same as:
// const mapStoreToProps = (store) => {
//   return { classes: store.classes }
// }

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer)