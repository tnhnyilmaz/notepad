import { useEffect, useMemo, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { LiaHashtagSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClick from '../../CustomHooks/useOutsideHooks';
import { AllCategories } from '../../redux/categoryReducer';
import { AllTags } from '../../redux/tagsReducer';
import OptionsSelect from './OptionsSelect';

const Notepad = ({ selectedNote }) => {
    const [options, setOptions] = useState(false);
    const categories = useSelector((state) => state.categories.categories);
    const tags = useSelector((state) => state.tags.tags);
    const tagColors = ['bg-notBlue', 'bg-notRed', 'bg-notYellow', 'bg-notGreen'];

    const dispatch = useDispatch();
    const optionsRef = useRef(null);

    useOutsideClick(optionsRef, () => setOptions(false), options);
    useEffect(() => {
        dispatch(AllCategories());
        dispatch(AllTags());
    }, [dispatch]);

    // categoryNames useMemo ile hesaplanıyor
    const categoryNames = useMemo(() => {
        if (!selectedNote || categories.length === 0) return [];
        return selectedNote.categories?.map(catId => {
            const category = categories.find(cat => cat.id === catId);
            return category ? category.categoryName : "Bilinmeyen";
        }) || [];
    }, [selectedNote, categories]);

    // tagNames useMemo ile hesaplanıyor
    const tagNames = useMemo(() => {
        if (!selectedNote || tags.length === 0) return [];
        return selectedNote.tags?.map(tagId => {
            const tag = tags.find(t => t.id === tagId);
            return tag ? tag.tagsName : "Bilinmeyen";
        }) || [];
    }, [selectedNote, tags]);

    if (!selectedNote) {
        return <p className='text-notWhite text-lg pt-24 pl-24'>Bir not seçiniz.</p>;
    }

    const noteDate = selectedNote.createdAt
        ? new Date(
            selectedNote.createdAt.toDate
                ? selectedNote.createdAt.toDate()
                : selectedNote.createdAt
        ).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        : "Tarih yok";

    return (
        <div className='space-y-6 w-4/5 pt-24 pl-24'>
            <div>
                s
            </div>
            <div className='space-y-3 border-opacity-20 rounded-xl p-6'>
                <div className='flex justify-between text-notBlue'>
                    <span className='text-notWhite text-3xl'>{selectedNote.title}</span>
                    <div className="relative">
                        <button onClick={() => setOptions(prev => !prev)}>
                            <BsThreeDotsVertical className='text-notBlue' />
                        </button>
                        {options && <div className='absolute right-0'><OptionsSelect note={selectedNote} /></div>}
                    </div>
                </div>

                <div className='flex gap-10'>
                    {/* Kategoriler */}
                    <div className='flex items-center text-notWhite gap-3'>
                        <FaFolder className='text-notBlue' />
                        <div className='flex gap-2 flex-wrap'>
                            {categoryNames.length > 0 ? (
                                categoryNames.map((name, index) => {
                                    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
                                    return (
                                        <span
                                            key={index}
                                            className={`text-sm px-2 py-0.5 ${randomColor} rounded-md text-notGrey4`}
                                        >
                                            {name}
                                        </span>
                                    );
                                })
                            ) : (
                                <span className='text-sm text-gray-300'>Etiket yok</span>
                            )}
                        </div>
                    </div>

                    {/* Tarih */}
                    <div className='flex items-center text-notWhite gap-3'>
                        <IoTime className='text-notBlue' />
                        <span className='text-sm'>
                            {noteDate}
                        </span>
                    </div>

                    {/* Etiketler */}
                    <div className='flex gap-2'>
                        <LiaHashtagSolid className='text-notBlue text-2xl' />
                        <div className='flex gap-2 flex-wrap'>
                            {tagNames.length > 0 ? (
                                tagNames.map((name, index) => {
                                    const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
                                    return (
                                        <span
                                            key={index}
                                            className={`text-sm px-2 py-0.5 ${randomColor} rounded-md text-notGrey4`}
                                        >
                                            {name}
                                        </span>
                                    );
                                })
                            ) : (
                                <span className='text-sm text-gray-300'>Etiket yok</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className='bg-notWhite w-full bg-opacity-30 h-0.5'></div>
                <div className='text-notWhite whitespace-pre-wrap'>{selectedNote.content}</div>
            </div>
        </div>
    );
}

export default Notepad;
