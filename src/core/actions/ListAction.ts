import { Dispatch } from "redux";
import { addItemFb, fetchListFb, removeItemFb, editItemFb } from "../firebase";

export const REQUEST_LIST = '[List] Request';
function requestList() {
  return {
    type: REQUEST_LIST,
  }
}
export const RECEIVE_LIST = '[List] Receive';
function receiveList(list: any) {
  return {
    list,
    type: RECEIVE_LIST,
  }
}
export const ERROR_REQUEST = '[List] Error';
function requestFail() {
  return {
    type: ERROR_REQUEST
  }
}

export function fetchList() {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestList());
    // return fetch(`http://localhost:8084/list?_page=${page}&_limit=${offset}`)
    return fetchListFb()
    // .then(response => response.json())
    .then((response: any) => 
      dispatch(receiveList(response.toJSON()))
    )
    .catch((error: any) => dispatch(requestFail()))
  }
}

export const ADD_ITEM = '[Item] Add';
function addingItem() {
  return {
    type: ADD_ITEM,
  }
}
export const ADDED_ITEM = '[Item] Added';
function addedItem() {
  return {
    type: ADDED_ITEM,
  }
}
export const ADDED_ITEM_FAIL = '[Item] Added fail';
function addedItemFail() {
  return {
    type: ADDED_ITEM_FAIL
  }
}

export function addItem(item: any) {
  return (dispatch: Dispatch<any>) => {
    dispatch(addingItem());
    // return fetch(`http://localhost:8084/list?_page=${page}&_limit=${offset}`)
    return addItemFb(item.title, item.desc, item.src)
    // .then(response => response.json())
    .then((response: any) => {
      dispatch(addedItem());
      dispatch(fetchList());
    }
    )
    .catch((error: any) => dispatch(addedItemFail()))
  }
}

export const REMOVE_ITEM = '[Item] Remove';
function removingItem() {
  return {
    type: REMOVE_ITEM,
  }
}
export const REMOVED_ITEM = '[Item] Removed';
function removedItem() {
  return {
    type: REMOVED_ITEM,
  }
}
export const REMOVED_ITEM_FAIL = '[Item] Removed fail';
function removedItemFail() {
  return {
    type: REMOVED_ITEM_FAIL
  }
}

export function removeItem(key: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch(removingItem());
    // return fetch(`http://localhost:8084/list?_page=${page}&_limit=${offset}`)
    return removeItemFb(key)
    // .then(response => response.json())
    .then((response: any) => {
      dispatch(removedItem());
      dispatch(fetchList());
    }
    )
    .catch((error: any) => dispatch(removedItemFail()))
  }
}

export const EDIT_ITEM = '[Item] Edit';
function edittingItem() {
  return {
    type: EDIT_ITEM,
  }
}
export const EDITED_ITEM = '[Item] Editted';
function edittedItem() {
  return {
    type: EDITED_ITEM,
  }
}
export const EDITED_ITEM_FAIL = '[Item] Removed fail';
function edittedItemFail() {
  return {
    type: EDITED_ITEM_FAIL
  }
}

export function editItem(key: string, item: any) {
  return (dispatch: Dispatch<any>) => {
    dispatch(edittingItem());
    // return fetch(`http://localhost:8084/list?_page=${page}&_limit=${offset}`)
    return editItemFb(key, item)
    // .then(response => response.json())
    .then((response: any) => {
      dispatch(edittedItem());
      dispatch(fetchList());
    }
    )
    .catch((error: any) => dispatch(edittedItemFail()))
  }
}