import {useLoading, useToken} from "@lib/hooks";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {File as FileBeat} from "@lib/s3";
import {useRouter} from "next/router";
import {File} from "@components/admin/file";
import {NeastedLayout} from "@components/admin/nested-layout";
import {Header} from "@components/admin/header";

const Create = () => {
    const {token} = useToken();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/admin/register");
        }
    }, [token, router]);
    const [state, setState] = useState({
        title: "",
        genre: "",
        format: "",
        price: "",
        tempo: "",
    });
    const [image, setImage] = useState<FileBeat>({} as FileBeat);
    const [music, setMusic] = useState<FileBeat>({} as FileBeat);
    const {loading, dispatch} = useLoading();
    const [isPublish, setPublish] = useState(false);

    useEffect(() => {
        console.log("image", image);
        console.log("music", music);
    }, [image, music]);

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState((prevState) => ({...prevState, [name]: value}));
    };
    const onPublish = () => setPublish(!isPublish);

    const onSubmitForm = async () => {
        dispatch({type: "loading"});

        const endpoint = `/api/beats`;

        const body = {
            title: state.title,
            genre: state.genre,
            format: state.format,
            price: state.price,
            tempo: state.tempo,
            published: isPublish,
            image,
            music,
        };

        console.log("state: ", state);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            const {beat} = await response.json();
            console.log(beat);
            router.push(`/admin/beats/${beat._id}`);
        }
        dispatch({type: "done"});
    };

    return (
        <>
            <div>
                <Header
                    disabled={
                        state.title === "" ||
                        state.genre === "" ||
                        state.format === "" ||
                        state.price === "" ||
                        state.tempo === "" ||
                        Object.keys(image).length === 0 ||
                        Object.keys(music).length === 0 ||
                        loading
                    }
                    isPublish={isPublish}
                    onPublish={onPublish}
                    onSubmitForm={onSubmitForm}
                    backRoute="beats"
                />
                <form className="form">
                    <div className="wrapper">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="title"
                            defaultValue={state.title}
                            onChange={inputChange}
                        />
                        <label htmlFor="title">title</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="text"
                            name="genre"
                            id="genre"
                            className="genre"
                            defaultValue={state.genre}
                            onChange={inputChange}
                        />
                        <label htmlFor="genre">genre</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="text"
                            name="format"
                            id="format"
                            className="format"
                            defaultValue={state.format}
                            onChange={inputChange}
                        />
                        <label htmlFor="format">format</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            className="price"
                            defaultValue={state.price}
                            onChange={inputChange}
                        />
                        <label htmlFor="price">price</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="number"
                            name="tempo"
                            id="tempo"
                            className="tempo"
                            defaultValue={state.tempo}
                            onChange={inputChange}
                        />
                        <label htmlFor="tempo">tempo</label>
                    </div>

                    <div className="files">
                        <div className="file">
                            <File
                                type="image"
                                action="create"
                                token={token}
                                loading={loading}
                                dispatch={dispatch}
                                setState={setImage}
                            />
                        </div>
                        <div className="file">
                            <File
                                action="create"
                                loading={loading}
                                dispatch={dispatch}
                                type="music"
                                token={token}
                                setState={setMusic}
                            />
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .form {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-auto-rows: minmax(120px, auto);
                    grid-gap: 40px;
                }
                .wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    max-width: 450px;
                    background-color: #f4f4f4;
                    border-radius: 6px;
                    padding: 15px;
                    margin-top: 50px;
                    max-height: 70px;
                }
                .wrapper label {
                    display: block;
                    position: absolute;
                    top: -50px;
                    font-weight: 600;
                }

                .wrapper input {
                    width: 100%;
                    font-size: 16px;
                    padding-left: 10px;
                    outline: 0;
                    border: 0;
                    color: #000;
                    background-color: #f4f4f4;
                    font-family: "Lato", sans-serif;
                }
                .files {
                    display: flex;
                    grid-column: span 2;
                    grid-row: 4;
                }
                .file {
                    width: 100%;
                }
            `}</style>
        </>
    );
};

Create.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <NeastedLayout>
                <>{page}</>
            </NeastedLayout>
        </>
    );
};

export default Create;
