import { GLOBALTYPES } from "../actions/globalTypes";

const onlineReducer = (state = [], action) => {
  switch (action.payload) {
    case GLOBALTYPES.ONLINE:
      return [...state, action.payload];
    case GLOBALTYPES.OFFLINE:
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default onlineReducer;
