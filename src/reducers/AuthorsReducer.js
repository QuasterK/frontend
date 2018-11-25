const initState = {
    authors: {},
    authorsArray: [],
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

        default:
            return state;
    }

};

export default AuthorsReducer;