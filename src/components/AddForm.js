import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class AddForm extends React.Component {
    state = {text: ''};

    handleChange = (event) => {
        this.setState({text: event.target.value})
          
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.newNote(nanoid(), this.state.text);
        this.setState({text: ''});
    }

    render() {
        return (
            <form className='add_form' onSubmit={this.handleSubmit}>
                <label className='input_label'>New note</label>
                <div className='text_wrapper'>
                    <textarea className='input_text' name='text' onChange={this.handleChange} value={this.state.text}></textarea>
                    <button className='add_button'>Add</button>
                </div>
            </form>
        )
    }
}

AddForm.propTypes = {
    newNote: PropTypes.func.isRequired,
}