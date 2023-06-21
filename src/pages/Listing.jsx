// Contains list of pokemons

import { useEffect, useState } from "react";

import { Card, Loading, ErrorPage } from "../components";

export const Listing = () => {
    const [filtershow, setFiltershow] = useState(false);

    const [loading, setLoading] = useState(true);

    const [errs, setErr] = useState(null);

    const [type, setType] = useState([]);

    const [offset, setOffset] = useState(0);
    const [item, setItem] = useState([]);

    //getting pokemon data 10 per page
    useEffect(() => {
        setLoading(true);
        setErr(null);
        async function fetchData() {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
                const json = await res.json();

                const promises = json.results.map(async (data) => {
                    try {
                        const res = await fetch(data.url);
                        const json = await res.json();
                        return json;
                    }
                    catch (err) {
                        setErr(err);
                        return err;
                    }
                })
                const temp = await Promise.all(promises);
                setLoading(false);
                setItem([...item, ...temp]);
            }
            catch (err) {
                setLoading(false);
                setErr(err);
            }
        }
        fetchData();

    }, [offset])


    //update offset when scrolled to the end of page
    function handleScroll() {
        try {
            if ((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight) {
                setOffset(offset + 10);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //listening to the scroll event and removing once reached the end
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [offset])



    //getting all types of pokemon to keep the type name in filterbox
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch("https://pokeapi.co/api/v2/type");
                const json = await res.json();
                setLoading(false);
                setType(json.results);
            }
            catch (err) {
                setLoading(false);
                setErr(err);
            }
        }
        fetchData();
    }, [])


    //updating list when user select a particular type from filter box
    async function handleClick(pokename) {
        setItem([]);
        setLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/type/${pokename}`);
        const json = await res.json();
        const promises = json.pokemon.map(async (data) => {
            try {
                const res = await fetch(data.pokemon.url);
                const json = await res.json();
                setLoading(false);
                return json;
            }
            catch (err) {
                setLoading(false);
                setErr(err);
                return err;
            }
        })
        const temp = await Promise.all(promises);
        setLoading(false);
        setItem([...temp]);
    }


    //removing filter box when clicked outside of the box
    if (filtershow) {
        document.getElementById('lists').addEventListener("mousedown", (event) => {
            const filter = document.getElementById('filter');
            if (!filter.contains(event.target)) {
                setFiltershow(false);
            }
        })
    }



    return (
        <section id="lists">

            <div className=" relative pt-5">

                <button onClick={() => setFiltershow(!filtershow)} className="hidden absolute md:block top-3 right-10 text-xl bg-slate-200 rounded-lg p-2">
                    <i className="bi bi-funnel"></i>
                </button>

                <div id="filter" className={`w-80 h-full border shadow z-40 bg-slate-50 fixed top-0 p-2 ${!filtershow && "hidden"}`}>
                    <div className="flex justify-between items-center text-xl border-b">
                        <h2>Filter by "<span className="text-teal-600">TYPE</span>"</h2>
                        <button onClick={() => setFiltershow(false)} className="text-red-900 bg-white p-2 rounded-md">X</button>
                    </div>
                    <div>
                        {type &&
                            <div className="flex flex-wrap gap-4 text-white text-lg mt-10">
                                {type.map((item, index) => (
                                    <button onClick={() => handleClick(item.name)} className="bg-purple-600 py-2 px-4 rounded-full capitalize cursor-pointer" key={index}>{item.name}</button>
                                ))}
                            </div>}

                    </div>
                    <button onClick={() => window.location.reload(true)} className="bg-blue-600 px-4 py-2 text-lg text-slate-100 rounded-lg mt-4" >Clear All</button>
                </div>


                {loading ? <Loading />
                    : <>
                        {errs
                            ? <ErrorPage />
                            : <div className="md:m-10 md:p-10 m-2 p-5 flex flex-wrap justify-center gap-6">
                                {item.length !== 0 && item.map((data, index) => (<Card pokeData={data} key={index} />))}
                            </div>
                        }
                    </>
                }

            </div>

        </section>
    )
}
