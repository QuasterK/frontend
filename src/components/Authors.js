import React, { Component } from 'react';
import {connect} from 'react-redux';

class Authors extends Component {
    handleClick = () => {
        this.props.getAuthors();
        console.log(this.props.authors)
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>klik</button>
                <div className='Authors'>
                    {this.props.authors}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        authors: state.authors.authors
    }
};

const mapDispatchToState = dispatch =>{
    return {
        getAuthors: () => (dispatch({type:'GET_AUTHORS'}))
    }
};
export default connect(mapStateToProps, mapDispatchToState)(Authors);