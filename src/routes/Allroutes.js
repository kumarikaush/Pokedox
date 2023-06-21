//Listing all routes

import { Routes, Route } from "react-router-dom";

import { Listing, Pagenotfound, Bookmark, Detail } from "../pages";
export const Allroutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="pokemon/:name" element={<Detail />} />
            <Route path="*" element={<Pagenotfound />} />
        </Routes>
    )
}
