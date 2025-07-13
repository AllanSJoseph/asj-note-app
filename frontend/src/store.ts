// Zustand Setup for Global State Management

import {create} from "zustand";
import type {NoteEntry} from "./types.ts";

type NewNoteStore = {
    created: boolean | false;
    setCreated: (newNoteCreated: boolean) => void;
}

type EditNoteStore = {
    note:  NoteEntry | null ;
    edited: boolean | false;
    setToEditNote: (note: NoteEntry) => void;
    resetToEditNote: () => void;
    setEdited: (editNote: boolean) => void;
}



export const useNewNoteStore = create<NewNoteStore>((set) => ({
    created: false,
    setCreated: (newNoteCreated) => set({created: newNoteCreated}),
}))

export const useEditNoteStore = create<EditNoteStore>((set) => ({
    note: null,
    edited: false,
    setToEditNote: (oldNote) => set({note: oldNote}),
    resetToEditNote: () => set({note: null}),
    setEdited: (noteEdited) => set({edited: noteEdited}),
}))