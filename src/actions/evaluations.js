import ApiClient from '../api/client'
import { push } from 'react-router-redux'
import { loading, loadError } from './loading'

export const CREATED_EVAL = 'CREATED_EVAL'

const api = new ApiClient()

export const createEval = (newEval, studentId) => {
  return dispatch => {
    const path = 'students/' + studentId + '/evaluations'
    dispatch(loading(path, true))
    api.post(path, newEval)
      .then(res => {
        console.log(res)
        dispatch({ type: CREATED_EVAL, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}