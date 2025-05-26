import { getAuth } from 'firebase/auth/web-extension';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import SelectCategory from './AddNote/SelectCategory';
import SelectTags from './AddNote/SelectTags';

const AddNote = ({ setAddNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSave = async () => {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;

        if (!user) {
            console.error("no user!")
            return;
        }
        try {
            await addDoc(collection(db, "users", user.uid, "notes"), {
                title,
                content,
                categories: selectedCategories,
                tags: selectedTags,
                createdAt: new Date()
            });

            setAddNote(false); // modal'ı kapat
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    return (
        <div className='w-full h-full bg-notGrey5 bg-opacity-80 fixed top-0 left-0 flex items-center justify-center z-50'>
            <div className='w-2/3 h-2/3 relative bg-notGrey1 border border-notBlue p-4 flex items-center justify-center rounded-lg shadow-lg'>
                <button
                    onClick={() => setAddNote(false)}
                    className='absolute top-4 right-8 text-notWhite text-xl font-bold hover:text-red-500'
                >
                    &times;
                </button>

                <form className='w-full h-full bg-notGrey2 bg-opacity-45 space-y-6 p-6 rounded-lg overflow-y-auto' onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col'>
                        <label htmlFor="input1" className='mb-1'>Title</label>
                        <input
                            id="input1"
                            type="text"
                            className="p-2 rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="textarea1" className='mb-1'>Content</label>
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

                    <button type="button" onClick={handleSave} className='p-1 px-4 bg-notBlue rounded-md flex justify-end items-end'>Save</button>
                </form>
            </div >
        </div >
    )
}

export default AddNote