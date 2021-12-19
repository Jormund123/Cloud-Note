import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all Note
  const getNote = async () => {
    //TODO:  API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNTllMGVhMTNiNjRiNjIzMmQwNTI1In0sImlhdCI6MTYzOTI5MzUxM30.hYIH3vc7PAlngnNJipaiuz4P4GiNYDsWnubBIlQBHHI",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO:  API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNTllMGVhMTNiNjRiNjIzMmQwNTI1In0sImlhdCI6MTYzOTI5MzUxM30.hYIH3vc7PAlngnNJipaiuz4P4GiNYDsWnubBIlQBHHI",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const note = {
      _id: "61b9a7efe3823923be644wsadas2bf",
      user: "61b59e0ea13b64b6232d0525",
      title: title,
      description: description,
      tag: tag,
      date: "2021-12-15T08:31:43.883Z",
      __v: 0,
    };
    const json = response.json();
    console.log(json);
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API Calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNTllMGVhMTNiNjRiNjIzMmQwNTI1In0sImlhdCI6MTYzOTI5MzUxM30.hYIH3vc7PAlngnNJipaiuz4P4GiNYDsWnubBIlQBHHI",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = response.json();
    console.log(json);

    //deleting note
    console.log("deleting note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiNTllMGVhMTNiNjRiNjIzMmQwNTI1In0sImlhdCI6MTYzOTI5MzUxM30.hYIH3vc7PAlngnNJipaiuz4P4GiNYDsWnubBIlQBHHI",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes)) //deepcopy
    //editing notes in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    //allows every props to be used by the components inside it
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
