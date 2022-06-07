import {Header} from "@components/admin/header";
import {NeastedLayout} from "@components/admin/nested-layout";
import {useLoading, useToken} from "@lib/hooks";
import {useRouter} from "next/router";
import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {File as FileArtist} from "@lib/s3";
import {File} from "@components/admin/file";

const Create = () => {
    const {token} = useToken();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/admin/register");
        }
    }, [token, router]);
    const [state, setState] = useState({
        pseudo: "",
        content: "",
    });

   
    const [image, setImage] = useState<FileArtist>({} as FileArtist);
    const {loading, dispatch} = useLoading();
    const [isPublish, setPublish] = useState(false);

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setState((prevState) => ({...prevState, [name]: value}));
    };

    const onContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setState((el) => ({...el, content: event.target.value}));
    };

    const onPublish = () => setPublish(!isPublish);

    const onSubmitForm = async () => {
        dispatch({type: "loading"});

        const endpoint = `/api/artists`;

        const body = {
            pseudo: state.pseudo,
            published: isPublish,
            image,
            content: state.content,
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
            const {artist} = await response.json();
            console.log(artist);
            router.push(`/admin/artists/${artist._id}`);
        }
        dispatch({type: "done"});
    };

    return (
        <>
            <div>
                <Header
                    disabled={
                        state.pseudo === "" ||
                        state.content === "" ||
                        Object.keys(image).length === 0 ||
                        loading
                    }
                    isPublish={isPublish}
                    onPublish={onPublish}
                    onSubmitForm={onSubmitForm}
                    backRoute="artists"
                />
                <form className="form">
                    <div className="wrapper">
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            className="pseudo"
                            defaultValue={state.pseudo}
                            onChange={inputChange}
                        />
                        <label htmlFor="pseudo">title</label>
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
                    </div>
                    <div className="content">
                        <label htmlFor="content">Content</label>
                        <textarea
                            name="content"
                            id="content"
                            className="title"
                            defaultValue={state.content}
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
