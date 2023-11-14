import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import { FaX } from "react-icons/fa6";
import './notes.css';

function App() {
  
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSetTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleSetText = useCallback((event) => {
    setText(event.target.value);
  }, []);

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
                  <input className='noteTitle' type="text" value={title} onChange={handleSetTitle} />
                </div>
                <div className="noteClose">
                  <FaX />
                </div>
            </div>
            <div className="noteBody">
              <textarea className='noteText' value={text} onChange={handleSetText} />
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