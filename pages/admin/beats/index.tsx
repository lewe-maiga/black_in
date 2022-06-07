import type {GetStaticProps} from "next";
import {fetcher, getFileLink, parser} from "@lib/utils";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {useToken} from "@lib/hooks";
import {useRouter} from "next/router";
import {Spinner} from "@components/spinner";
import BeatsModel, {Beats} from "@database/models/beats";
import useSWR from "swr";
import Image from "next/image";
import {NeastedLayout} from "@components/admin/nested-layout";
import Link from "next/link";
import { dbConnect } from "@database/mongodb";

type AdminProps = {
    _beats: {beats: Beats[]};
};
const Admin = ({_beats}: AdminProps) => {
    const [state, setState] = useState<Beats[]>([]);
    const {token} = useToken();
    const router = useRouter();
    const {data, error, mutate} = useSWR("/api/beats?all", fetcher, {
        fallbackData: _beats,
    });
    const [checked, setChecked] = useState<string[]>([]);

    useEffect(() => {
        if (!token) {
            router.push("/admin/register");
        }
    }, [token, router]);

    useEffect(() => {
        if (data) setState(data.beats);
    }, [data]);

   

    const onDeleteBeat = async () => {
        const endpoint = "/api/beats";

        const body = {
            _ids: checked,
        };

        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const beats = await response.json();
            mutate({...beats});
        }
    };

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };
    const filterData = (event: ChangeEvent<HTMLInputElement>) => {
        const searchedString = event.target.value
            .toLowerCase()
            .replace(/\s/g, "");
        const filteredData = data.beats.filter(
            (el: Beats) =>
                el.title.toLowerCase().includes(searchedString) ||
                el.title
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .includes(searchedString)
        );
        setState(filteredData);
    };
    if (error) return error;
    if (!data)
        return (
            <>
                <Spinner />
            </>
        );
    return (
        <>
            <div className="action">
                <div className="input-control">
                    <label htmlFor="search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--tabler icon"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <g
                                id="icon"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2">
                                <circle cx="10" cy="10" r="7"></circle>
                                <path d="m21 21l-6-6"></path>
                            </g>
                        </svg>
                    </label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search for beats"
                        onChange={filterData}
                    />
                </div>
                <Link href="/admin/beats/create">
                    <a>Create</a>
                </Link>
            </div>
            <h2 className="main-title">Beats</h2>

            <div className="table">
                <h3 className="table-title">Title</h3>
                <h3 className="table-title">Create At</h3>
                <h3 className="table-title">Status</h3>

                <div>
                    {checked.length > 0 && (
                        <button onClick={onDeleteBeat} className="drop">
                            Supprimer
                        </button>
                    )}
                </div>
            </div>

            <div className="table-results">
                {state.map((beat) => (
                    <div className="table-item" key={beat._id}>
                        <div className="drop-element">
                            <input
                                value={beat._id}
                                type="checkbox"
                                className="drop"
                                onChange={handleCheck}
                            />
                        </div>
                        <Link href={`/admin/beats/${beat._id}`}>
                            <a>
                                <div className="container-image">
                                    <span className="image">
                                        <Image
                                            layout="fill"
                                            src={getFileLink(beat.image.key)}
                                            alt={`image de l'instrumental ${beat.title}`}
                                            objectFit="cover"
                                        />
                                    </span>
                                    <p className="title">{beat.title}</p>
                                </div>
                                <p className="created_at">
                                    {new Date(
                                        beat.created_at
                                    ).toLocaleDateString("fr")}
                                    ,{" "}
                                    {new Date(
                                        beat.created_at
                                    ).toLocaleTimeString("fr")}
                                </p>
                                <p className="status">
                                    {beat.published ? "publié" : "non publié"}
                                </p>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>

            <style jsx>
                {`
                    .action {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .action a {
                        padding: 10px;
                        width: 130px;
                        height: 50px;
                        border-radius: 3px;
                        text-transform: capitalize;
                        letter-spacing: 1px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        font-size: 12px;
                        background: #007ea7;
                        font-weight: 600;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                        margin-left: 20px;
                    }
                    .input-control {
                        display: flex;
                        align-items: center;
                        max-width: 450px;
                        background-color: #f4f4f4;
                        border-radius: 6px;
                        padding: 15px;
                        width: 100%;
                    }

                    .input-control svg {
                        width: 20px;
                        position: relative;
                        top: 2px;
                        color: var(--ternary);
                    }

                    .input-control input {
                        width: 100%;
                        font-size: 18px;
                        padding-left: 10px;
                        outline: 0;
                        border: 0;
                        color: #000;
                        background-color: #f4f4f4;
                        font-family: "Lato", sans-serif;
                    }

                    .input-control input::placeholder {
                        color: #838f9f;
                        font-size: 16px;
                    }

                    .main-title {
                        margin: 30px 0;
                        font-family: "Lato", sans-serif;
                    }
                    /* Table */
                    .table {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                    }

                    .table div {
                        display: flex;
                        justify-content: flex-end;
                    }
                    .table button {
                        width: 130px;
                        height: 50px;
                        border-radius: 3px;
                        text-transform: capitalize;
                        letter-spacing: 1px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        font-size: 12px;
                        background: var(--primary);
                        font-weight: 600;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                    }

                    .table-title {
                        font-family: "Lato", sans-serif;
                        font-size: 16px;
                        text-align: end;
                        padding: 10px 15px 20px;
                    }
                    .table-title:nth-child(1) {
                        text-align: center;
                    }
                    .table-title:nth-child(2) {
                        padding-right: 60px;
                    }

                    .table-results {
                        grid-column: 1 / -1;
                    }

                    .table-item {
                        display: flex;
                        width: 100%;
                    }

                    .table-item .drop-element {
                        display: flex;
                        align-items: center;
                        margin-right: 15px;
                    }

                    .table-item a {
                        display: grid;
                        position: relative;
                        width: 100%;
                        grid-template-columns: repeat(3, 1fr);
                        align-items: center;
                        padding: 15px 10px;
                        font-size: 14px;
                        transition: transform 0.3s, background 0.4s ease-in-out;
                    }

                    .table-item a:hover {
                        background-color: #fcb7b740;
                    }

                    .container-image {
                        display: flex;
                        align-items: center;
                    }

                    .container-image .image {
                        position: relative;
                        height: 40px;
                        border-radius: 50%;
                        margin-right: 10px;
                        overflow: hidden;
                        min-width: 40px;
                        max-width: 40px;
                    }

                    .table-item .container-image,
                    p {
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        padding: 0 15px;
                    }
                `}
            </style>
        </>
    );
};


export const getStaticProps: GetStaticProps = async () => {
    await dbConnect()
    const _beats = await BeatsModel.find()


    return {
        props: {_beats: { beats: parser(_beats)}}
    };
};

Admin.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <NeastedLayout>
                <>{page}</>
            </NeastedLayout>
        </>
    );
};

export default Admin;
