import { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../../redux/notesReducer';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const OptionsSelect = ({ note }) => {
    //update edilen veriler
    const [newTitle, setNewTitle] = useState(note.title);
    const [newContent, setNewContent] = useState(note.content);

    // update ve delete modalları açılığ kapanmasını sağlayan statelerimiz
    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);


    const dispatch = useDispatch();

    //update ve
    const onDelete = () => {
        dispatch(deleteNote(note.id))
    }
    const onUpdate = (updatedNoteData) => {
        dispatch(updateNote({ noteId: note.id, noteData: updatedNoteData }));
    };

    return (
        <div className='absolute  right-3 top-3 bg-notGrey3 p-2 border border-opacity-10 rounded-md shadow-md'>
            {/* Update Butonu */}
            <button onClick={() => setUpdateModal(!updateModal)} className='block text-notWhite text-sm font-semibold mb-2 group hover:bg-notGrey2 rounded-md p-1'>
                <div className='flex items-center gap-3'>
                    <RiEdit2Fill className='text-notBlue text-lg' />
                    <span className='text-opacity-35 group-hover:text-opacity-100 transition-opacity'>
                        Update
                    </span>
                </div>
            </button>
            {
                updateModal && (<UpdateModal onUpdate={onUpdate} note={note} setUpdateModal={setUpdateModal} />)
            }
            {/* Delete Butonu */}
            <button onClick={() => setDeleteModal(!deleteModal)} className='block text-notWhite text-sm font-semibold group hover:bg-notGrey2 rounded-md p-1'>
                <div className='flex items-center gap-3'>
                    <MdDeleteForever className='text-notRed text-lg' />
                    <span className='text-opacity-35 group-hover:text-opacity-100 transition-opacity'>
                        Delete
                    </span>
                </div>
            </button>
            {deleteModal && (<DeleteModal onDelete={onDelete} note={note} setDeleteModal={setDeleteModal} />)}
        </div >
    );
}

export default OptionsSelect;
