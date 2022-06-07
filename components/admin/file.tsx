import Image from "next/image";
import {Upload} from "@database/models/upload";
import {getFileLink} from "@lib/utils";
import {ChangeEvent, useEffect, useState} from "react";
import {Spinner} from "@components/spinner";

type Action = "create" | "update";
type Type = "image" | "music";
type FileProps = {
    action?: Action;
    data?: Upload;
    type?: Type;
    token: string;
    setState: Function;
    dispatch: Function;
    loading: boolean;
};
export const File = ({
    data,
    loading,
    action = "update",
    type = "image",
    token,
    dispatch,
    setState,
}: FileProps) => {
    const [file, setFile] = useState<File>();
    const [active, setActive] = useState(false);
    useEffect(() => {
        console.log(file);
    }, [file]);

    const toggleActive = () => {
        setActive(!active);
        if (file)
            setTimeout(() => {
                setFile(undefined);
            }, 300);
    };
    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            setFile(event.currentTarget.files[0]);
        }
    };
    const onCreateFile = async () => {
        dispatch({type: "loading"});

        const endpoint = "/api/upload";

        const formData = new FormData();

        formData.append(type, file as File);

        console.log(endpoint);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (response.ok) {
            console.log(response);
            const upload = await response.json();
            console.log(upload);
            //console.log(await response.json());

            setState(upload.file);
        }
        setActive(!active);
        dispatch({type: "done"});
    };

    const onUpdateFile = async () => {
        dispatch({type: "loading"});

        const endpoint = getFileLink(data?.key as string);

        const formData = new FormData();

        formData.append(type, file as File);

        console.log(endpoint);

        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (response.ok) {
            console.log(response);
            const {file: upload} = await response.json();
            console.log(upload);
            setState(upload);
        }
        toggleActive();
        dispatch({type: "done"});
    };
    return (
        <>
            <div className="file-wrapper">
                {action === "update" ? (
                    <>
                        {data && data.type.includes("image") ? (
                            <Image
                                src={getFileLink(data.key)}
                                alt={`cover actulle de l'instrumental ${data.name}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="iconify iconify--cil"
                                width="32"
                                height="32"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M16 160h32v192H16zm360 0h32v192h-32zM104 88h32v328h-32zm184 8h32v320h-32zm176 0h32v320h-32zM192 16h32v480h-32z"></path>
                            </svg>
                        )}
                        <div className="option">
                            <button
                                type="button"
                                className="edit"
                                onClick={toggleActive}>
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
                                        d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM4 21q-.425 0-.712-.288Q3 20.425 3 20v-2.825q0-.2.075-.387q.075-.188.225-.338l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225q-.188.075-.388.075ZM14.325 9.675l-.7-.7l1.4 1.4Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className={`upload ${active && "open"}`}>
                            <label htmlFor={type}>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={toggleActive}
                                />

                                {!file ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--mdi-light"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M5.5 20a5.5 5.5 0 0 1-.002-11a6.502 6.502 0 0 1 12.485 2.03L18.5 11a4.5 4.5 0 1 1 0 9h-13Zm0-10a4.5 4.5 0 1 0 0 9h13a3.5 3.5 0 1 0-1.569-6.63L17 11.5a5.5 5.5 0 0 0-10.808-1.447L5.5 10Zm6.5 7v-5.25L14.25 14l.75-.664l-3.5-3.5l-3.5 3.5l.75.664L11 11.75V17h1Z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        {type === "image" && (
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt="nouvelle cover de l'instrumental"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        )}
                                        {loading && <Spinner />}
                                    </>
                                )}
                            </label>
                            {!loading && file && (
                                <button
                                    type="button"
                                    className="submit"
                                    onClick={onUpdateFile}>
                                    Envoyer
                                </button>
                            )}
                            <input
                                type="file"
                                name={type}
                                id={type}
                                accept={
                                    type === "image"
                                        ? ".jpg, .jpeg, .png"
                                        : ".mp3, .wav"
                                }
                                onChange={onFileChange}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {type === "image" ? (
                            <>
                                {file ? (
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`cover actulle de l'instrumental ${file.name}`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--bi"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 16 16">
                                        <g fill="currentColor">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"></path>
                                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
                                        </g>
                                    </svg>
                                )}
                            </>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="iconify iconify--cil"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 512 512">
                                <path
                                    fill="currentColor"
                                    d="M16 160h32v192H16zm360 0h32v192h-32zM104 88h32v328h-32zm184 8h32v320h-32zm176 0h32v320h-32zM192 16h32v480h-32z"></path>
                            </svg>
                        )}
                        <div className="option">
                            <button
                                type="button"
                                className="add"
                                onClick={toggleActive}>
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
                                        d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className={`upload ${active && "open"}`}>
                            <label htmlFor={type}>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={toggleActive}
                                />

                                {!file ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true"
                                        role="img"
                                        className="iconify iconify--mdi-light"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M5.5 20a5.5 5.5 0 0 1-.002-11a6.502 6.502 0 0 1 12.485 2.03L18.5 11a4.5 4.5 0 1 1 0 9h-13Zm0-10a4.5 4.5 0 1 0 0 9h13a3.5 3.5 0 1 0-1.569-6.63L17 11.5a5.5 5.5 0 0 0-10.808-1.447L5.5 10Zm6.5 7v-5.25L14.25 14l.75-.664l-3.5-3.5l-3.5 3.5l.75.664L11 11.75V17h1Z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        {type === "image" && (
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt="nouvelle cover de l'instrumental"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        )}
                                        {loading && <Spinner />}
                                    </>
                                )}
                            </label>
                            {!loading && file && (
                                <button
                                    type="button"
                                    className="submit"
                                    onClick={onCreateFile}>
                                    Envoyer
                                </button>
                            )}
                            <input
                                type="file"
                                name={type}
                                id={type}
                                accept={
                                    type === "image"
                                        ? ".jpg, .jpeg, .png"
                                        : ".mp3, .wav"
                                }
                                onChange={onFileChange}
                            />
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                .file-wrapper {
                    position: relative;
                    width: 250px;
                    height: 210px;
                    background: #5a595915;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    //margin-top: 10px;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .file-wrapper svg {
                    color: var(--ternary);
                    position: relative;
                    width: 100px;
                    height: 100px;
                }

                .option {
                    position: absolute;
                    display: flex;
                    top: 5px;
                    right: 5px;
                    opacity: 0;
                    transition: opacity 0.4s ease-out;
                }
                .file-wrapper:hover > .option {
                    opacity: 1;
                }

                .option button {
                    padding: 5px;
                    width: 35px;
                    height: 35px;
                    background: #8b7c7c;
                    border-radius: 2px;
                    cursor: pointer;
                    color: #fff;
                    transition: background 0.3s ease-in-out;
                }
                .option button:hover {
                    color: #ebfcfb;
                    background: #007ea7;
                }

                .option button svg {
                    color: inherit;
                    width: 25px;
                    height: 25px;
                }

                .upload {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    top: -100%;
                    transition: top 0.4s ease-out;
                }
                .upload label {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    background: #5a5959f1;
                    justify-content: center;
                    align-items: center;
                }
                .upload label svg {
                    width: 100px;
                    height: 100px;
                    color: var(--primary);
                }
                .upload input {
                    display: none;
                }
                .upload.open {
                    top: 0;
                }
                .close {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    top: 5px;
                    right: 5px;
                    background: #8b7c7c;
                    border-radius: 2px;
                    cursor: pointer;
                    z-index: 20;
                    transition: background 0.3s ease-in-out;
                }
                .close::after,
                .close::before {
                    content: "";
                    position: absolute;
                    width: 60%;
                    height: 2px;
                    top: 50%;
                    left: 50%;
                    border-radius: 3px;
                    background: #fff;
                    transform: translate(-50%, -50%) rotate(45deg);
                }
                .close::before {
                    transform: translate(-50%, -50%) rotate(-45deg);
                }
                .close:hover {
                    color: #ebfcfb;
                    background: #ee5a43;
                }
                .submit {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--primary);
                    width: 90px;
                    height: 50px;
                    text-align: center;
                    color: #ffffff;
                    font-weight: 800;
                    letter-spacing: 1px;
                    font-size: 10px;
                }
            `}</style>
        </>
    );
};
