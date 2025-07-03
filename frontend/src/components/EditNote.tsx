import React, {useCallback, useEffect, useState} from "react";
import api from "../api.ts";
import {useEditNoteStore} from "../store.ts";

function EditNote(){
    const [currNoteId, setCurrNoteId] = useState<number>();
    const [newtitle, setNewTitle] = useState<string>("");
    const [newcontent, setNewContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const setToEditNote = useEditNoteStore((state) => state.note);
    const resetEditNote = useEditNoteStore((state) => state.resetToEditNote);

    useEffect(() => {
        if (setToEditNote != undefined){
            setNewTitle(setToEditNote.title);
            setNewContent(setToEditNote.content);
            setCurrNoteId(setToEditNote.id)
        } 
    }, [setToEditNote]);

    useCallback(() => {
        if (setToEditNote != undefined){
            setNewTitle(setToEditNote.title);
            setNewContent(setToEditNote.content);
        }
    }, [setToEditNote]);


    const editNote = (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        api
            .patch(`/api/notes/update/${currNoteId}`, {title: newtitle, content: newcontent})
            .then((response) => {
                if (response.status === 200) alert("Note updated!");
                else alert("Note updated!");
                setNewTitle("");
                setNewContent("");
                resetEditNote();
            }).catch((error) => {alert(error)})
            .finally(() => setLoading(false));
    };

    const cancelEditNote = () => {
        resetEditNote();
        setNewTitle("");
        setNewContent("");
    }


    return(
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Username Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                        New Title
                    </label>
                    <div className="relative">
                        <input
                            id="title"
                            type="text"
                            value={newtitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter Title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                        New Content
                    </label>
                    <div className="relative">
                        <textarea
                            id="content"
                            name="content"
                            rows={10}
                            required
                            value={newcontent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Enter your note contents..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                        >
                        </textarea>
                    </div>
                </div>
            </div>


            {/* Submit Button */}

            <button
                type="submit"
                disabled={loading}
                onClick={editNote}
                className="w-full flex justify-center py-3 px-4 border font-bold border-transparent rounded-lg shadow-sm text-sm text-white dark:text-gray-800 bg-stone-600 dark:bg-white dark:hover:bg-gray-100 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 dark:focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
                {loading ? (
                    <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Please Wait...
                    </div>
                ) : (
                    "Edit Note"
                )}
            </button>

            <button
                type="button"
                onClick={cancelEditNote}
                className="w-full flex justify-center py-3 px-4 border font-bold border-transparent rounded-lg shadow-sm text-sm text-white dark:text-gray-800 bg-stone-600 dark:bg-white dark:hover:bg-gray-100 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 dark:focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
                Cancel
            </button>

            <p className="text-center text-sm text-stone-500 dark:text-white"><b>Tip:</b> Click on the edit button on the note displayed on the right to edit.</p>
        </div>
    )
}

export default EditNote;