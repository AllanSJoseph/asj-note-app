import {useState, useEffect} from "react";
import api from "../api";
import Note from "./Note.tsx";
import type {NoteEntry} from "../types.ts";

import {useNewNoteStore, useEditNoteStore} from "../store.ts";


function NoteList() {
    const [notes, setNotes] = useState<NoteEntry[]>([]);

    const created = useNewNoteStore((state) => state.created);
    const setCreated = useNewNoteStore((state) => state.setCreated)

    const edited = useEditNoteStore((state) => state.edited)
    const setEdited = useEditNoteStore((state) => state.setEdited)

    const toEdit = useEditNoteStore((state) => state.setToEditNote)

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    if (created){
        getNotes();
        setCreated(false);
    }

    if (edited){
        getNotes();
        setEdited(false);
    }

    const deleteNote = (id: number) => {
        api.delete(`/api/notes/delete/${id}`).then((res) => {
            if (res.status === 204) {
                alert("Note Deleted Successfully!");
                getNotes();
            } else alert("Failed to Delete Note!")
        }).catch((err) => alert(err));
    }

    const editNote = (item: NoteEntry) => {
        toEdit(item)
    }

    return (
        <>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} onEdit={editNote} key={note.id} />
            ))}
        </>
    )
}

export default NoteList;