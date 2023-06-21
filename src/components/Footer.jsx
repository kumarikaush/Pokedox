import { Link } from "react-router-dom";
export const Footer = () => {
    return (

        <footer className="bg-white rounded-lg border-t dark:bg-gray-800">
            <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className="hover:underline">Pokedox™</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>

    )
}
