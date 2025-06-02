import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/notesReducer';

const SearchRow = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    // debounce işlemi böyler her karekter sonrası gelen re-render olyını 
    //engelleyip belli bir süre bekleme ekledik
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(setSearchTerm(value));
        }, 300),
        [dispatch]
    );

    useEffect(() => {
        debouncedDispatch(inputValue);
        return debouncedDispatch.cancel;
    }, [inputValue, debouncedDispatch]);

    return (
        <div className='flex gap-3 '>
            <input
                type="text"
                className='text-notWhite bg-notGrey2 w-full h-10 mt-8 rounded-md focus:outline-none placeholder:text-notWhite p-2'
                placeholder='Search...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className='bg-notBlue flex text-notWhite w-1/5 mt-8 rounded-md items-center justify-center'>
                <FaSearch size={20} />
            </div>
        </div>
    );
};

export default SearchRow;
