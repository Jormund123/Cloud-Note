import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial = [
          {
            "_id": "61b995f4e8823923be6442aa",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning",
            "tag": "personal",
            "date": "2021-12-15T07:15:00.168Z",
            "__v": 0
          },
          {
            "_id": "61b995fae8823923be6442ac",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning1",
            "tag": "personal1",
            "date": "2021-12-15T07:15:06.320Z",
            "__v": 0
          },
          {
            "_id": "61b995ffe8823923be6442ae",
            "user": "61b59e0ea13b64b6232d0525",
            "title": "My Title",
            "description": "Please wake up early in the morning12",
            "tag": "personal12",
            "date": "2021-12-15T07:15:11.654Z",
            "__v": 0
          }
        ]
      

      const [notes, setNotes] = useState(notesInitial);

    return (
        //allows every props to be used by the components inside it
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;