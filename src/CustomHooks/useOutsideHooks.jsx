import { useEffect } from "react";

const useOutsideClick = (ref, callback, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(); //dışarı tıkladığımızda istenilen işlem callback ile çağırılıyor
            }
        };

        document.addEventListener("mousedown", handleClickOutside); //click dinlemeye yarar
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback, enabled]);
};

export default useOutsideClick;
