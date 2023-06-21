//Card containing pokemon name,image and bookmark buttons

import { Link } from "react-router-dom";
import { useBookmark } from "../context/bookmarkcontext";

export const Card = ({ pokeData }) => {

    const { bookmarklist, add, remove } = useBookmark();
    const isPresent = bookmarklist.find((item) => (pokeData.name === item.name));

    return (

        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg dark:bg-gray-800">

            <Link to={`/pokemon/${pokeData.name}`}>
                <img className="p-8 h-60 w-60 mx-auto rounded-t-lg" src={pokeData.sprites.other.dream_world.front_default} alt="pokemon" />
            </Link>

            <div className="px-5 pb-5">
                <Link to={`/pokemon/${pokeData.name}`}>
                    <h5 className="text-5xl text-center font-medium tracking-tight text-gray-900 dark:text-white capitalize">{pokeData.name}</h5>
                </Link>

                <div className="flex justify-end gap-2 text-2xl">
                    {isPresent
                        ? <button onClick={() => remove(pokeData)}><i className="bi bi-bookmark-check-fill"></i></button>
                        : <button onClick={() => add(pokeData)}><i className="bi bi-bookmark"></i></button>
                    }

                </div>
            </div>

        </div>

    )
}
