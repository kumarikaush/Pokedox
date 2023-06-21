//rendered when bookmark contain some items

import { useBookmark } from "../../../context/bookmarkcontext";
import { Card } from "../../../components";

export const BookmarkList = () => {
  const { bookmarklist, total, removeAll } = useBookmark();
  console.log(bookmarklist)
  return (
    <section>
      {bookmarklist &&
        <div className="relative p-2">
          <h1 className="text-center text-2xl mt-12">Total: {total}</h1>
          <button onClick={() => removeAll()} className="absolute top-2 right-2 bg-blue-600 px-4 py-2 text-lg text-slate-100 rounded-lg">
            Clear All
          </button>
          <div className="md:m-10 md:p-10 m-2 p-5 flex flex-wrap justify-center gap-6">
            {bookmarklist.map((data, index) => (<Card pokeData={data} key={index} />))}
          </div>
        </div>
      }
    </section>
  )
}
