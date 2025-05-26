import React from 'react'
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/notesReducer';

const SearchRow = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.notes.searchTerm)
    return (
        <div className='flex gap-3 '>
            <input
                type="text" className='text-notWhite bg-notGrey2 w-full h-10 mt-8 rounded-md  focus:outline-none placeholder:text-notWhite p-2 '
                placeholder='Search...'
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <div className='bg-notBlue flex text-notWhite  w-1/5 mt-8 rounded-md items-center justify-center'>
                <FaSearch size={20} />
            </div>
        </div>
    )
}

export default SearchRow