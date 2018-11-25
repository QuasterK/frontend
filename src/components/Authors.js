import React, { Component } from 'react';
import {connect} from 'react-redux';

class Authors extends Component {

    showListOfAuthors = () => {
        //send req to api to get list of authors
        this.props.getAuthors();
    };

    chooseAuthor = id => {
        //send id to fetch data from api
        this.props.getStats(id)
            .then(this.props.calc(true))
    };

    render() {
        //array of object with name and key
        let authors = this.props.authorsArray;
        console.log(authors)
        //creating array of authors to choose
        let showAuthors = authors.map( (author,i) => {
            return (
                <div key={i}>
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
        }
    }
};
export default connect(mapStateToProps, mapDispatchToState)(Authors);