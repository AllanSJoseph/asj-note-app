// Zustand Setup for Global State Management

import {create} from "zustand";
import type {NoteEntry} from "./types.ts";

type NewNoteStore = {
    created: boolean | false;
    setCreated: (newNoteCreated: boolean) => void;
}

// type NoteToEdit = {
//     oldTitle: string;
//     oldContent: string;
// }

type EditNoteStore = {
    note:  NoteEntry | null ;
    setToEditNote: (note: NoteEntry) => void;
    resetToEditNote: () => void;
}

export const useNewNoteStore = create<NewNoteStore>((set) => ({
    created: false,
    setCreated: (newNoteCreated) => set({created: newNoteCreated}),
}))

export const useEditNoteStore = create<EditNoteStore>((set) => ({
    note: null,
    setToEditNote: (oldNote) => set({note: oldNote}),
    resetToEditNote: () => set({note: null}),
}))