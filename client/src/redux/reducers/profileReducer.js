import { PROFILE_TYPES } from "../actions/profileAction";
import { EditData } from "../actions/globalTypes";

const initialState = {
  loading: false,
  ids: [],
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
    // ---------------Get id Reducer-----------------------------
    case PROFILE_TYPES.GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    // ---------------Get posts Reducer-----------------------------
    case PROFILE_TYPES.GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    // ---------------Get posts Reducer-----------------------------
    case PROFILE_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };
    // ---------------Default Reducer-----------------------------
    default:
      return state;
  }
};

export default profileReducer;
