import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../scss/Stats.scss';

class Stats extends Component {
    componentWillUpdate(){
        const {getNumOfAuthors, shouldCalcSum, createArrayOfWords, getStats, calcSumBoolean, sumWords, createNextAuthorsWords, getSumOfWords} = this.props;
        //creating array of words used by author and calculate sum of words used by more than one author
        if (getNumOfAuthors > 0) {
            if (getNumOfAuthors === 1 && shouldCalcSum === true) {
                createArrayOfWords(getStats.words)
                    .then(() => calcSumBoolean(false))
                    .then(() => sumWords(getStats.words))
            }
            //chosen more than one author
            if(getNumOfAuthors > 1 && shouldCalcSum === true) {
                let newSum = {};

                createNextAuthorsWords(getStats.words)
                    .then(() => {
                        let newAuthorsWords = this.props.getWordsNextAuthor;
                        let prevSum = getSumOfWords;

                        // eslint-disable-next-line
                        const filter = Object.keys(prevSum)
                            .filter(key => {
                                return newSum[key] = prevSum[key] + newAuthorsWords[key]
                            });
                    })
                    .then(this.props.calcSumBoolean(false))
                    .then(() => this.props.sumWords(newSum))
            }
        }
    }
    render() {
        const {getSumOfWords} = this.props;
        //creating array of words used by chosen authors, to display them in table
        let stats = getSumOfWords;
        let arrayOfStats =[];
        for(let key in stats){
            arrayOfStats.push({[key]: stats[key]})
        }

        let num =0;
        let showStats = arrayOfStats.map(elem => {
            let key = Object.keys(elem);
            let value = Object.values(elem);
            num++;
            return <tr key={Math.random()}>
                <td>{num}</td>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
        });
        return (
            <div>
                <div className='Stats'>
                    <table>
                        <thead>
                        <tr>
                            <td/>
                            <td>WORDS</td>
                            <td>COUNT</td>
                        </tr>
                        </thead>
                        <tbody>
                             {showStats}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getStats: state.stats.stats,
        getNumOfAuthors: state.authors.numOfAuthors,
        getWordsNextAuthor: state.stats.wordsNextAuthor,
        getSumOfWords: state.stats.wordsSum,
        shouldCalcSum: state.calc.calc
    }
};

const mapDispatchToState = dispatch => {
    return {
        //create array of words used by first author
        createArrayOfWords: (words) => {
            dispatch({type: 'CREATE_ARRAY_OF_WORDS', obj: words});
            return Promise.resolve()
        },
        //array of words used by second and next author, necessary to calculate sum of words
        createNextAuthorsWords: (words) => {
            dispatch({type: 'CREATE_NEXT_ARRAY_OF_WORDS', words: words});
            return Promise.resolve()
        },
        //sum of words used by authors
        sumWords: (words) => {
            dispatch({type: 'SUM_WORDS', words: words});
            return Promise.resolve()
        },
        //boolean to check if client chosen another author
        calcSumBoolean: (calc) => {
            dispatch({type: 'CALC_SUM', calc});
        }

    }
};
export default connect(mapStateToProps, mapDispatchToState)(Stats);