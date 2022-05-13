import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
