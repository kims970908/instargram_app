import { EditData } from "../actions/globalTypes";
import { NOTIFY_TYPES } from "../actions/notifyActon";

const initialState = {
  loading: false,
  data: [],
  sound: false,
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    //-----------------GET_NOTIFY--------------------------
    case NOTIFY_TYPES.GET_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    //-----------------CREATE_NOTIFY--------------------------
    case NOTIFY_TYPES.CREATE_NOTIFY:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    //-----------------REMOVE_NOTIFY--------------------------
    case NOTIFY_TYPES.REMOVE_NOTIFY:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    //-----------------UPDATE_NOTIFY--------------------------
    case NOTIFY_TYPES.UPDATE_NOTIFY:
      return {
        ...state,
        data: EditData(state.data, action.payload._id, action.payload),
      };
    //-----------------UPDATE_SOUND_NOTIFY--------------------------
    case NOTIFY_TYPES.UPDATE_SOUND:
      return {
        ...state,
        data: action.payload,
      };
    //-----------------DELETE_ALL_NOTIFY--------------------------
    case NOTIFY_TYPES.DELETE_ALL_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default notifyReducer;
