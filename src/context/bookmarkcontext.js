//A context for bookmarklist

import { createContext, useContext, useReducer } from "react";
import { Bookmarkreducer } from "../reducers/bookmarkreducer";

//fetching saved items from localstorage
const list = JSON.parse(localStorage.getItem("bookmark")) || [];
const total = JSON.parse(localStorage.getItem("totalPoke")) || 0;

const initial = {
    bookmarklist: list,
    total: total
}

const bookmarkContext = createContext(initial);


export const BookmarkProvider = ({ children }) => {

    const [state, dispatch] = useReducer(Bookmarkreducer, initial);

    //adding items to bookmark
    function add(item) {
        const updated = state.bookmarklist.concat(item);
        const tot = state.total + 1;
        dispatch({
            type: "Add",
            payload: {
                res: updated,
                total: tot
            }
        })
        localStorage.setItem("bookmark", JSON.stringify(updated));
        localStorage.setItem("totalPoke", JSON.stringify(tot));
    }

    //removing items from bookmark
    function remove(item) {
        const updated = state.bookmarklist.filter((data) => (data.name !== item.name));
        const tot = state.total - 1;
        dispatch({
            type: "Add",
            payload: {
                res: updated,
                total: tot
            }
        })
        localStorage.setItem("bookmark", JSON.stringify(updated));
        localStorage.setItem("totalPoke", JSON.stringify(tot));
    }

    //clearing all bookmark
    function removeAll() {
        dispatch({
            type: "All",
            payload: {
                res: [],
                total: 0
            }
        })
        localStorage.removeItem("bookmark");
        localStorage.removeItem("totalPoke");
    }

    const value = {
        bookmarklist: state.bookmarklist,
        total: state.total,
        add,
        remove,
        removeAll,
    }

    return (
        <bookmarkContext.Provider value={value}>
            {children}
        </bookmarkContext.Provider>
    )
}

export const useBookmark = () => useContext(bookmarkContext);


