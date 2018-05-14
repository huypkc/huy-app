import * as NASA_ACTION from '../actions/NasaAction';
export default function NasaReducer(
    state = {},
    action: any
  ) {
    switch (action.type) {
      case NASA_ACTION.NASA_REQUEST_LIST:
        return state;
      case NASA_ACTION.NASA_RECEIVE_LIST:
        return {...state, list: action.list}
      case NASA_ACTION.NASA_ERROR_REQUEST:
        return state;
      default:
        return state;
    }
  }