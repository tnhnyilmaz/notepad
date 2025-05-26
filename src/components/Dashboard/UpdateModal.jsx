import { useEffect, useState } from 'react';
import SelectCategory from '../Home/AddNote/SelectCategory';
import SelectTags from '../Home/AddNote/SelectTags';

const UpdateModal = ({ onUpdate, note, setUpdateModal }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
            setSelectedCategories(note.categories || []);
            setSelectedTags(note.tags || []);
        }
    }, [note]);
    return (
        <div className='w-full h-full bg-notGrey5 bg-opacity-80 fixed top-0 left-0 flex items-center justify-center z-50'>
            <div className='w-2/3 h-2/3 relative gap-4 bg-notGrey1 border border-notBlue p-4 flex flex-col items-center justify-center rounded-lg shadow-lg'>
                <form className='w-full h-full bg-notGrey2 bg-opacity-45 space-y-6 p-6 rounded-lg overflow-y-auto text-notGrey3' onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col'>
                        <label htmlFor="input1" className='mb-1 text-notWhite'>Title</label>
                        <input
                            id="input1"
                            type="text"
                            className="p-2 rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="textarea1" className='mb-1 text-notWhite'>Content</label>
                        <textarea
                            id="textarea1"
                            className="p-2 rounded-md resize-none"
                            rows="4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <SelectCategory
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    <SelectTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                </form>
                <div className='flex gap-4 w-full px-8 mt-4'>
                    <button
                        onClick={() => {
                            onUpdate({
                                title,
                                content,
                                categories: selectedCategories,
                                tags: selectedTags
                            });
                            setUpdateModal(false);
                        }}
                        className='flex-1 h-10 bg-notRed text-notWhite rounded-md hover:bg-red-700 transition'>
                        Güncelle
                    </button>

                    <button onClick={() => setUpdateModal(false)} className='flex-1 h-10 bg-notGrey4 text-notWhite rounded-md hover:bg-notGrey3 transition'>Vazgeç</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal