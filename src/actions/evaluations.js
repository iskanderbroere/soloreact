import ApiClient from '../api/client'
import { loading, loadError } from './loading'

export const UPDATED_STUDENT_EVALS = 'UPDATED_STUDENT_EVALS'
export const ADDED_STUDENT_EVAL = 'ADDED_STUDENT_EVAL'

const api = new ApiClient()

export const createEval = (newEval, studentId) => {
  return dispatch => {
    const path = 'students/' + studentId + '/evaluations'
    dispatch(loading(path, true))
    api.post(path, newEval)
      .then(res => {
        dispatch({ type: ADDED_STUDENT_EVAL, payload: { ...res, studentId } })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const updateEvalById = (updatedEval, evalId, studentId) => {
  return dispatch => {
    const path = 'evaluations/' + evalId
    dispatch(loading(path, true))
    api.put(path, updatedEval)
      .then((res) => {
        dispatch({ type: UPDATED_STUDENT_EVALS, payload: { nEval: res.body, studentId } })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}