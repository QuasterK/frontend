const initState = {
    active: true,
};

const ActiveAuthorsReducer = (state = initState, action) =>{
    if(action.type === 'ACTIVATE'){
      return{
          ...state,
          active: action.active
      }
    }
    return state
};

export default ActiveAuthorsReducer;