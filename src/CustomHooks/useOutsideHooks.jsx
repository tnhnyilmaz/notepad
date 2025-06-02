import { useEffect } from "react";

const useOutsideClick = (ref, callback, enabled = true) => {
    useEffect(() => {
        if (!enabled || !ref?.current) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, callback, enabled]);
};

export default useOutsideClick;
