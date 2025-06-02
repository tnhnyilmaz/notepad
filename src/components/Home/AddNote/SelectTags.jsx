import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllTags } from '../../../redux/tagsReducer';
import AddTags from './AddTags';
import TagCatAddBtn from './TagCatAddBtn';

const SelectTags = ({ setSelectedTags }) => {
    const { tags, tagsState } = useSelector((state) => state.tags);
    const dispatch = useDispatch();
    const [addTags, setAddTags] = useState(false);
    const [localSelectedTags, setLocalSelectedTags] = useState(['']); // FARKLI İSİM
console.log("selecttags render edilid")

    useEffect(() => {
        dispatch(AllTags())
    }, [dispatch]);

    useEffect(() => {
        if (setSelectedTags) {
            setSelectedTags(localSelectedTags.filter(tag => tag !== ''));
        }
    }, [localSelectedTags, setSelectedTags]);

    const handleAddTags = useCallback((e) => {
        e.preventDefault();
        setLocalSelectedTags((prev) => [...prev, '']);
    }, []);

    const handleRemoveTags = useCallback + ((indexToRemove) => {
        setLocalSelectedTags((prev) => prev.filter((_, index) => index !== indexToRemove));
    }, []);

    const handleSelectTags = useCallback((value, index) => {
        setLocalSelectedTags((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    }, []);
    const tagOptions = useMemo(() => {
        return tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
                {tag.tagsName}
            </option>
        ));
    }, [tags]);
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
                        {tagOptions}
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

export default React.memo(SelectTags);
