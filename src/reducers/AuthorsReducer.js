
const initState = {
    authors: null,

};

const AuthorsReducer = (state= initState, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return{
                ...state,
            };
        case 'AUTHOR_FETCH_SUCCEEDED':
            let authors = action.getAuthors;
            let authorsArray = [];
            for (const key in authors){
                if(authors.hasOwnProperty(key)){
                    authorsArray.push(authors[key])
                }
            }

            return{
                ...state,
                authors: authorsArray,
            };
        default:
            return state;
    }

};

export default AuthorsReducer;