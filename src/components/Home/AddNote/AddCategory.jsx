import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCategory } from '../../../redux/categoryReducer';

const AddCategory = ({ setAddCategory }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const dispatch = useDispatch();

    const handleSaveNewCategory = () => {
        if (!newCategoryName.trim()) {
            alert("Kategori ismi boş olamaz!");
            return;
        }
        dispatch(addNewCategory(newCategoryName));
        setNewCategoryName('');
        setAddCategory(false);
    }
    return (
        <div className='flex flex-col gap-3'>
            <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter new category name"
                className='p-2 rounded-md'
            />

            <button onClick={handleSaveNewCategory} className='p-1 bg-notBlue rounded-md text-notWhite'>
                Save New Category
            </button>
        </div>
    )
}

export default AddCategory