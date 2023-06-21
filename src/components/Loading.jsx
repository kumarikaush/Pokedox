//Rendered when data is being fetched

import ReactLoading from "react-loading";

export const Loading = () => {
    return (
        <section>

            <div className="md:w-96 h-96 mx-auto my-12 flex justify-center">
                <ReactLoading type="spokes" color="#A0C49D"
                    height={100} width={50} />
            </div>

        </section>
    )
}
