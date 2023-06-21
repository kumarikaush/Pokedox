//rendered when bookmark is empty

import { Link } from "react-router-dom"
export const Bookmarkempty = () => {
    return (
        <section>
            <div className="w-2/4 md:my-28 md:p-10 p-5 my-12 text-center mx-auto shadow-lg">
                <div className="text-6xl mb-5"><i className="bi bi-heart-fill"></i></div>
                <h2 className="text-2xl mb-4">Looks like you chose no one as faviorate</h2>
                <Link to="/" className="bg-blue-600 px-4 py-2 text-lg text-slate-100 rounded-lg">Back to choose</Link>
            </div>
        </section>
    )
}
