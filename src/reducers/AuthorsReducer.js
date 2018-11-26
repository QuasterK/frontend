const initState = {
    authors: {},
    authorsArray: [],
    numOfAuthors: 0,
    chosenAuthors: null,
};

const AuthorsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return {
                ...state,
            };
        case 'AUTHOR_FETCH_SUCCEEDED':

            //creating new object with authors
            let authors = action.getAuthors;

            let newAuthorsArray = [{name: 'All Authors', key: ''}];
            for (let key in authors) {
                if (authors.hasOwnProperty(key)) {
                    newAuthorsArray.push({
                        name: authors[key],
                        key: key,
                    })
                }
            }
            return {
                ...state,
                authors: authors,
                authorsArray:newAuthorsArray,
            };
        case 'INCREASE_NUM_OF_AUTHORS':{
            let prevNum = state.numOfAuthors;
            let newNum = prevNum + action.increase;
            return{
                ...state,
                numOfAuthors: newNum
            }
        }
        case 'CHOOSE_AUTHOR':{
            return{
                ...state,
                chosenAuthors: state.chosenAuthors === null ? [action.chosen] : [...state.chosenAuthors,action.chosen]
            }
        }
        case 'DEACTIVATE_ALL_BUTTON':{
            let authors = state.authorsArray;
            let newAuthorsArray = authors.filter( author => {
                return action.deactivate !== author.name
            });
            return{
                ...state,
                authorsArray: newAuthorsArray,
            }
        }
        case 'DELETE_AUTHOR_FROM_LIST':{
            let authors = state.authorsArray;
            let newAuthorsArray = authors.filter( author => {
                return action.del !== author.name
            });
            return{
                ...state,
                authorsArray: newAuthorsArray,
            }
        }
        default:
            return state;
    }

};

export default AuthorsReducer;