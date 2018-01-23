import ApiClient from '../api/client'
import { loading, loadError } from './loading'

export const FETCHED_STUDENTS = 'FETCHED_STUDENTS'

const api = new ApiClient()

export const fetchStudentsInClass = (batchNumber) => {
  return dispatch => {
    const path = 'classes/' + batchNumber + '/students'
    dispatch(loading(path, true))

    api.get(path)
      .then(res => dispatch({ type: FETCHED_STUDENTS, payload: res.body }))
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}