import React from 'react';

const DeleteModal = ({setDeleteModal,onDelete,note}) => {
    return (
        <div className='w-full h-full bg-notGrey5 bg-opacity-80 fixed top-0 left-0 flex items-center justify-center z-50'>
            <div className='w-1/3 h-1/3 relative gap-4 bg-notGrey1 border border-notBlue p-4 flex flex-col items-center justify-center rounded-lg shadow-lg'>
                <span className='text-3xl font-bold text-notWhite'>{note.title}</span>
                <p className='text-notWhite text-center'>Bu notunuzu silmek istediğinize emin misiniz?</p>
                <div className='flex gap-4 w-full px-8 mt-4'>
                    <button onClick={() => { onDelete(); setDeleteModal(false); }} className='flex-1 h-10 bg-notRed text-notWhite rounded-md hover:bg-red-700 transition'>Sil</button>
                    <button onClick={() => setDeleteModal(false)} className='flex-1 h-10 bg-notGrey4 text-notWhite rounded-md hover:bg-notGrey3 transition'>Vazgeç</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal