const initState = {
    authors: {},
    authorsArray: [],
    numOfAuthors: 0,
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

            let newAuthorsArray = [];
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
        default:
            return state;
    }

};

export default AuthorsReducer;