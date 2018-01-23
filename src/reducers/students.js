import { CREATED_STUDENT, FETCHED_ONE_STUDENT } from  '../actions/students'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    // case FETCHED_STUDENTS :
    //   return payload.slice()

    case FETCHED_ONE_STUDENT :
      return [payload].concat(state)
    
     case CREATED_STUDENT :
       return [payload].concat(state)

    default :
      return state
  }
}
