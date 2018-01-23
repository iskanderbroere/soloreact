import { CREATED_STUDENT, FETCHED_ONE_STUDENT, UPDATED_STUDENT } from  '../actions/students'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    // case FETCHED_STUDENTS :
    //   return payload.slice()

    case FETCHED_ONE_STUDENT :
      return [payload].concat(state)
    
    case CREATED_STUDENT :
      return [payload].concat(state)

    case UPDATED_STUDENT :
      const newState = state.map(s => {
        if (s._id.toString() === payload._id) {
          // console.log({ ...s, ...payload })
          return { ...s, ...payload }
        }
        return s
      })
      return newState

    default :
      return state
  }
}
