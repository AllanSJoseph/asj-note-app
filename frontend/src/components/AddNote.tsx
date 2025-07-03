import React, {useState} from "react";
import api from "../api.ts";

import {useNewNoteStore} from "../store.ts";

function AddNote() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // const created = useNewNoteStore((state) => state.created);
    const setCreated = useNewNoteStore((state) => state.setCreated)

    const createNote = (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        api
            .post("/api/notes/", {content, title})
            .then((response) => {
                if (response.status === 201) alert("Note Created Successfully!");
                else alert("Failed to Create Note!");
                setTitle("");
                setContent("");
                setCreated(true);
            }).catch((err) => alert(err))
            .finally(() => setLoading(false));
    };


    return(
        <div className="space-y-6">
            <div className="space-y-4">

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                        Title
                    </label>
                    <div className="relative">
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-colors duration-200 placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                </div>


                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                        Content
                    </label>
                    <div className="relative">
                        <textarea
                            id="content"
                            name="content"
                            rows={10}
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
                onClick={createNote}
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
                    "Add Note"
                )}
            </button>
        </div>
    )
}

export default AddNote;