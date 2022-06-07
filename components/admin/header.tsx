import Link from "next/link";
import {MouseEventHandler} from "react";

type HeaderProps = {
    title?: string;
    disabled: boolean;
    isPublish: boolean;
    onPublish: MouseEventHandler;
    onSubmitForm: MouseEventHandler;
    backRoute: "beats" | "artists";
};

export const Header = ({
    title,
    disabled,
    isPublish,
    onPublish,
    onSubmitForm,
    backRoute,
}: HeaderProps) => {
    return (
        <>
            <div className="info-beat">
                <div className="title-cancel">
                    <Link href={`/admin/${backRoute}`}>
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

                    <h1 className="title">{!title ? `Create ${backRoute}` : title}</h1>
                </div>
                <div className="action">
                    <button onClick={onPublish}>
                        {isPublish ? "Depublier" : "Publier"}
                    </button>
                    <button disabled={disabled} onClick={onSubmitForm}>
                        Valider
                    </button>
                </div>
            </div>
            <style jsx>{`
                .info-beat {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 50px;
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
            `}</style>
        </>
    );
};
