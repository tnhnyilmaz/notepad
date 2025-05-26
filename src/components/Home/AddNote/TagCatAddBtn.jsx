import React from 'react'

const TagCatAddBtn = ({cat,newCat,addCategory}) => {
    return (
        <div className='flex gap-5'>
            <button
                onClick={cat}
                className='bg-notBlue text-xs px-2 py-1 rounded-md text-notWhite w-fit'
            >
                + Add Category
            </button>
            <button
                type="button"
                onClick={() => newCat(!addCategory)}
                className='bg-notBlue text-xs px-2 py-1 rounded-md text-notWhite w-fit'
            >
                + Add New Category
            </button>

        </div>
    )
}

export default TagCatAddBtn