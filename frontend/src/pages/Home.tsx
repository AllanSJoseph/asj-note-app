import React, {useState, useRef, type JSX, useEffect} from 'react';
import ASJLogo from '../assets/asjsuperlogo.svg';
import AddBtn from '../assets/add_btn.svg';
import EditBtn from '../assets/edit_btn.svg';
import LogoutBtn from '../assets/logout_btn.svg';
import AccBtn from '../assets/acc_btn.svg';

import ThemeToggle from '../components/ThemeToggle.tsx';
import AddNote from "../components/AddNote.tsx";
import EditNote from "../components/EditNote.tsx";
import EditProfile from "../components/EditProfile.tsx";
import NoteList from "../components/NoteList.tsx";

import {useEditNoteStore} from "../store.ts";
import {Link} from "react-router-dom";

type MenuType = "add" | "edit" | "profile";

function Home() {
    const [middleWidth, setMiddleWidth] = useState<number>(30); // percentage
    const [rightWidth, setRightWidth] = useState<number>(65); // percentage
    const fixedNavbarWidth: number = 5; // percentage - fixed width

    const [currentMenu, setCurrentMenu] = useState<MenuType>("add");

    const checkEditNote = useEditNoteStore((state) => state.note);

    const MenuComponents: Record<MenuType, JSX.Element> = {
        add: <AddNote />,
        edit: <EditNote />,
        profile: <EditProfile />
    }

    const MenuTitles: Record<MenuType, string> = {
        add: "Add Note",
        edit: "Edit Note",
        profile: "Your Profile",
    }

    useEffect(() => {
        if (checkEditNote != undefined){
            setCurrentMenu("edit");
        }
    }, [checkEditNote]);

    const isDragging = useRef<boolean>(false);
    const dragType = useRef<string | null>(null);

    const handleMouseDown = (type: string) => (e: React.MouseEvent) => {
        isDragging.current = true;
        dragType.current = type;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;

        const containerRect = document.querySelector('.layout-container')?.getBoundingClientRect();
        if (!containerRect) return;

        const containerWidth = containerRect.width;
        const mouseX = e.clientX - containerRect.left;
        const mousePercentage = (mouseX / containerWidth) * 100;

        if (dragType.current === 'middle') {
            // Dragging the divider between middle and right sections
            const newMiddleWidth = Math.max(20, Math.min(60, mousePercentage - fixedNavbarWidth));
            const newRightWidth = Math.max(15, 100 - fixedNavbarWidth - newMiddleWidth);

            setMiddleWidth(newMiddleWidth);
            setRightWidth(newRightWidth);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        dragType.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="layout-container h-screen flex bg-gray-100 overflow-hidden">
            {/* Fixed Navbar Section */}
            <div
                className="bg-slate-800 text-white flex flex-col"
                style={{ width: `${fixedNavbarWidth}%` }}
            >
                <div className="p-4 border-b border-slate-700">
                    <img src={ASJLogo} alt='logo' width={40} height={40} className='logo-image'/>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => setCurrentMenu("add")} className={`block py-2 px-3 rounded hover:bg-slate-700 cursor-pointer transition ${currentMenu === "add" ? "bg-slate-600" : ""}`} title="Add Note">
                                <img src={AddBtn} alt='add' width={50} height={50} />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentMenu("edit")} className={`block py-2 px-3 rounded hover:bg-slate-700 cursor-pointer transition-colors ${currentMenu === "edit" ? "bg-slate-600" : ""}`} title="Edit Note">
                                <img src={EditBtn} alt='add' width={50} height={50} />
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentMenu("profile")} className={`block py-2 px-3 rounded hover:bg-slate-700 cursor-pointer transition-colors ${currentMenu === "profile" ? "bg-slate-600" : ""}`} title="Profile Settings">
                                <img src={AccBtn} alt='add' width={50} height={50} />
                            </button>
                        </li>
                        <li>
                            <Link to="/logout" className="block py-2 px-3 rounded hover:bg-slate-700 transition-colors" title="Logout">
                                <img src={LogoutBtn} alt='add' width={50} height={50} />
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
                    <ThemeToggle />
                </div>
            </div>

            {/* Middle Resizable Section */}
            <div
                className="bg-white dark:bg-gray-900 flex flex-col border-r border-gray-300 dark:border-gray-700"
                style={{ width: `${middleWidth}%` }}
            >
                <div className="p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-950">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{MenuTitles[currentMenu]}</h2>
                    <p className="text-sm text-gray-600">Width: {middleWidth.toFixed(1)}%</p>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                    <div className="space-y-4">
                        {MenuComponents[currentMenu]}
                    </div>
                </div>
            </div>

            {/* Resizer Handle for Middle Section */}
            <div
                className="w-1 bg-gray-300 dark:bg-gray-600 hover:bg-blue-500 cursor-col-resize transition-colors duration-150 relative group"
                onMouseDown={handleMouseDown('middle')}
            >
                <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500 group-hover:opacity-20"></div>
            </div>

            {/* Right Resizable Section */}
            <div
                className="bg-gray-50 flex flex-col"
                style={{ width: `${rightWidth}%` }}
            >
                <div className="p-4 border-b border-gray-200 bg-white dark:bg-gray-900">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Your Notes</h2>
                    <p className="text-sm text-gray-600">Width: {rightWidth.toFixed(1)}%</p>
                </div>
                <div className="flex-1 p-4 overflow-auto dark:bg-gray-950">
                    <div className="space-y-3">
                        <NoteList />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Home;