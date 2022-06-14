import { SUGGES_TYPES } from "../actions/suggestionsAction";

const initalState = {
  loading: false,
  users: [],
};

const suggestionsReducer = (state = initalState, action) => {
  switch (action.type) {
    case SUGGES_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGES_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};

export default suggestionsReducer;
