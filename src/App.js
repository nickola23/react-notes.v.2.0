import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import { FaX } from "react-icons/fa6";
import './notes.css';

function App() {

  const initialTitle = 'Unesi naslov';
  const initialText = 'Unesi neki opis';
  
  const titleRef = useRef(initialTitle);
  const textRef = useRef(initialText);
  const [notes, setNotes] = useState([]);

  const handleInputChange = (ref) => (event) => {
    ref.current = event.target.value;
  };

  useEffect(() => {
    fetch('http://localhost/server/server.php')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setNotes(data);
      })
      .catch(error => {
        console.error('Error fetching notes: ' + error);
      });
  }, []); 

  const handleSaveNote = () => {
    const data = { title: titleRef.current, text: textRef.current };

    if(data.title !== "" && data.text !== ""){
      fetch('http://localhost/server/server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        alert("Uspesno sacuvano");
      })
      .catch(error => {
        console.error('Error saving note: ' + error);
        alert("Greska!");
      });
    }
    else{
      alert("Morate uneti sve vrednosti");
    }
  };
  
  function Note(props) {
    return (
      <>
        <div className="note">
            <div className="noteHeader">
                <img className='noteLogo' src={logo} alt="React logo" />
                <div className="noteTitle">
                  <input className='noteTitle' type="text" defaultValue={props.title}  onChange={handleInputChange(titleRef)} />
                </div>
                <div className="noteClose">
                  <FaX />
                </div>
            </div>
            <div className="noteBody">
              <textarea className='noteText' defaultValue={props.text} onChange={handleInputChange(textRef)} />
            </div>
            <div className="noteFooter">
              <button className='noteSave' onClick={handleSaveNote}>Save Note</button>
            </div>
        </div>
      </>
      
    );
  }

  return (
    <>
      <Note title={initialTitle} text={initialText}/>
      { notes.map(note => ( <Note key={note.id} title={note.title} text={note.text}/> ))}
    </>
  );
}

export default App;