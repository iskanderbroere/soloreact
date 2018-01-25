import { FETCHED_CLASSES, FETCHED_ONE_CLASS, CREATED_CLASS } from  '../actions/classes'
import { UPDATED_CLASS_STUDENTS } from  '../actions/students'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_CLASSES :
      return payload.slice()

    case FETCHED_ONE_CLASS :
      const ids = state.map(c => c._id)
      if (!ids.includes(payload._id)) return [payload].concat(state)
      return state.map((c) => {
        if (c._id === payload._id) {
          return { ...payload }
        }
        return c
      })
    
    case CREATED_CLASS :
      return [payload].concat(state)
    
    case UPDATED_CLASS_STUDENTS :   
      const newState = state.map(c => {
        if (c.batchNumber.toString() === payload.batchNumber.toString()) {
          const newClass = {
            ...c,
            studentIds: c.studentIds.concat([payload.body])
          }
          return newClass
        }
        return c
      })
      return newState

    default :
      return state
  }
}
