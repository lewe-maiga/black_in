import type {Beats} from "@database/models/beats";
import Image from "next/image";
import {useAudioContext} from "@components/audio/hooks";
import { getFileLink } from "@lib/utils";

export const Card = ({beat}: {beat: Beats}) => {
    const {toggleAudioUrl} = useAudioContext();
    return (
        <>
            
                <li className="card">
                    <div className="image" tabIndex={-1}>
                        <Image
                            src={getFileLink(beat.image.key)}
                            className="img"
                            alt={`cover de l'instrumental ${beat.image.name}`}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={getFileLink(beat.image.key)}
                        />
                        <div className="option">
                            <div className="icones">
                                <button className="icon" aria-label="voir plus de detail">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--ph"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 256 256">
                                        <path
                                            fill="currentColor"
                                            d="M156 128a28 28 0 1 1-28-28a28.1 28.1 0 0 1 28 28ZM48 100a28 28 0 1 0 28 28a28.1 28.1 0 0 0-28-28Zm160 0a28 28 0 1 0 28 28a28.1 28.1 0 0 0-28-28Z"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => toggleAudioUrl(beat)}
                                    className="icon"
                                    aria-label="lancer la lecture de la musique"
                                    >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--material-symbols"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888q.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z"></path>
                                    </svg>
                                </button>
                                <button className="icon" aria-label="ajouter au panier">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--clarity"
                                        width="32"
                                        height="32"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 36 36">
                                        <circle
                                            cx="13.33"
                                            cy="29.75"
                                            r="2.25"
                                            fill="currentColor"
                                            className="clr-i-outline clr-i-outline-path-1"></circle>
                                        <circle
                                            cx="27"
                                            cy="29.75"
                                            r="2.25"
                                            fill="currentColor"
                                            className="clr-i-outline clr-i-outline-path-2"></circle>
                                        <path
                                            fill="currentColor"
                                            d="M33.08 5.37a1 1 0 0 0-.77-.37H11.49l.65 2H31l-2.67 12h-15L8.76 4.53a1 1 0 0 0-.66-.65L4 2.62a1 1 0 1 0-.59 1.92L7 5.64l4.59 14.5l-1.64 1.34l-.13.13A2.66 2.66 0 0 0 9.74 25A2.75 2.75 0 0 0 12 26h16.69a1 1 0 0 0 0-2H11.84a.67.67 0 0 1-.56-1l2.41-2h15.44a1 1 0 0 0 1-.78l3.17-14a1 1 0 0 0-.22-.85Z"
                                            className="clr-i-outline clr-i-outline-path-3"></path>
                                        <path
                                            fill="none"
                                            d="M0 0h36v36H0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <span className="price">{beat.price}</span>
                    </div>
                    <div>
                        <h3 className="title">{beat.title}</h3>
                        <span className="info">
                            {beat?.genre},{" "}
                            {new Date(beat.created_at).toLocaleDateString("fr")}
                        </span>
                    </div>
                </li>
             
            
            <style jsx>{`
                
                .card {
                    display: flex;
                    flex-direction: column;
                    animation: view 0.6s ease-out;
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


                .option {
                    position: absolute;
                    top: -100%;
                    width: 100%;
                    height: 100%;
                    background: #ffffff91;
                    z-index: 10;
                    transition: top 0.45s ease-in-out;
                }

                .icones {
                    display: flex;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #000000b5;
                    width: 50px;
                    height: 50px;
                    border: 1px solid var(--ternary);
                    border-radius: 50%;
                    color: var(--ternary);
                    cursor: pointer;
                    transition: box-shadow 0.4s ease-in-out;
                }
                .icon:nth-child(2) {
                    margin: 0 18px;
                    background: var(--primary);
                    border: none;
                    color: var(--secondary);
                    transform: scale(1.2);
                }
                .icon svg {
                    width: 32px;
                    height: 32px;
                }
                .icon:hover {
                    box-shadow: 0 0 20px #ffffffa6;
                }

                .icon:hover {
                    box-shadow: 0 0 20px #ffffffa6;
                }
                .icon svg {
                    width: 25px;
                    height: 25px;
                }

                .image:hover > .option, .image:focus-within > .option {
                    top: 0;
                }
                .price {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    padding: 2px;
                    display: flex;
                    justify-content: center;
                    width: 65px;
                    height: 20px;
                    font-size: 10px;
                    background: var(--primary);
                    color: #0a0a0a;
                    font-weight: 700;
                }
                .info {
                    font-size: 10px;
                    color: #595959;
                }
                .title {
                    font-size: 12px;
                    margin: 1rem 0.5rem 0.2rem 0;
                }

                .content {
                    padding: 15px 0 0;
                }
                
                @keyframes view {
                    from {
                        transform: scale(0);
                    }
                }
            `}</style>
        </>
    );
};


