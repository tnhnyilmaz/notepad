import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllCategories } from '../../../redux/categoryReducer';
import TagCatAddBtn from './TagCatAddBtn';

const SelectCategory = ({ selectedCategories, setSelectedCategories }) => {
    const { categories } = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    const [addCategory, setAddCategory] = useState(false);
    const [localSelectedCategories, setLocalSelectedCategories] = useState([]);
console.log("selctcategory render edilid")
    // Redux'tan kategorileri çek
    useEffect(() => {
        dispatch(AllCategories());
    }, [dispatch]);

    // Üst bileşenden gelen seçili kategorileri başlat
    useEffect(() => {
        if (selectedCategories.length > 0) {
            setLocalSelectedCategories(selectedCategories);
        } else {
            setLocalSelectedCategories([""]); // en az bir kategori inputu göster
        }
    }, [selectedCategories]);
  
    const handleCategoryChange = (index, value) => {
        const updated = [...localSelectedCategories];
        updated[index] = value;
        setLocalSelectedCategories(updated);
        setSelectedCategories(updated);
    };

    const handleAddCategory = () => {
        const updated = [...localSelectedCategories, ""];
        setLocalSelectedCategories(updated);
        setSelectedCategories(updated);
    };

    const handleRemoveCategory = (indexToRemove) => {
        const updated = localSelectedCategories.filter((_, i) => i !== indexToRemove);
        setLocalSelectedCategories(updated);
        setSelectedCategories(updated);
    };
    const categoryOptions = useMemo(() => {
        return categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.categoryName}
            </option>
        ));
    }, [categories]);
    return (
        <div>
            <div className="text-black text-md font-semibold mb-1 text-notWhite">Categories</div>

            {localSelectedCategories.map((cat, index) => (
                <div key={index} className="flex items-center mb-2">
                    <select
                        value={cat}
                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mr-2"
                    >
                        <option value="">Seçiniz</option>
                        {categoryOptions}
                    </select>
                    <button
                        type="button"
                        onClick={() => handleRemoveCategory(index)}
                        className="text-red-500 text-lg"
                    >
                        &times;
                    </button>
                </div>
            ))}
            <TagCatAddBtn cat={handleAddCategory} newCat={setAddCategory} addCategory={addCategory} />

            {addCategory && <AddCategoryModal onClose={() => setShowCategoryModal(false)} />}
        </div>
    );
}

export default SelectCategory