import React, {Component} from 'react';
import {connect} from 'react-redux';

class Stats extends Component {
    componentDidUpdate(){
        if (this.props.numOfAuthors > 0) {
            if (this.props.numOfAuthors === 1 && this.props.shouldCalcSum === true) {
                this.props.createArrayOfWords(this.props.stats.words)
                    .then(this.props.calcSumBoolean(false))
                    .then(this.props.sumWords(this.props.stats.words))
            }
            if(this.props.numOfAuthors > 1 && this.props.shouldCalcSum === true) {
                let newSum = {};
                this.props.nextAuthorsWords(this.props.stats.words)
                    .then(() => {
                        let newAuthorsWords = this.props.wordsNextAuthor;
                        let prevSum = this.props.sumOfWords;

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
        console.log(this.props.stats)
        let stats = this.props.sumOfWords;
        let arrayOfStats =[];
        for(let key in stats){
            arrayOfStats.push({[key]: stats[key]})
        }

        let num =0;
        let showStats = arrayOfStats.map(elem => {
            let key = Object.keys(elem)
            let value = Object.values(elem)
            num++;
            return <div key={Math.random()}>
                <span>{num}. </span>
                <span>{key}: </span>
                <span>{value}</span>
            </div>
        })
        return (
            <div>
                <div className='Stats'>
                    {showStats}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stats: state.stats.stats,
        numOfAuthors: state.stats.numOfAuthors,
        wordsToDisplay: state.stats.words,
        wordsNextAuthor: state.stats.wordsNextAuthor,
        sumOfWords: state.stats.wordsSum,
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
        nextAuthorsWords: (words) => {
            dispatch({type: 'CREATE_NEXT_ARRAY_OF_WORDS', words: words});
            return Promise.resolve()
        },
        sumWords: (words) => {
            dispatch({type: 'SUM_WORDS', words: words});
            return Promise.resolve()
        },
        calcSumBoolean: (calc) => {
            dispatch({type: 'CALC_SUM', calc});
        }

    }
};
export default connect(mapStateToProps, mapDispatchToState)(Stats);