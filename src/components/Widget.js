import React, {useState, useEffect} from 'react';



export default function Widget() {
 let [notes, setNotes] = useState([]);
 let [form, setForm] = useState('');
 
 const requestUrl = 'http://localhost:7777/notes';
 const headers = {
	'Content-Type': 'application/json'
}

 const handleChange = (evt) => {
   setForm(evt.target.value)
 }

 const handleRemove = async id => {
  const url = requestUrl + `/${id}`;
  await fetch(url, {method: "DELETE"});
  await update();
 }

 const update = async () => {
  const data = await fetch(requestUrl, { method: 'GET' }).then(response => {
    return response.json();
  });
  setNotes(() => {
    return data;
  })
 }

 const handleSubmit = async evt => {
  evt.preventDefault();
  if (!form) return;
  const body = {
    "id": 0,
    "content": form.story
  }
  await fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers
  });
  setForm('');
  await update();
};

  useEffect(() => {
  update()
});

  return (
    <div className="widget_crud">
    <div className="notes">
    <h2 className="notes_title">Notes</h2>
    <button className="update" onClick={() => update()}>Update</button>
    {notes.map((elm) => {
     return(
      <div className="note_content">
      <div className="note_text">{elm.content}</div>
      <button className="btn_delete_note" onClick={handleRemove(elm.id)}>x</button>
      </div>
     )
    })}
    </div>
    <form className="add_note_form" submit={handleSubmit}>
      <h3 className="title_form">New Note</h3>
        <textarea className="textarea_note" onChange={handleChange} value={form}></textarea>
        <button className="add_button">Add</button>
    </form>
    </div>
  );
  
}

