import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../scss/Authors.scss';

class Authors extends Component {

    showListOfAuthors = () => {
        //send req to api to get list of authors
        this.props.getAuthors();
    };

    chooseAuthor = id => {
        //send id to fetch data from api
        this.props.getStats(id)
            .then(() =>this.props.increaseNumOfAuthors(1))
            .then(() => this.props.calc(true))
    };

    render() {
        //array of object with name and key
        let authors = this.props.authorsArray;
        //creating array of authors to choose
        let showAuthors = authors.map( (author,i) => {
            return (
                <div key={i} className='li'>
                    <span>{i +1} </span>
                    {author.name}
                    <span onClick={() => {this.chooseAuthor(author.key)}}>X</span>
                </div>
            )
        });

        return (
            <div>
                <button onClick={this.showListOfAuthors}>List of Authors</button>
                <div className='Authors'>
                    {showAuthors}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        authorsArray: state.authors.authorsArray,
        numOfAuthors: state.authors.numOfAuthors
    }
};

const mapDispatchToState = dispatch =>{
    return {
        getAuthors: () => {
            (dispatch({type:'GET_AUTHORS'}));
            return Promise.resolve()
        },
        getStats: (id) => {
            (dispatch({type:'GET_STATS', id: id}));
            return Promise.resolve()
        },
        calc: (calc) =>{
            dispatch({type: 'CALC_SUM', calc:calc})
        },
        increaseNumOfAuthors: (increase) => {
            (dispatch({type:'INCREASE_NUM_OF_AUTHORS', increase}));
            return Promise.resolve()
        },
    }
};
export default connect(mapStateToProps, mapDispatchToState)(Authors);