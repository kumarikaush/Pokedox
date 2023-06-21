//This will render when an error is resulted while fetching data from API

import Errs from "../assets/errs.jpg";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
    return (
        <section>
            <div className="w-2/4 mx-auto my-10 flex flex-col gap-10">
                <h1 className="text-center text-2xl">Oops!... Error</h1>
                <img className="rounded h-auto w-auto mx-auto" src={Errs} alt="error" />
                <div className="text-center">
                    <Link to="/" className="bg-blue-600 px-4 py-2 text-lg text-slate-100 rounded-lg">Back to Home</Link>
                </div>
            </div>
        </section>
    )
}
