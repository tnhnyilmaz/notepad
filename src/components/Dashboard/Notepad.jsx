import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { LiaHashtagSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { AllCategories } from '../../redux/categoryReducer';
import { AllTags } from '../../redux/tagsReducer';
import OptionsSelect from './OptionsSelect';

const Notepad = ({ selectedNote }) => {
    const [options, setOptions] = useState(false);
    const categories = useSelector((state) => state.categories.categories);
    const tags = useSelector((state) => state.tags.tags);

    const [categoryNames, setCategoryNames] = useState([]);
    const [tagNames, setTagNames] = useState([]);
    const tagColors = ['bg-notBlue', 'bg-notRed', 'bg-notYellow', 'bg-notGreen'];

    const dispatch = useDispatch();
    console.log("q");

    useEffect(() => {
        dispatch(AllCategories());
        dispatch(AllTags());

    }, [dispatch]);

    // Seçili notun kategori isimlerini bul
    useEffect(() => {
        console.log("tags:", tags);
        if (selectedNote) {
            // Kategori eşlemesi
            if (Array.isArray(selectedNote.categories) && categories.length > 0) {
                const names = selectedNote.categories.map((catId) => {
                    const category = categories.find((cat) => cat.id === catId);
                    return category ? category.categoryName : "Bilinmeyen";
                });
                setCategoryNames(names);
            } else {
                setCategoryNames([]);
            }
        }

        if (selectedNote) {
            // Kategori eşlemesi
            if (Array.isArray(selectedNote.tags) && tags.length > 0) {
                const names = selectedNote.tags.map((tagId) => {
                    const tag = tags.find((tag) => tag.id === tagId);
                    return tag ? tag.tagsName : "Bilinmeyen";
                });
                setTagNames(names);
            } else {
                setTagNames([]);
            }
        }
    }, [selectedNote, categories, tags]);
    console.log("bitişşş:", tagNames)

    if (!selectedNote) {
        return <p className='text-notWhite text-lg pt-24 pl-24'>Bir not seçiniz.</p>;
    }
    const noteDate = selectedNote.createdAt // gelen tarihi tr tarihine çevirme
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
                    <button onClick={() => setOptions(!options)}>
                        <BsThreeDotsVertical className='text-notBlue' />
                    </button>
                    {options && <div className='absolute  right-1/3 mr-3    '><OptionsSelect note={selectedNote} /></div>} {/* update delete modalini açma   */}
                </div>

                <div className='flex gap-10'>
                    {/*gelen kategori adlarını etiket haline getirme*/}
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
                    {/*tarih*/}
                    <div className='flex items-center text-notWhite gap-3'>
                        <IoTime className='text-notBlue' />
                        <span className='text-sm'>
                            {noteDate}
                        </span>
                    </div>
                    {/**a Etiketlerin ekranda görünmesi */}
                    <div className='flex gap-2'>
                        <LiaHashtagSolid className='text-notBlue text-2xl' />
                        <div className='flex gap-2 flex-wrap'> {/*gelen kategori adlarını etiket haline getirme*/}
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

export default Notepad