import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../scss/Authors.scss';

class Authors extends Component {

    showListOfAuthors = () => {
        const {getAuthors} = this.props;
        //send req to api to get list of authors
        getAuthors();
    };

    chooseAuthor = (id, name) => {
        const {getStats, increaseNumOfAuthors, calc, chooseAuthor, deactivate, deleteAuthorFromList, deactivateAllButton} = this.props;
        //send id to fetch data from api
        getStats(id)
            //increasing number of chosen authors
            .then(() => increaseNumOfAuthors(1))
            //sending info that req calculate sum of words
            .then(() => calc(true))
            //adding name of chosen author to array
            .then(() => chooseAuthor(name))
            //deactivate chosen author button
            .then(() => {
                if(name === 'All Authors'){
                    deactivate(false)
                }else{
                    deleteAuthorFromList(name);
                    deactivateAllButton('All Authors')
                }
            })
    };

    //reset selected options and restore initial states
    handleReset = () => {
        const {reset} = this.props;
        reset(false);
    };
    render() {

        const {authorsArray, active, chosenAuthor} = this.props;
        //array of object with name and key
        let authors = authorsArray;
        //creating array of authors to choose
        let showAuthors = authors.map( (author,i) => {
            return (
                <div key={i} className={active === true ? 'author' : 'deactivate'} onClick={() => {this.chooseAuthor(author.key, author.name)}}>
                    {author.name}
                </div>
            )
        });
        let chosenAuthors = chosenAuthor;
        let showChosenAuthors;
        if(chosenAuthor !== null) {
           showChosenAuthors = chosenAuthors.map((author, i) => {
                return <div key={i} className='chosenAuthor'>{author}</div>
            })
        }
        return (
            <div className='authors-container'>
                <div>
                    <div className='button' onClick={this.showListOfAuthors}>List of Authors</div>
                    <div className='Authors'>
                        {showAuthors}
                    </div>
                </div>
                <div>
                    <div className='chosenAuthors'>chosen authors : </div>
                    <div>
                        {showChosenAuthors}
                    </div>
                </div>
                <div>
                <div className='resetButton' onClick={this.handleReset}>RESET ALL</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        authorsArray: state.authors.authorsArray,
        numOfAuthors: state.authors.numOfAuthors,
        chosenAuthor: state.authors.chosenAuthors,
        active: state.active.active,

    }
};

const mapDispatchToState = dispatch =>{
    return {
        getAuthors: () => {
            (dispatch({type:'GET_AUTHORS'}));
            return Promise.resolve()
        },
        getStats: (id) => {
            (dispatch({type:'GET_STATS', id}));
            return Promise.resolve()
        },
        calc: (calc) =>{
            dispatch({type: 'CALC_SUM', calc})
        },
        increaseNumOfAuthors: (increase) => {
            (dispatch({type:'INCREASE_NUM_OF_AUTHORS', increase}));
            return Promise.resolve()
        },
        chooseAuthor: (chosen) => {
            (dispatch({type:'CHOOSE_AUTHOR', chosen}));
            return Promise.resolve()
        },
        reset: () => {
            dispatch({type: "RESET"})},
        deactivate: (active) => {
            dispatch({type: "ACTIVATE", active});
            return Promise.resolve()
        },
        deactivateAllButton: (deactivate) => {
            dispatch({type: "DEACTIVATE_ALL_BUTTON", deactivate});
            return Promise.resolve()
        },
        deleteAuthorFromList: (del) => {
            dispatch({type: "DELETE_AUTHOR_FROM_LIST", del});
            return Promise.resolve()
        },
    }
};
export default connect(mapStateToProps, mapDispatchToState)(Authors);