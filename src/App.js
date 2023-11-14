import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import { FaX } from "react-icons/fa6";
import './notes.css';

function App() {
  
  const NoteTitle = () => {
    const [title, setTitle] = useState('');
    const handleSetTitle = useCallback((event) => {
      setTitle(event.target.value);
    }, []);
    return (
        <input className='noteTitle' type="text" value={title} onChange={handleSetTitle} />
    )
  }

  const NoteText = () => {
    const [text, setText] = useState('');
    const handleSetText = useCallback((event) => {
      setText(event.target.value);
    }, []);
    return (
        <textarea className='noteText' value={text} onChange={handleSetText} />
    )
  }

  const handleSaveNote = () => {
    const data = { title, text };

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
  };
  
  function Note(props) {
    return (
      <>
        <div className="note">
            <div className="noteHeader">
                <img className='noteLogo' src={logo} alt="React logo" />
                <div className="noteTitle">
                  <NoteTitle />
                </div>
                <div className="noteClose">
                  <FaX />
                </div>
            </div>
            <div className="noteBody">
              <NoteText />
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
      <Note />
    </>
  );
}

export default App;