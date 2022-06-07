import Link from "next/link";
import {useRouter} from "next/router";
import {ReactChild, ReactElement} from "react";

export const NeastedLayout = ({
    children,
}: {
    children: ReactElement | ReactChild;
}) => {
    const router = useRouter();
    return (
        <>
            <div className="global-container">
                <nav className="side-nav">
                    <div className="nav-logo">
                        <svg
                            width="40"
                            height="45"
                            viewBox="0 0 40 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.85786 11.6001C3.94184 13.4745 2.43515 15.7102 1.42922 18.1715C0.423301 20.6329 -0.0608658 23.2685 0.00611052 25.9185C0.0730868 28.5684 0.689809 31.1774 1.81884 33.5871C2.94788 35.9968 4.56568 38.1569 6.57405 39.9364C8.58242 41.7158 10.9395 43.0775 13.5021 43.9387C16.0648 44.7999 18.7796 45.1427 21.4818 44.9463C24.1841 44.7499 26.8173 44.0184 29.2217 42.7961C31.6262 41.5739 33.7516 39.8865 35.4692 37.8362L32.8394 35.728C31.4139 37.4297 29.6497 38.8303 27.654 39.8447C25.6584 40.8592 23.4728 41.4663 21.2299 41.6293C18.9871 41.7924 16.7338 41.5078 14.6068 40.793C12.4798 40.0782 10.5234 38.948 8.85646 37.4711C7.18951 35.9942 5.84674 34.2013 4.90964 32.2012C3.97254 30.2012 3.46066 28.0357 3.40507 25.8362C3.34948 23.6368 3.75134 21.4492 4.58626 19.4063C5.42117 17.3634 6.67173 15.5078 8.26203 13.952L5.85786 11.6001Z"
                                fill="#FF6B54"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M25.5445 2.05682C25.1927 2.43734 25.0003 2.91423 25 3.40641V3.91304V8.04939V21.071C23.5337 19.5475 21.3886 18.587 19 18.587C14.584 18.587 11 21.8702 11 25.9239C11 29.9776 14.584 33.2609 19 33.2609C23.416 33.2609 27 29.9776 27 25.9239C27 25.6834 26.9874 25.4457 26.9627 25.2111H27V7.69442L37 5.91958V2.12852C36.9998 1.81354 36.9208 1.50253 36.7689 1.21788C36.6169 0.933234 36.3957 0.682045 36.1211 0.48241C35.8466 0.282775 35.5256 0.139665 35.1812 0.0633902C34.8368 -0.0128849 34.4777 -0.020426 34.1296 0.0413101L26.9296 1.3192C26.3857 1.41566 25.8963 1.67631 25.5445 2.05682Z"
                                fill="#FF6B54"
                            />
                            <path
                                d="M32.9961 32.762C31.8422 34.7205 30.2414 36.3917 28.3186 37.6454C26.3957 38.899 24.2028 39.701 21.9109 39.989C19.619 40.277 17.29 40.0431 15.1058 39.3055C12.9215 38.5679 10.9409 37.3467 9.31859 35.737C7.69626 34.1273 6.47602 32.1727 5.75306 30.0257C5.0301 27.8787 4.82397 25.5973 5.15075 23.3595C5.47754 21.1217 6.3284 18.988 7.63696 17.1249C8.94552 15.2618 10.6764 13.7196 12.6946 12.6187L14.4479 15.6945C12.9141 16.5312 11.5986 17.7033 10.6041 19.1192C9.60958 20.5352 8.96293 22.1568 8.71457 23.8575C8.46622 25.5582 8.62287 27.2921 9.17232 28.9238C9.72177 30.5556 10.6492 32.0411 11.8821 33.2644C13.1151 34.4878 14.6203 35.4159 16.2804 35.9765C17.9404 36.537 19.7104 36.7148 21.4523 36.496C23.1941 36.2771 24.8607 35.6675 26.3221 34.7148C27.7835 33.762 29.0001 32.4919 29.877 31.0034L32.9961 32.762Z"
                                fill="#6B6B6B"
                            />
                            <path
                                d="M26.104 33.1837C25.0252 33.9969 23.788 34.586 22.4683 34.9149C21.1485 35.2437 19.774 35.3054 18.429 35.0961C17.084 34.8868 15.7968 34.4109 14.6465 33.6977C13.4962 32.9844 12.507 32.0488 11.7394 30.9483C10.9719 29.8477 10.4422 28.6054 10.1829 27.2974C9.92362 25.9895 9.94016 24.6435 10.2315 23.3421C10.5229 22.0406 11.0829 20.8111 11.8773 19.7289C12.6717 18.6467 13.6837 17.7347 14.8512 17.0487L16.9107 20.4032C16.2102 20.8148 15.603 21.362 15.1264 22.0113C14.6498 22.6606 14.3137 23.3983 14.1389 24.1792C13.9641 24.9601 13.9542 25.7677 14.1097 26.5524C14.2653 27.3372 14.5831 28.0826 15.0436 28.7429C15.5042 29.4033 16.0977 29.9646 16.7879 30.3926C17.4781 30.8205 18.2504 31.106 19.0574 31.2316C19.8644 31.3572 20.6891 31.3202 21.481 31.1229C22.2728 30.9256 23.0151 30.5721 23.6624 30.0842L26.104 33.1837Z"
                                fill="black"
                            />
                        </svg>
                        <div className="text">
                            <span className="t1">lack</span> {"\u00A0"}
                            <span className="t2">n</span>
                        </div>
                    </div>
                    <Link href="/admin/dashboard">
                        <a
                            className={`bloc-link ${
                                router.asPath.includes("dashboard")
                                    ? "active"
                                    : ""
                            }`}>
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
                                    d="M13 9V3h8v6ZM3 13V3h8v10Zm10 8V11h8v10ZM3 21v-6h8v6Z"></path>
                            </svg>
                            <span className="nav-links">DashBoard</span>
                        </a>
                    </Link>
                    <Link href="/admin/beats">
                        <a
                            className={`bloc-link ${
                                router.asPath.includes("beats") ? "active" : ""
                            }`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true"
                                role="img"
                                className="iconify iconify--fluent"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 20 20">
                                <path
                                    fill="currentColor"
                                    d="M10 3a7 7 0 0 0-7 7v1h1.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H4a2 2 0 0 1-2-2v-6a8 8 0 1 1 16 0v6a2 2 0 0 1-2 2h-.5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5H17v-1a7 7 0 0 0-7-7Zm.5 7.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7Zm-3 1.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5Zm5.5.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 1 0v-4Z"></path>
                            </svg>
                            <span className="nav-links">Beats</span>
                        </a>
                    </Link>

                    <Link href="/admin/artists">
                        <a
                            className={`bloc-link ${
                                router.asPath.includes("artists")
                                    ? "active"
                                    : ""
                            }`}>
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
                                    d="M19 14q-.425 0-.712-.288Q18 13.425 18 13v-2h-2q-.425 0-.712-.288Q15 10.425 15 10t.288-.713Q15.575 9 16 9h2V7q0-.425.288-.713Q18.575 6 19 6t.712.287Q20 6.575 20 7v2h2q.425 0 .712.287Q23 9.575 23 10t-.288.712Q22.425 11 22 11h-2v2q0 .425-.288.712Q19.425 14 19 14ZM9 12q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-7 8q-.425 0-.712-.288Q1 19.425 1 19v-1.8q0-.85.438-1.563q.437-.712 1.162-1.087q1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163q.725.375 1.162 1.087Q17 16.35 17 17.2V19q0 .425-.288.712Q16.425 20 16 20Z"></path>
                            </svg>
                            <span className="nav-links">Artists</span>
                        </a>
                    </Link>
                    <Link href="/admin/description">
                        <a
                            className={`bloc-link ${
                                router.asPath.includes("description")
                                    ? "active"
                                    : ""
                            }`}>
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
                                    d="M6 22q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h8l6 6v12q0 .825-.587 1.413Q18.825 22 18 22Zm7-13h5l-5-5Zm-5 5h8v-2H8Zm0 4h8v-2H8Z"></path>
                            </svg>
                            <span className="nav-links">Description</span>
                        </a>
                    </Link>
                </nav>

                <main className="main-content">{children}</main>
            </div>
            <style jsx>{`
                .global-container {
                    display: grid;
                    grid-template-columns: 250px 1fr;
                    height: 100vh;
                    width: 100%;
                }
                .side-nav {
                    position: fixed;
                    width: 250px;
                    height: 100%;
                    border-right: 2px solid #e3e8f0;
                    background: #f4f4f4;
                    transition: width 0.3s ease-out;
                }

                .nav-logo {
                    display: flex;
                    margin-bottom: 40px;
                    align-items: center;
                    cursor: pointer;
                    padding: 30px;
                }

                .nav-logo .text {
                    margin-left: 10px;
                    font-size: 20px;
                    font-weight: 700;
                }
                .t1::before {
                    content: "B";
                    color: var(--primary);
                }
                .t2::before {
                    content: "I";
                    color: var(--primary);
                }
                .bloc-link {
                    display: flex;
                    font-weight: 300;
                    color: #2b2727;
                    text-decoration: none;
                    padding: 20px 30px;
                    transition: all 0.3s;
                }
                .bloc-link:hover {
                    color: var(--primary);

                    background: #f8f8f8;
                }
                .bloc-link svg {
                    width: 20px;
                }
                .nav-links {
                    margin-left: 14px;
                }
                .bloc-link.active {
                    background: #f2f2f2;
                }
                .bloc-link.active {
                    color: var(--primary);
                    font-weight: 500;
                }
                // Main
                .main-content {
                    grid-column: 2;
                    padding: 30px;
                }
                @media screen and (max-width: 1000px) {
                    .global-container {
                        grid-template-columns: 100px 1fr;
                    }
                    .side-nav {
                        width: 80px;
                    }
                    .nav-logo {
                        padding: 30px 20px;
                        justify-content: center;
                    }
                    .nav-logo .text {
                        display: none;
                    }
                    .bloc-link {
                        padding: 20px 25px;
                        justify-content: center;
                    }
                    .nav-links {
                        display: none;
                    }
                    .main-content {
                        grid-column: 2;
                        padding: 30px 20px;
                    }
                    .bloc-link svg {
                        width: 20px;
                    }
                }
            `}</style>
        </>
    );
};
