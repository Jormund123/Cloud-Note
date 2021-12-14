import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {

    const s1 ={
        "name" : "Anand",
        "class" : "4C"
    }

    const [state, setstate] = useState(s1);
    const update = () =>{
        setTimeout(() => {
            setstate({
                "name": "Anand Karna",
                "class" : "4A"
            })
        }, 2000);
    }
    return (
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;