import { useLoading, useToken } from "@lib/hooks";
import { fetcher } from "@lib/utils";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import {Description as Desc} from "@database/models/description";
import { ReactElement, useEffect, useState } from "react";
import { useMachine } from "@lib/machine/hooks";
import machine from "@lib/machine";
import { Spinner } from "@components/spinner";
import { NeastedLayout } from "@components/admin/nested-layout";
import Link from "next/link";


type DescriptionProps = {
    description: Desc;
}

const Description = ({description}: DescriptionProps ) => {
    const {token} = useToken();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push("/admin/register");
        }
    }, [token, router]);
    const {data, error, mutate} = useSWR("/api/description", fetcher, {
        fallbackData: description,
    });
    const {state, send, can} = useMachine(machine, data);
    const {loading, dispatch} = useLoading();
    const [content, setContent] = useState({
        n_heading_main: description.heading_main,
        n_content_main: description.content_main,
        n_heading_secondary: description.heading_secondary,
        n_content_secondary: description.content_secondary,
    });
    useEffect(() => {
        send("input", content);
    }, [content, send]);

    useEffect(() =>{
        if(can("edit")){
            send("edit")
        }
    })
    const onSubmit = async () => {

        dispatch({type: "loading"});

        const data = {
            heading_main: content.n_heading_main,
            content_main: content.n_content_main,
            heading_secondary: content.n_heading_secondary,
            content_secondary: content.n_content_secondary,
        };
        const options: RequestInit = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };
        const endpoint = "/api/description";
        const response = await fetch(endpoint, options);
        if (response.ok) {
            const result = await response.json();
            send("submit");
            mutate({...data, ...result});
            dispatch({type: "done"});
        } else if (!response.ok || state === "error") {
            dispatch({type: "error"});
        }
    };

    if (!data)
        return (
            <>
                <Spinner />
            </>
        );

    if (error) return error;

    return (
        <>
            <div className="info-beat">
                <div className="title-cancel">
                    <Link href={`/admin/dashboard`}>
                        <a className="cancel">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="iconify iconify--material-symbols"
                                width="32"
                                height="32"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M9.125 21.1L.7 12.7q-.15-.15-.212-.325Q.425 12.2.425 12t.063-.375Q.55 11.45.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L3.55 12l7.35 7.35q.35.35.35.862q0 .513-.375.888t-.875.375q-.5 0-.875-.375Z"></path>
                            </svg>
                        </a>
                    </Link>

                    <h1 className="title">Description</h1>
                </div>
                <div className="action">
                    <button disabled={!can("submit") || loading} onClick={onSubmit}>
                        Valider
                    </button>
                </div>
            </div>
            <form className="form">
                <div className="wrapper">
                <input
                    type="text"
                    id="heading_main"
                    className="heading_main"
                    name="heading_main"
                    defaultValue={content.n_heading_main}
                    onChange={(event) =>
                        setContent((obj) => ({
                            ...obj,
                            n_heading_main: event.target.value,
                        }))
                    }
                />
                <label htmlFor="heading_main">Titre principal</label>
                </div>
                
                <div className="wrapper">
                <input
                    type="text"
                    id="heading_secondary"
                    className="heading_secondary"
                    name="heading_secondary"
                    defaultValue={content.n_heading_secondary}
                    onChange={(event) =>
                        setContent((obj) => ({
                            ...obj,
                            n_heading_secondary: event.target.value,
                        }))
                    }
                    
                />
                <label htmlFor="heading_secondary">Titre Secondaire</label>

                </div>
                <div className="content">
                <textarea
                    name="content_main"
                    id="content_main"
                    className="content_main"
                    defaultValue={content.n_content_main}
                    onChange={(event) =>
                        setContent((obj) => ({
                            ...obj,
                            n_content_main: event.target.value,
                        }))
                    }
                />
                <label htmlFor="content_main">Contenu principal</label>

                </div>
                
                <div className="content">
                        <label htmlFor="content">Contenu secondaire</label>
                        <textarea
                    name="content_secondary"
                    id="content_secondary"
                    className="content_secondary" 
                    defaultValue={content.n_content_secondary}
                    onChange={(event) =>
                        setContent((obj) => ({
                            ...obj,
                            n_content_secondary: event.target.value,
                        }))
                    }
                />
                </div>
                
            
            </form>


            <style jsx>{`
                .info-beat {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 100px;
                }
                .info-beat .title-cancel {
                    display: flex;
                }
                .title{
                    text-transform: capitalize;
                }
                .cancel {
                    background: transparent;
                    margin-right: 20px;
                    display: flex;
                    align-items: center;
                    color: #7e1e1e;
                    transition: all 0.3s ease-out;
                }
                .cancel:hover,
                .cancel:focus {
                    color: var(--primary);
                    transform: scale(1.2);
                }
                .action button {
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
                    color: #fff;
                }

                .action button:nth-child(2) {
                    margin-left: 15px;
                    background: #17dd31;
                }
                .action button:disabled {
                    background: #a7a5a5;
                    cursor: not-allowed;
                }
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
            `}</style>

            
        </>
    );
}



const server = process.env.HOST;


export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log(params);

    const description = await fetcher(`${server}/api/description`)
        .then((res) => res)
        .catch((err) => {
            throw err;
        });

    return {
        props: {description},
    };
};

Description.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <NeastedLayout>
                <>{page}</>
            </NeastedLayout>
        </>
    );
};




export default Description