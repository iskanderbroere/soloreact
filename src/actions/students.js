import ApiClient from '../api/client'
import { loading, loadError } from './loading'

export const CREATED_STUDENT = 'CREATED_STUDENT'
export const UPDATED_CLASS = 'UPDATED_CLASS'

const api = new ApiClient()

export const createStudent = (newStudent, batchNumber) => {
  return dispatch => {
    const path = 'classes/' + batchNumber + '/students'
    dispatch(loading(path, true))
    api.post(path, newStudent)
      .then(res => {
        // console.log('res', {...res, batchNumber: batchNumber})
        dispatch({ type: UPDATED_CLASS, payload: { ...res, batchNumber } })
        dispatch({ type: CREATED_STUDENT, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}