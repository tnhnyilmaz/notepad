import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTags } from '../../../redux/tagsReducer';

const AddTags = ({ setAddTags }) => {
    const [newTagsName, setNewTagsName] = useState('');
    const dispatch = useDispatch();

    const handleSaveNewTags = () => {
        if (!newTagsName.trim()) {
            alert("Kategori ismi boş olamaz!");
            return;
        }
        dispatch(addNewTags(newTagsName));
        setNewTagsName('');
        setAddTags(false);
    }
    return (
        <div className='flex flex-col gap-3'>
            <input
                type="text"
                value={newTagsName}
                onChange={(e) => setNewTagsName(e.target.value)}
                placeholder="Enter new category name"
                className='p-2 rounded-md'
            />

            <button onClick={handleSaveNewTags} className='p-1 bg-notBlue rounded-md text-notWhite'>
                Save New Category
            </button>
        </div>
    )
}

export default AddTags