import ApiClient from '../api/client'
import { loading, loadError } from './loading'

export const FETCHED_CLASSES = 'FETCHED_CLASSES'
export const FETCHED_ONE_CLASS = 'FETCHED_ONE_CLASS'

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

export const fetchClassById = (id) => {
  return dispatch => {
    const path = `classes/${id}`
    dispatch(loading(path, true))

    api.get(path)
      .then(res => dispatch({ type: FETCHED_ONE_CLASS, payload: res.body }))
      .catch(err => dispatch(loadError(err)))

    dispatch(loading(path, false))
  }
}