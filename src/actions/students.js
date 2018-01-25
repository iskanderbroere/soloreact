import ApiClient from '../api/client'
import { push } from 'react-router-redux'
import { loading, loadError } from './loading'

export const CREATED_STUDENT = 'CREATED_STUDENT'
export const UPDATED_STUDENT = 'UPDATED_STUDENT'
export const UPDATED_CLASS = 'UPDATED_CLASS'
export const FETCHED_ONE_STUDENT = 'FETCHED_ONE_STUDENT'
export const DELETED_STUDENT = 'DELETED_STUDENT'
export const RANDOM_STUDENT = 'RANDOM_STUDENT'

const api = new ApiClient()

export const createStudent = (newStudent, batchNumber) => {
  return dispatch => {
    const path = 'classes/' + batchNumber + '/students'
    dispatch(loading(path, true))
    api.post(path, newStudent)
      .then(res => {
        dispatch({ type: UPDATED_CLASS, payload: { ...res, batchNumber } })
        dispatch({ type: CREATED_STUDENT, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const fetchStudentById = (id) => {
  return dispatch => {
    const path = 'classes/:batchNumber/students/' + id
    dispatch(loading(path, true))

    api.get(path)
      .then((res) => {
        dispatch({ type: FETCHED_ONE_STUDENT, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const updateStudentById = (id, update) => {
  return dispatch => {
    const path = 'classes/:batchNumber/students/' + id
    dispatch(loading(path, true))
    api.put(path, { id, update })
      .then((res) => {
        dispatch({ type: UPDATED_STUDENT, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const deleteStudentById = (id, bn) => {
  return dispatch => {
    const path = 'classes/:batchNumber/students/' + id
    dispatch(loading(path, true))
    api.delete(path)
      .then((res) => {
        dispatch(push('/classes/' + bn))
        dispatch({ type: DELETED_STUDENT, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const askQuestion = (bn) => {
  return dispatch => {
    const path = 'classes/' + bn + '/students/random'
    dispatch(loading(path, true))
    api.get(path)
      .then(res => {
        dispatch({ type: RANDOM_STUDENT, payload: res.body })
      })
      .catch(err => {
        dispatch(loadError(err))
      })

    dispatch(loading(path, false))
  }
}