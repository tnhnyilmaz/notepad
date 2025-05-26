import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllTags } from '../../../redux/tagsReducer';
import AddTags from './AddTags';
import TagCatAddBtn from './TagCatAddBtn';

const SelectTags = ({ setSelectedTags }) => {
    const { tags, tagsState } = useSelector((state) => state.tags);
    const dispatch = useDispatch();
    const [addTags, setAddTags] = useState(false);
    const [localSelectedTags, setLocalSelectedTags] = useState(['']); // FARKLI İSİM

    useEffect(() => {
        dispatch(AllTags())
    }, [dispatch]);

    useEffect(() => {
        if (setSelectedTags) {
            setSelectedTags(localSelectedTags.filter(tag => tag !== ''));
        }
    }, [localSelectedTags, setSelectedTags]);

    const handleAddTags = (e) => {
        e.preventDefault();
        setLocalSelectedTags([...localSelectedTags, '']);
    };

    const handleRemoveTags = (indexToRemove) => {
        setLocalSelectedTags(localSelectedTags.filter((_, index) => index !== indexToRemove));
    };

    const handleSelectTags = (value, index) => {
        const updated = [...localSelectedTags];
        updated[index] = value;
        setLocalSelectedTags(updated);
    };

    return (
        <div className='flex flex-col space-y-2'>
            <label className='mb-1 text-notWhite'>Tags</label>
            {localSelectedTags.map((tag, index) => (
                <div key={index} className='flex items-center gap-2'>
                    <select
                        className='p-2 rounded-md flex-1'
                        value={tag}
                        onChange={(e) => handleSelectTags(e.target.value, index)}
                    >
                        <option value="">Seçiniz</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.tagsName}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => handleRemoveTags(index)}
                        className='text-red-500 font-bold text-lg hover:scale-110'
                    >
                        &times;
                    </button>
                </div>
            ))}
            <TagCatAddBtn cat={handleAddTags} newCat={setAddTags} addCategory={addTags} />
            {addTags && <AddTags setAddTags={setAddTags} />}
        </div>
    );
}

export default SelectTags