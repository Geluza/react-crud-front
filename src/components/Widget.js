import React from "react";
import Note from "./Note";
import AddForm from "./AddForm";

const server = 'http://localhost:7777/notes';

export default class Widget extends React.Component {
    state = {notes: []};

    getNotes = () => {
        fetch(server).then(response => response.json())
        .then(result => {
            this.setState({notes: [...result]});
        });
    }

    postNote = (id, content) => {
        fetch(server, {
            method: 'POST',
            body: JSON.stringify({id, content}),
        }).then(this.getNotes);
    }

    deleteNote = (id) => {
        fetch(`${server}/${id}`, {
            method: 'DELETE',
        }).then(this.getNotes);
    }

    componentDidMount() {
        this.getNotes();
    }

    render() {
        return (
            <div className='Widget'>
                <div className='header'>
                   <h2 className='title'>Notes</h2>
                   <button className='update' onClick={this.getNotes}>reload</button> 
                </div>
                <div className='notes'>
                    {this.state.notes.map((el) => {
                        console.log(el.content);
                        return (
                            <Note content={el.content} key={el.id}>
                                <button className='delete_btn' onClick={() => this.deleteNote(el.id)}>X</button>
                            </Note>)
                    })}
                </div>
                <AddForm newNote={this.postNote} />
            </div>
        )
    }
}

