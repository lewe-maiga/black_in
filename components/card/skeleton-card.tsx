
export const SkeletonCard = () => {
    return(
        <>
            <li className="card">
                <div className="image skeleton-anim"></div>
                <div className="content">
                    <h3 className="skeleton-title skeleton-anim"></h3>
                    <span className="skeleton-info skeleton-anim"></span>
                </div>
            </li>
            <style jsx>{`
            .card {
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .image {
                    background: #4c4c4c;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 300px;
                    max-height: 310px;
                }
                .image.skeleton-anim {
                    animation: skeleton 0.8s ease-in-out infinite alternate;
                }

                .skeleton-title,
                .skeleton-info {
                    background: #4c4c4c;
                    animation: skeleton 0.8s ease-in-out infinite alternate;
                    width: 60%;
                }
                .skeleton-title {
                    height: 20px;
                    width: 90%;
                    margin: 0.2rem 0.5rem 0.2rem 0;
                }
                .skeleton-info {
                    display: inline-block;
                    margin-top: 10px;
                    height: 10px;
                }

                @keyframes skeleton {
                    to {
                        opacity: 0.6;
                    }
                }
            `}</style>
        </>
    )
}