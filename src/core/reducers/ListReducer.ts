import {ERROR_REQUEST, RECEIVE_LIST, REQUEST_LIST, ADD_ITEM, ADDED_ITEM, ADDED_ITEM_FAIL, EDIT_ITEM, EDITED_ITEM, EDITED_ITEM_FAIL} from '../actions/ListAction'
export default function ListReducer(
    state = {},
    action: any
  ) {
    switch (action.type) {
      case REQUEST_LIST:
        return state;
      case RECEIVE_LIST:
        return {...state, list: action.list}
      case ERROR_REQUEST:
        return state;
      case ADD_ITEM:
        return state;
      case ADDED_ITEM:
        return state;
      case ADDED_ITEM_FAIL:
        return state;
      case EDIT_ITEM:
      case EDITED_ITEM:
      case EDITED_ITEM_FAIL:
      default:
        return state;
    }
  }