import React from 'react';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
    render() {
        return (
            <div className='note_box'>
                <div className='delete_wrapper'>
                    {this.props.children}
                </div>
                <div className='note_text'>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    content: PropTypes.string.isRequired,
}