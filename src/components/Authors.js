import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../scss/Authors.scss';

class Authors extends Component {

    showListOfAuthors = () => {
        //send req to api to get list of authors
        this.props.getAuthors();
    };

    chooseAuthor = (e, id, name) => {
        //send id to fetch data from api
        this.props.getStats(id)
            //increasing number of chosen authors
            .then(() =>this.props.increaseNumOfAuthors(1))
            //sending info that req calculate sum of words
            .then(() => this.props.calc(true))
            //adding name of chosen author to array
            .then(() => this.props.chooseAuthor(name))
            //deactivate chosen author button
            .then(() => {
                if(name === 'All Authors'){
                    this.props.deactivate(false)
                }else{
                    console.log(name);
                    this.props.deleteAuthorFromList(name);
                    this.props.deactivateAllButton('All Authors')
                }
            })
    };

    //reset selected options and restore initial states
    handleReset = () => {
        this.props.reset(false);
    };
    render() {

        //array of object with name and key
        let authors = this.props.authorsArray;
        //creating array of authors to choose
        let showAuthors = authors.map( (author,i) => {
            return (
                <div key={i} className={this.props.active === true ? 'author' : 'deactivate'} onClick={(e) => {this.chooseAuthor(e,author.key, author.name)}}>
                    {author.name}
                </div>
            )
        });
        let chosenAuthors = this.props.chosenAuthor;
        let showChosenAuthors;
        if(this.props.chosenAuthor !== null) {
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