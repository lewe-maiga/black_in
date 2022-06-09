import { SkeletonCard } from "./skeleton-card"

type SkeletonProps = {
    howMuch: number
}

export const SkeleTon = ({howMuch}: SkeletonProps ) => {
    return(
        <>
            <ul className="card-grid">
                
                {Array(howMuch)
                          .fill(null)
                          .map((_, index) => <SkeletonCard key={index + 1} />)}
            </ul>

            <style jsx>{`
                .card-grid {
                        display: grid;
                        grid-template-columns: repeat(
                            auto-fill,
                            minmax(250px, 1fr)
                        );
                        grid-gap: 20px;
                        margin-top: 30px;
                        width: 100%;
                        max-width: 1440px;
                        overflow: hidden;
                    }

                    @media only screen and (min-width: 1400px) {
                        .card-grid {
                            grid-template-columns: repeat(
                                4,
                                minmax(250px, 1fr)
                            );
                        }
                    }
            `}</style>
        </>
    )
}