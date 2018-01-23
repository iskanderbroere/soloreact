import ApiClient from '../api/client'
import { loading, loadError } from './loading'

export const CREATED_STUDENT = 'CREATED_STUDENT'
export const UPDATED_CLASS = 'UPDATED_CLASS'
export const FETCHED_ONE_STUDENT = 'FETCHED_ONE_STUDENT'

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

export const fetchStudentById = (bn, id) => {
  return dispatch => {
    const path = 'classes/' + bn + '/students/' + id
    dispatch(loading(path, true))

    api.get(path)
      .then((res) => {
        dispatch({ type: FETCHED_ONE_STUDENT, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}