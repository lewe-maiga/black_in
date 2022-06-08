import {
    ChangeEvent,
    MouseEventHandler,
    useCallback,
    useEffect,
    useState,
} from "react";
import Image from "next/image";
import {fetcher} from "@lib/utils";
import {Beats} from "@database/models/beats";

type SearchBarProps = {
    active: boolean;
    onClose: MouseEventHandler<HTMLButtonElement>;
};
const endpoint = "/api/beats/search";

export const SearchBar = ({onClose, active}: SearchBarProps) => {
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<Beats[]>([]);
    const fetchData = useCallback(async () => {
        if (searchText !== "") {
            const {beats} = await fetcher(`${endpoint}?text=${searchText}`);
            setSearchResult(beats);
        } else {
            setSearchResult([]);
        }
    }, [searchText]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const searchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <>
            <div className={`search-container ${active ? "active" : ""}`}>
                <div className="search-box">
                    <div className="close-container">
                        <button
                            className="close"
                            onClick={onClose}
                            name="close"
                            aria-label="fermer la barre de recherche"
                        />
                    </div>
                    <div className="searchbar">
                        <input
                            type="text"
                            value={searchText}
                            className="text"
                            onChange={searchTextChange}
                            id="searchText"
                        />
                        <label htmlFor="searchText">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--tabler icon"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <use xlinkHref="#icon"> </use>
                        </svg>
                        </label>
                    </div>
                </div>
                <div className="filter">
                    <ul className="search-list">
                        {searchText.length > 0 || searchResult.length > 0 ? (
                            searchResult.map((beat) => (
                                <li key={beat._id} className="list">
                                    <span className="image">
                                        <Image
                                            src={`/api/upload/${beat.image.key}`}
                                            alt={`cover de l'instrumental ${beat.image.name} contenant la chaine ${searchText}`}
                                            objectFit="cover"
                                            layout="fill"
                                        />
                                    </span>
                                    <h3 className="title">{beat.title}</h3>
                                </li>
                            ))
                        ) : (
                            <>
                                
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className="background" />

            <style jsx>{`
                .background {
                    display: none;
                    visibility: hidden;
                }
                .search-box {
                    display: flex;
                    position: sticky;
                    flex-direction: column;
                    top: 0;
                    padding-top: 1rem;
                    margin-bottom: 20px;
                    z-index: 10;
                    height: 120px;
                }
                .search-list {
                    display: grid;
                    width: 100%;
                    grid-template-columns: repeat(
                        auto-fit,
                        minmax(120px, 130px)
                    );
                    grid-auto-rows: min-content;

                    justify-content: center;
                    grid-gap: 20px;
                    height: 100%;
                }
                .search-list .list {
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                .search-list .list .image {
                    max-width: 145px;
                    overflow: hidden;
                    border-radius: 10px;
                    position: relative;
                    display: flex;
                    width: 100%;
                    height: 120px;
                }
                .search-list .list .title {
                    display: flex;
                    width: 100%;
                    max-width: 145px;
                    font-size: 12px;
                    margin-top: 5px;
                }
                .filter {
                    display: flex;

                    width: 100%;
                }

                .search-container {
                    position: fixed;
                    overflow: auto;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: #fff8f8;
                    z-index: 100;
                    padding: 0 1rem;
                    transition: 0.4s;
                    max-width: 700px;
                    max-height: 500px;
                    border-radius: 20px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .close {
                    position: relative;
                    right: 0;
                    top: 0;
                    margin-bottom: 1rem;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    background: transparent;
                }
                .close-container {
                    display: flex;
                    position: relative;
                    justify-content: end;
                }
                .close::before,
                .close::after {
                    content: "";
                    transform: ;
                    width: 100%;
                    height: 3px;
                    border-radius: 5px;
                    position: absolute;
                    background: crimson;
                }
                .close::before {
                    transform: translate(-50%, -50%) rotate(45deg);
                }
                .close::after {
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
                .searchbar {
                    display: flex;
                    position: absolute;
                    width: 80%;
                    left: 50%;
                    top: 70%;
                    transform: translate(-50%, -50%);
                    border: 2px solid var(--ternary);
                    border-radius: 28px;
                    padding: 5px;
                    max-width: 260px;
                    
                }

                .searchbar .text {
                    border: none;
                    padding: 2px 5px;
                    width: 100%;
                    text-overflow: ellipsis;
                }
                .searchbar label{
                    display: flex;
                    width: 30px;
                    min-width: 30px;
                    background: var(--primary);
                    height: 30px;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    

                }
                .searchbar label svg{
                    width: 15px;
                    height: 15px;
                    color: #fff8f8;
                }
                

                .text:focus {
                    outline: none;
                }
                .searchbar .icon {
                    width: 20px;
                    height: 20px;
                }

                .a:hover {
                    transform: scale(1.2);
                }
                .search-container.active {
                    left: -100%;
                }
                .search-container.active ~ .background {
                    display: none;
                    visibility: hidden;
                }

                .search-container {
                    
                }
                .background {
                    display: flex;
                    visibility: visible;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    opacity: 0.8;
                }

                @media only screen and (max-width: 500px) {
                    .search-container{
                        border-radius: 0;
                        max-height: 100vh;
                    }
                   
                }
            `}</style>

            <style jsx global>
                {`
                    body {
                        overflow: ${!active ? "hidden" : "visible"};
                    }
                `}
            </style>
        </>
    );
};
