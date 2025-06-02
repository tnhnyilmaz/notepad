import React, { useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTime } from 'react-icons/io5';
import useOutsideClick from '../../CustomHooks/useOutsideHooks';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../redux/notesReducer';
import OptionsSelect from './OptionsSelect';

const NoteBox = ({ note, onClick, isSelected }) => {
    const [options, setOptions] = useState(false);
    const optionsRef = useRef(null);
    const dispatch = useDispatch();

    useOutsideClick(optionsRef, () => setOptions(false), options);

    const noteDate = note.createdAt
        ? new Date(
            typeof note.createdAt.toDate === 'function'
                ? note.createdAt.toDate()
                : note.createdAt
        ).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        : "Tarih yok";

    const onUpdate = () => {
        dispatch(updateNote(note.id)); // örnek parametre
    };

    return (
        <div onClick={onClick} className='relative bg-notGrey3 w-full min-h-44 rounded-md hover:bg-notGrey4'>
            <div className='space-y-3 border-opacity-20 rounded-xl p-6'>
                <div className='flex justify-between text-notBlue'>
                    <span className='text-notWhite text-3xl font-bold'>{note.title}</span>
                    <div className="relative" ref={optionsRef}>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            setOptions(!options);
                        }}>
                            <BsThreeDotsVertical className='text-notBlue' />
                        </button>
                        {options && <OptionsSelect note={note} />}
                    </div>
                </div>
                <div className='flex gap-10'>
                    <div className='flex items-center text-notWhite gap-3'>
                        <IoTime className='text-notBlue' />
                        <span className='text-xs'>{noteDate}</span>
                    </div>
                </div>
                <div className='text-notWhite whitespace-pre-wrap line-clamp-3'>{note.content}</div>
            </div>
        </div>
    );
};

export default React.memo(NoteBox);
