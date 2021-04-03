const SET_SEARCHE_TEXT = "SET_SEARCHE_TEXT";
const SET_SEARCHED_DATA = "SET_SEARCHED_DATA";

export function search(state, action) {
  switch (action.type) {
    case SET_SEARCHED_DATA:
      return { ...state, searchedData: action.payload };
    case SET_SEARCHE_TEXT:
      return { ...state, searchedText: action.payload };
    default:
      return state;
  }
}

const createActionCreator = type => (payload) => {
  return {
    type,
    payload,
  }
}

export const setSearchedData = createActionCreator(SET_SEARCHED_DATA)
export const setSearchedText = createActionCreator(SET_SEARCHE_TEXT)


// function addTodo(text) {
//   return {
//     type: ADD_TODO,
//     text
//   }
// }
