const initState = {
    //object with name and words
    stats: [],
    //number of authors to display stats
    numOfAuthors: 0,
    //words used by first author
    words: [],
    //words used by second and next authors
    wordsNextAuthor: [],
    //sum of words used by all selected authors
    wordsSum: [],


};

const StatsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_STATS':
            return {
                ...state,
            };
        case 'STATS_FETCH_SUCCEEDED':
            //get stats for chosed author
            let stats = action.getStats;

            //increase number of authors
            let currNumOfAuthors = state.numOfAuthors;
            currNumOfAuthors ++;

            return {
                ...state,
                stats: stats,
                numOfAuthors: currNumOfAuthors,

            };
        case 'CREATE_ARRAY_OF_WORDS':{
            return{
                ...state,
                words: action.obj,

            }
        }
        case 'CREATE_NEXT_ARRAY_OF_WORDS':{
            return{
                ...state,
                wordsNextAuthor: action.words
            }
        }
        case 'SUM_WORDS':{
            return{
                ...state,
                wordsSum: action.words
            }
        }
        default:
            return state;
    }

};

export default StatsReducer;