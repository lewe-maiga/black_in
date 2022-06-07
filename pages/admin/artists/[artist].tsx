import {NeastedLayout} from "@components/admin/nested-layout";
import {Header} from "@components/admin/header";
import {Spinner} from "@components/spinner";
import ArtistsModel, {Artists} from "@database/models/artists";
import {useLoading, useToken} from "@lib/hooks";
import machine from "@lib/machine/artists";
import {useMachine} from "@lib/machine/hooks";
import {fetcher, parser} from "@lib/utils";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import useSWR from "swr";
import {File} from "@components/admin/file";
import {File as FileBeat} from "@lib/s3";
import { dbConnect } from "@database/mongodb";

type ArtistProps = {
    _artist: {artist: Artists};
    _id: string;
};

const Artist = ({_artist, _id}: ArtistProps) => {
    const {token} = useToken();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/admin/register");
        }
    }, [token, router]);
    const {data, error, mutate} = useSWR(`/api/artists/${_id}`, fetcher, {
        fallbackData: _artist,
    });

    const [state, setState] = useState({
        n_pseudo: "",
        n_content: "",
    });
    const [image, setImage] = useState<FileBeat>({} as FileBeat);
    const {state: stateMachine, send, can} = useMachine(machine, data.artist);
    const {loading, dispatch} = useLoading();

    useEffect(() => {
        if (stateMachine === "idle") {
            send("edit");
        }
    }, [stateMachine]);

    useEffect(() => {
        if (data) {
            setState({
                n_pseudo: data.artist.pseudo,
                n_content: data.artist.content,
            });
        }
    }, [data]);

    useEffect(() => {
        send("input", state);
    }, [state]);

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setState((el) => ({...el, n_pseudo: value}));
    };
    const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setState((el) => ({...el, n_content: event.target.value}));
    };
    const onPublish = async () => {
        try {
            dispatch({type: "loading"});

            const endpoint = `/api/artists/${_id}`;
            const body = {
                published: !data.artist.published,
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
                const artist = await response.json();
                mutate({...artist});
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
        const endpoint = `/api/artists/${_id}`;
        const body = {
            pseudo: state.n_pseudo,
            content: state.n_content,
            image: Object.keys(image).length !== 0 ? image : data.artist.image,
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
            const artist = await response.json();
            setImage({} as FileBeat);
            mutate({...artist});
        }
        dispatch({type: "done"});
    };
    if (error) return error;
    if (!data) return <Spinner />;

    return (
        <>
            <div>
                <Header
                    backRoute="artists"
                    title={data.artist.pseudo}
                    disabled={
                        !can("submit") && Object.keys(image).length === 0 ||
                        loading
                    }
                    isPublish={data.artist.published}
                    onPublish={onPublish}
                    onSubmitForm={onSubmitForm}
                />
                <form className="form">
                    <div className="wrapper">
                        <input
                            type="text"
                            name="n_pseudo"
                            id="pseudo"
                            className="pseudo"
                            defaultValue={state.n_pseudo}
                            onChange={inputChange}
                        />
                        <label htmlFor="pseudo">pseudo</label>
                    </div>
                    <div className="files">
                        <div className="file">
                            <File
                                data={
                                    Object.keys(image).length !== 0
                                        ? image
                                        : data.artist.image
                                }
                                token={token}
                                loading={loading}
                                dispatch={dispatch}
                                setState={setImage}
                            />
                        </div>
                    </div>
                    <div className="content">
                        <label htmlFor="content">Content</label>
                        <textarea
                            name="content"
                            id="content"
                            className="title"
                            defaultValue={state.n_content}
                            onChange={onContentChange}
                        />
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
                .content {
                    position: relative;
                    height: 400px;
                }

                .content label {
                    display: block;
                    position: absolute;
                    top: -50px;
                    font-weight: 600;
                }

                textarea {
                    outline: none;
                    border: 1px solid #d0cbcb;
                    border-radius: 5px;
                    width: 100%;
                    height: 100%;
                    max-width: 500px;
                    max-height: 400px;
                    padding: 15px;
                    font-size: 1rem;
                    font-family: "Lato", sans-serif;
                    background: #f4f4f4;
                }

                textarea:focus {
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
    const id = params?.artist as string;
    const _artist = await ArtistsModel.findOne({_id: id});
    return {
        props: {_artist: {artist: parser(_artist)}, _id: id},
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    await dbConnect()
    const artists = await ArtistsModel.find();
    const artist =
        parser(artists.map(({_id}: {_id: string}) => ({
            params: {artist: _id},
        })) ?? []);

    return {
        paths: artist,
        fallback: false,
    };
};

Artist.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <NeastedLayout>
                <>{page}</>
            </NeastedLayout>
        </>
    );
};

export default Artist;
