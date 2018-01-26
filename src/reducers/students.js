import { CREATED_STUDENT, FETCHED_ONE_STUDENT, UPDATED_STUDENT, DELETED_STUDENT } from  '../actions/students'
import { UPDATED_STUDENT_EVALS, ADDED_STUDENT_EVAL } from  '../actions/evaluations'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ONE_STUDENT :
      return [payload].concat(state)
    
    case CREATED_STUDENT :
      return [payload].concat(state)

    case UPDATED_STUDENT :
      const newState = state.map(s => {
        if (s._id.toString() === payload._id) {
          return { ...s, ...payload }
        }
        return s
      })
      return newState

    case ADDED_STUDENT_EVAL :
      const naState = state.map(s => {
        if (s._id.toString() === payload.studentId.toString()) {
          const newStudent = {
            ...s,
            evaluationIds: [payload.body].concat(s.evaluationIds),
            lastEvaluation: payload.body.color
          }
          return newStudent
        }
        return s
      })
      return naState

    case UPDATED_STUDENT_EVALS :
      const nState = state.map(s => {
        if (s._id.toString() === payload.studentId.toString()) {
          const newEvalIds = s.evaluationIds.map(ev => {
            if (ev._id.toString() === payload.nEval._id.toString()) {
              const { nEval } = payload
              return { ...ev, ...nEval }
            }
            return ev
          })
          const newClass = {
            ...s,
            evaluationIds: newEvalIds,
            lastEvaluation: payload.nEval.color
          }
          return newClass
        }
        return s
      })
      return nState

    case DELETED_STUDENT :
      const deletedState = state.map(s => {
        if (s._id.toString() === payload._id) {
          return null
        }
        return s
      })
      return deletedState

    default :
      return state
  }
}
