import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote } = context; //destructuring
    const [note, setNote] = useState({title: "", description: "", tag:"default"})

    const handleClick = (e)=>{
        e.preventDefault(); //so that page will not reload
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        //the name that is being changed will be equal to the value written in the respective text field
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className='container' >
            <h1 className='my-3'>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" 
                    id = "title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name= "description" onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
