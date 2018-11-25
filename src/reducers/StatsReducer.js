const initState = {
    //object with name and words
    stats: [],

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
            //get stats for chosen author
            let stats = action.getStats;
            return {
                ...state,
                stats: stats,
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