import {NeastedLayout} from "@components/admin/nested-layout";
import {Spinner} from "@components/spinner";
import BeatsModel, {Beats} from "@database/models/beats";
import {fetcher, parser} from "@lib/utils";
import {GetStaticPaths, GetStaticProps} from "next";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import useSWR from "swr";
import {File} from "@components/admin/file";
import {useLoading, useToken} from "@lib/hooks";
import {useRouter} from "next/router";
import {File as FileBeat} from "@lib/s3";
import {useMachine} from "@lib/machine/hooks";
import machine from "@lib/machine/beats";
import {Header} from "@components/admin/header";
import { dbConnect } from "@database/mongodb";

type BeatProps = {
    _beat: {beat: Beats};
    _id: string;
};

const Beat = ({_beat, _id}: BeatProps) => {
    const {token} = useToken();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/admin/register");
        }
    }, [token, router]);
    const {data, error, mutate} = useSWR(`/api/beats/${_id}`, fetcher, {
        fallbackData: _beat,
    });

    const [state, setState] = useState({
        n_title: "",
        n_genre: "",
        n_format: "",
        n_price: "",
        n_tempo: "",
    });
    const [image, setImage] = useState<FileBeat>({} as FileBeat);
    const [music, setMusic] = useState<FileBeat>({} as FileBeat);
    const {state: stateMachine, send, can} = useMachine(machine, data?.beat);
    const {loading, dispatch} = useLoading();

    useEffect(() => {
        if (stateMachine === "idle") {
            send("edit");
        }
    }, [stateMachine]);

    useEffect(() => {
        if (data) {
            setState({
                n_title: data.beat.title,
                n_genre: data.beat.genre,
                n_format: data.beat.format,
                n_price: data.beat.price,
                n_tempo: data.beat.tempo,
            });
        }
    }, [data]);

    useEffect(() => {
        send("input", state);
    }, [state]);

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState((prevState) => ({...prevState, [name]: value}));
    };
    const onPublish = async () => {
        try {
            dispatch({type: "loading"});

            const endpoint = `/api/beats/${_id}`;

            const body = {
                published: !data.beat.published,
            };

            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const beat = await response.json();
                mutate({...beat});
            } else {
                throw new Error(await response.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            dispatch({type: "done"});
        }
    };
    const onSubmitForm = async () => {
        dispatch({type: "loading"});

        const endpoint = `/api/beats/${_id}`;

        const body = {
            title: state.n_title,
            genre: state.n_genre,
            format: state.n_format,
            price: state.n_price,
            tempo: state.n_tempo,
            image: Object.keys(image).length !== 0 ? image : data.beat.image,
            music: Object.keys(music).length !== 0 ? music : data.beat.music,
        };

        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            send("submit");
            const beat = await response.json();
            setImage({} as FileBeat);
            setMusic({} as FileBeat);
            mutate({...beat});
        }
        dispatch({type: "done"});
    };
    if (error) return error;
    if (!data) return <Spinner />;

    return (
        <>
            <div>
                <Header
                    backRoute="beats"
                    title={data.beat.title}
                    disabled={
                        (!can("submit") &&
                            Object.keys(image).length === 0 &&
                            Object.keys(music).length === 0) ||
                        loading
                    }
                    isPublish={data.beat.published}
                    onPublish={onPublish}
                    onSubmitForm={onSubmitForm}
                />
                <form className="form">
                    <div className="wrapper">
                        <input
                            type="text"
                            name="n_title"
                            id="title"
                            className="title"
                            defaultValue={state.n_title}
                            onChange={inputChange}
                        />
                        <label htmlFor="title">title</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="text"
                            name="n_genre"
                            id="genre"
                            className="genre"
                            defaultValue={state.n_genre}
                            onChange={inputChange}
                        />
                        <label htmlFor="genre">genre</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="text"
                            name="n_format"
                            id="format"
                            className="format"
                            defaultValue={state.n_format}
                            onChange={inputChange}
                        />
                        <label htmlFor="format">format</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="number"
                            name="n_price"
                            id="price"
                            className="price"
                            defaultValue={state.n_price}
                            onChange={inputChange}
                        />
                        <label htmlFor="price">price</label>
                    </div>
                    <div className="wrapper">
                        <input
                            type="number"
                            name="n_tempo"
                            id="tempo"
                            className="tempo"
                            defaultValue={state.n_tempo}
                            onChange={inputChange}
                        />
                        <label htmlFor="tempo">tempo</label>
                    </div>

                    <div className="files">
                        <div className="file">
                            <File
                                data={
                                    Object.keys(image).length !== 0
                                        ? image
                                        : data.beat.image
                                }
                                token={token}
                                loading={loading}
                                dispatch={dispatch}
                                setState={setImage}
                            />
                        </div>
                        <div className="file">
                            <File
                                data={
                                    Object.keys(music).length !== 0
                                        ? music
                                        : data.beat.music
                                }
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


export const getStaticProps: GetStaticProps = async ({params}) => {
    await dbConnect()
    const id = params?.beat as string;
    const beat = await BeatsModel.findOne({_id: id})
    return {
        props: {_beat: { beat : parser(beat)}, _id: id},
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    await dbConnect()
    let beats = await BeatsModel.find()
    const beat =
        parser(beats.map(({_id}: {_id: string}) => ({
            params: {beat: _id},
        })) ?? [])    
    return {
        paths: beat,
        fallback: false,
    };
};

Beat.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <NeastedLayout>
                <>{page}</>
            </NeastedLayout>
        </>
    );
};

export default Beat;
