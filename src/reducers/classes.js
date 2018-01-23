import { FETCHED_CLASSES, FETCHED_ONE_CLASS, CREATED_CLASS } from  '../actions/classes'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_CLASSES :
      return payload.slice()

    case FETCHED_ONE_CLASS :
      return [payload].concat(state)
    
    case CREATED_CLASS :
      return [payload].concat(state)

    default :
      return state
  }
}
