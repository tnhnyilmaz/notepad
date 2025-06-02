import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NoteBox from '../components/Dashboard/NoteBox';
import Notepad from '../components/Dashboard/Notepad';
import SearchRow from '../components/Dashboard/SearchRow';
import AddNote from '../components/Home/AddNote';
import AddNoteBtn from '../components/utils/AddNoteBtn';
import { fetchUserNotes } from '../redux/notesReducer';

const Dashboard = () => {
    const { notes, searchTerm } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const [selectedNote, setSelectedNote] = useState(null);
    const [addNote, setAddNote] = useState(false);

    const filteredNotes = notes.filter((note) => //search rowdan gelen gharfe göre arama yapma filtreleme işlemi
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 3;

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUserNotes()); //giriş yapan kullanının notlarını çeken fonksiyon
    }, [dispatch]);
    useEffect(() => {
        if (selectedNote) {
            const updated = filteredNotes.find(note => note.id === selectedNote.id);
            if (updated) {
                setSelectedNote(updated);
            }
        }
    }, [filteredNotes, selectedNote]);
    // notes güncellenince tetiklenir ve orta panelde güncellenmiş not güncellenir.

    //pagination işlemleri

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };


    return (
        <div className='flex'>
            {/* Sol Panel */}
            <div className='w-1/5 h-screen bg-notGrey4 p-2 space-y-4 overflow-y-auto'>
                <SearchRow />
                {currentNotes && currentNotes.length > 0 ? (
                    currentNotes.map((note) => (
                        <NoteBox
                            key={note.id}
                            note={note}
                            onClick={() => setSelectedNote(note)}
                            isSelected={selectedNote?.id === note.id}
                        />
                    ))
                ) : (
                    <p className='text-notWhite text-sm'>
                        {notes.length === 0 ? "Hiç not yok." : "Arama sonucuna uygun not bulunamadı."}
                    </p>
                )}
                {/* Pagination Butonları */}
                <div className="flex  justify-center gap-5 mt-4 px-2">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className='text-notWhite bg-notBlue px-2 py-1 rounded disabled:opacity-50'
                    >
                        <FaChevronLeft />
                    </button>
                    <span className='text-notWhite text-sm'>
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className='text-notWhite bg-notBlue px-2 py-1 rounded disabled:opacity-50'
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            {/* Orta Panel */}
            <div className='w-3/5 h-screen bg-notGrey5 overflow-y-auto p-2'>
                <div className='flex justify-between '>
                    <button onClick={() => navigate("/Home")} className='p-2 bg-notBlue rounded-lg text-notWhite' ><IoMdReturnLeft size={20} className='text-notWhite' /></button>
                    <AddNoteBtn addNote={addNote} setAddNote={setAddNote} />
                </div>
                <Notepad selectedNote={selectedNote} />
            </div>
            {addNote && (<AddNote setAddNote={setAddNote} />)}
            {/* Sağ Panel (şimdilik boş) */}
            <div className='w-1/5 h-screen bg-notGrey4 px-10 pt-10'></div>
        </div>
    );
};

export default Dashboard;
