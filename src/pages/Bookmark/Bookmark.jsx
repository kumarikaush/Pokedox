//Bookmark Page

import { BookmarkList, Bookmarkempty } from "./components";
import { useBookmark } from "../../context/bookmarkcontext";

export const Bookmark = () => {
    const { bookmarklist } = useBookmark();
    return (
        <section>
            {bookmarklist.length !== 0 ? <BookmarkList /> : <Bookmarkempty />}

        </section>
    )
}
