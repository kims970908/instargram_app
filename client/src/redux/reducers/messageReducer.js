import { MESS_TYPES } from "../actions/messageAction";

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPES.ADD_USER:
      if (state.users.every((item) => item._id !== action.payload._id)) {
        return {
          ...state,
          users: [action.payload, ...state.users],
        };
      }
      return state;
    // case MESS_TYPES.ADD_MESSAGE:
    //   return {
    //     ...state,
    //     data: state.data.map((item) =>
    //       item._id === action.payload.recipient ||
    //       item._id === action.payload.sender
    //         ? {
    //             ...item,
    //             messages: [...item.messages, action.payload],
    //             result: item.result + 1,
    //           }
    //         : item
    //     ),
    //     users: state.users.map((user) =>
    //       user._id === action.payload.recipient ||
    //       user._id === action.payload.sender
    //         ? {
    //             ...user,
    //             text: action.payload.text,
    //             media: action.payload.media,
    //             call: action.payload.call,
    //           }
    //         : user
    //     ),
    //   };
    case MESS_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
                media: action.payload.media,
              }
            : user
        ),
      };
    case MESS_TYPES.GET_CONVERSATIONS:
      return {
        ...state,
        user: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      };
    case MESS_TYPES.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
        resultUsers: action.payload.result,
      };
    default:
      return state;
  }
};

export default messageReducer;
