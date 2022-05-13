import { PROFILE_TYPES } from "../actions/profileAction";
import { EditData } from "../actions/globalTypes";

const initialState = {
  loading: false,
  users: [],
  posts: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---------------Loaing Reducer-----------------------------
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    // ---------------User Get Reducer-----------------------------
    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    // ---------------Follw Reducer-----------------------------
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    // ---------------Unfollow Reducer-----------------------------
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    // ---------------Default Reducer-----------------------------
    default:
      return state;
  }
};

export default profileReducer;
