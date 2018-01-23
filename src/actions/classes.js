import ApiClient from '../api/client'
import { loading, loadError } from './loading'

export const FETCHED_CLASSES = 'FETCHED_CLASSES'
export const FETCHED_ONE_CLASS = 'FETCHED_ONE_CLASS'
export const CREATED_CLASS = 'CREATED_CLASS'

const api = new ApiClient()

export const fetchClasses = () => {
  return dispatch => {
    const path = 'classes'
    dispatch(loading(path, true))

    api.get(path)
      .then(res => dispatch({ type: FETCHED_CLASSES, payload: res.body }))
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const createClass = (newClass) => {
  return dispatch => {
    const path = 'classes'
    dispatch(loading(path, true))
    api.post(path, newClass)
      .then(res => dispatch({ type: CREATED_CLASS, payload: res.body }))
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}

export const fetchClassByBatchNumber = (bn) => {
  return dispatch => {
    const path = `classes/${bn}`
    dispatch(loading(path, true))

    api.get(path)
      .then((res) => {
        dispatch({ type: FETCHED_ONE_CLASS, payload: res.body })
      })
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}