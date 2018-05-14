import { Dispatch } from "redux";

const NASA_API = 'https://images-api.nasa.gov';

export const NASA_REQUEST_LIST = '[Nasa] Request';
function requestList() {
  return {
    type: NASA_REQUEST_LIST,
  }
}
export const NASA_RECEIVE_LIST = '[Nasa] Receive';
function receiveList(list: any) {
  return {
    list,
    type: NASA_RECEIVE_LIST,
  }
}
export const NASA_ERROR_REQUEST = '[Nasa] Error';
function requestFail() {
  return {
    type: NASA_ERROR_REQUEST
  }
}

export function fetchListNasa(query: string = '') {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestList());
    return fetch(`${NASA_API}/search?q=${query}`)
      .then((response: any) =>
        response.json()
      )
      .then((response: any) =>
        dispatch(receiveList(response.collection ? response.collection.items.slice(0, 5) : []))
      )
      .catch((error: any) => dispatch(requestFail()))
  }
}