import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial = [
          {
            "_id": "61b995f4e8823923bea6442aa",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning",
            "tag": "personal",
            "date": "2021-12-15T07:15:00.168Z",
            "__v": 0
          },
          {
            "_id": "61b995fae882392s3be6442ac",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning1",
            "tag": "personal1",
            "date": "2021-12-15T07:15:06.320Z",
            "__v": 0
          },
          {
            "_id": "61b995ffe8823923dbe6442ae",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T07:15:11.654Z",
            "__v": 0
          },
          {
            "_id": "61b9a7eee8823923be6e442b3",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T08:31:42.469Z",
            "__v": 0
          },
          {
            "_id": "61b9a7eee8823923bqe6442b5",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T08:31:42.634Z",
            "__v": 0
          },
          {
            "_id": "61b9a7eee8823923bye6442b7",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T08:31:42.800Z",
            "__v": 0
          },
          {
            "_id": "61b9a7eee8823923be6442b90",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T08:31:42.973Z",
            "__v": 0
          },
          {
            "_id": "61b9a7efe8823923be64142bb",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T08:31:43.154Z",
            "__v": 0
          }
    ]  

      const [notes, setNotes] = useState(notesInitial);

      //Add a Note
    const addNote = (title, description, tag) =>{
        //TODO:  API Call
       const note = {
            "_id": "61b9a7efe3823923be6442bf",
            "user": "61b59e0ea13b64b6232d0525",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-12-15T08:31:43.883Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
    }

      //Delete a Note
    const deleteNote = (id) =>{
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
    }

      //Edit a Note

    const editNote = () =>{
        
    }

    return (
        //allows every props to be used by the components inside it
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;