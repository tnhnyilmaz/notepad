import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { MdOutlineNoteAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import AddNote from '../components/Home/AddNote';
import AddNoteBtn from '../components/utils/AddNoteBtn';

const Home = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [addNote, setAddNote] = useState(false);
    const navigate = useNavigate();
    console.log("home sayfası render edildi")


    return (
        <div className='w-full h-screen bg-notGrey5 flex items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <div className='text-2xl text-notWhite font-thin'>
                    Welcome to <span className='font-semibold'>NotPad Web</span>
                </div>
                <AddNoteBtn addNote={addNote} setAddNote={setAddNote} />
                <button onClick={() => navigate("/notes")} className='flex justify-center items-center gap-4 px-14 py-2 bg-notRed rounded-lg text-notWhite'>
                    <MdOutlineNoteAlt size={20} />
                    Notes
                </button>

            </div>

            {addNote && (<AddNote setAddNote={setAddNote} />)}
        </div>
    );
};

export default Home