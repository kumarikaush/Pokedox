//Pokemon detail page

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useBookmark } from "../context/bookmarkcontext";
import { Loading, ErrorPage } from "../components";

export const Detail = () => {
    const { bookmarklist, add, remove } = useBookmark();

    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({})
    const [errs, setErr] = useState(null);
    const params = useParams();

    const isPresent = bookmarklist.find((items) => (items.name === params.name));

    //Fetching detail of clicked pokemon
    useEffect(() => {
        setLoading(true);
        setErr(null);
        async function fetchData() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}/`);
            await res.json()
                .then((data) => {
                    setLoading(false);
                    setItem(data);
                })
                .catch((err) => {
                    setLoading(false);
                    setItem({});
                    setErr(err);
                });
        }
        fetchData()

    }, [params.name])


    return (
        <section>
            <div className="md:m-10 m-5 md:p-10 p-2 border shadow-xl rounded-lg">

                {loading ? <Loading /> : (
                    <>
                        {errs && <ErrorPage />}

                        {Object.keys(item).length !== 0 &&
                            <>
                                < div>
                                    <img className="mx-auto rounded-t-lg" src={item.sprites.other.dream_world.front_default} alt="pokemon" />

                                    <div className="flex  justify-center gap-10 mx-auto text-3xl mt-5">
                                        <h5 className=" text-center tracking-tight text-gray-900 dark:text-white capitalize">{item.id}</h5>
                                        <h5 className=" font-bold text-center tracking-tight text-gray-900 dark:text-white capitalize">{item.name}</h5>
                                    </div>

                                </div>

                                <div className="md:w-2/4 md:p-5 p-1 mx-auto mt-24 md:shadow-xl rounded-lg">

                                    <div className="grid grid-cols-2 mb-2">
                                        <h6 className="font-semibold text-xl ">Types:</h6>
                                        <div className="flex flex-wrap gap-4 justify-start">
                                            {item.types.map((type, index) =>
                                                (<div className="text-lg  text-slate-100 capitalize bg-lime-500 p-2 rounded-full" key={index}>{type.type.name}</div>)
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 mb-2">
                                        <h6 className="font-semibold text-xl ">Abilities</h6>
                                        <div className="flex flex-wrap gap-4 justify-start">
                                            {item.abilities.map((ability, index) =>
                                                (<div className="text-lg capitalize  text-slate-100 bg-teal-400 p-2 rounded-full" key={index}>{ability.ability.name}</div>)
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 mb-2">
                                        <h6 className="font-semibold text-xl ">Height</h6>
                                        <div className="flex flex-wrap gap-4 justify-start">
                                            <div className="bg-cyan-900 text-slate-100 px-4 py-2 rounded-full">{item.height}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 mb-2">
                                        <h6 className="font-semibold text-xl ">Weight</h6>
                                        <div className="flex flex-wrap gap-4 justify-start">

                                            <div className="bg-cyan-900 text-slate-100 px-4 py-2 rounded-full">{item.weight}</div>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-2 mb-2">
                                        <h6 className="font-semibold text-xl ">Stats</h6>
                                        <div className="flex flex-wrap justify-start gap-4">

                                            {item.stats.map((stat, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className="text-lg font-medium capitalize bg-indigo-700 text-slate-100 rounded-lg p-2" >{stat.stat.name}: <span>{stat.base_stat}</span></div>
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-5 gap-2 text-2xl">
                                        {isPresent
                                            ? <button onClick={() => remove(item)}><i className="bi bi-bookmark-check-fill"></i></button>
                                            : <button onClick={() => add(item)}><i className="bi bi-bookmark"></i></button>
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </>
                )}

            </div>
        </section >
    )
}
