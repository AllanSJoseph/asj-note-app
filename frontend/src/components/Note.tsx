import type {NoteEntry} from "../types.ts";
import DeleteBtn from "../assets/delete_btn.svg";
import EditBtn from "../assets/edit_btn.svg";
import CalendarIcon from "../assets/calendar_icon.svg";

interface NoteTypes{
    note: {id: number, title: string, content: string,  created_at: string};
    onDelete: (id: number) => void;
    onEdit: (item: NoteEntry) => void;
}


function Note({note, onDelete, onEdit} : NoteTypes) {
    const formattedDate: string = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header Section */}
                <div className="p-4 pb-3">
                    <div className="flex items-start justify-between mb-3">
                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 mr-3 line-clamp-2">
                            {note.title}
                        </h3>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <button
                                onClick={() => onEdit(note)}
                                className="p-2 bg-slate-700 dark:bg-slate-600 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 rounded-full transition-colors duration-200"
                                title="Edit note"
                            >
                                <img src={EditBtn} alt='edit' />
                            </button>
                            <button
                                onClick={() => onDelete(note.id)}
                                className="p-2 bg-slate-700 dark:bg-slate-600 cursor-pointer hover:bg-red-600 dark:hover:bg-red-500 rounded-full transition-colors duration-200"
                                title="Delete note"
                            >
                                <img src={DeleteBtn} alt='edit' />
                            </button>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <img className="invert dark:invert-0 w-4 h-4 opacity-75 dark:opacity-60" src={CalendarIcon} alt='edit' />
                        <span className="pl-1">{formattedDate}</span>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="border-t border-gray-200 dark:border-gray-600"></div>

                {/* Content Section */}
                <div className="p-4 pt-3">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {note.content}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Note;