import React from 'react';
import { RiPencilRuler2Fill } from "react-icons/ri";

const AddNoteBtn = ({ addNote, setAddNote }) => {
    console.log("addnotebtn render edildi.")
    return (
        <button onClick={() => setAddNote(!addNote)} className='flex justify-center items-center gap-4 px-10 py-2 bg-notBlue rounded-lg text-notWhite'>
            <RiPencilRuler2Fill size={20} />
            New Note
        </button>
    )
}

export default React.memo(AddNoteBtn);