import { SearchBarProps } from "@components/searchbar/searchbar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import burger from "@styles/burger";
import dynamic from "next/dynamic";

const SearchBar = dynamic<SearchBarProps>(() =>
	import("@components/searchbar/searchbar").then((mod) => mod.SearchBar)
);

export const Header = () => {
	const [shadow, setShadow] = useState(false);
	const [menuActive, setMenuActive] = useState(true);
	const toggleMenuActive = () => setMenuActive((el) => !el);
	const ref = useRef<HTMLDivElement>(null);
	const checked = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setShadow(true);
			} else {
				setShadow(false);
			}
		});
		if (ref.current) observer.observe(ref.current);
	}, [shadow]);
	return (
		<>
			<div ref={ref} className="ref" />
			<header className={`header ${!shadow ? "shadow" : ""}`}>
				<nav className="navbar">
					<input type="checkbox" ref={checked} defaultChecked={false} id="checked" />

					<Link href="/">
						<a className="logo-image">
							<div className="image">
								<svg
									width="40"
									height="45"
									viewBox="0 0 40 45"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
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
							</div>
							<div className="text">
								<span className="t1">lack</span> {"\u00A0"}
								<span className="t2">n</span>
							</div>
						</a>
					</Link>
					<ul className={`menu`}>
						<li className="menu-item">
							<Link href="/">
								<a
									className="link"
									onClick={() => {
										if (checked.current) {
											checked.current.checked = false;
										}
									}}
								>
									accueil
								</a>
							</Link>
						</li>
						<li className="menu-item">
							<Link href="/catalogue">
								<a
									className="link"
									onClick={() => {
										if (checked.current) {
											checked.current.checked = false;
										}
									}}
								>
									catalogue
								</a>
							</Link>
						</li>
						<li className="menu-item">
							<Link href="/about-me">
								<a
									className="link"
									onClick={() => {
										if (checked.current) {
											checked.current.checked = false;
										}
									}}
								>
									a-propos
								</a>
							</Link>
						</li>
					</ul>
					<div className="option">
						<div className={`search ${menuActive ? "active" : ""}`}>
							<div onClick={toggleMenuActive} className="searchbar">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									aria-hidden="true"
									role="img"
									className="iconify iconify--tabler icon"
									preserveAspectRatio="xMidYMid meet"
									viewBox="0 0 24 24"
								>
									<g
										id="icon"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									>
										<circle cx="10" cy="10" r="7"></circle>
										<path d="m21 21l-6-6"></path>
									</g>
								</svg>
							</div>

							<SearchBar active={menuActive} onClose={toggleMenuActive} />
						</div>
						<div className="hamburger">
							<label htmlFor="checked" className={`plate plate3`}>
								<svg
									className="burger"
									version="1.1"
									height="100"
									width="100"
									viewBox="0 0 100 100"
								>
									<path
										className="line line1"
										d="M 50,35 H 30 C 6.9919512,35 5.5084746,123.72881 5.5084746,123.72881"
									/>
									<path
										className="line line2"
										d="M 50,35 H 70 C 98.006349,35 92.796611,119.91525 92.796611,119.91525"
									/>
									<path
										className="line line3"
										d="M 50,50 H 30 C 8.2796577,50 5.9322035,138.1356 5.9322035,138.1356"
									/>
									<path
										className="line line4"
										d="M 50,50 H 70 C 91.152643,50 91.949152,133.21754 91.949152,133.21754"
									/>
									<path
										className="line line5"
										d="M 50,65 C 50,65 47.570314,65 30,65 C 4.9857853,65 9.3220337,147.88136 9.3220337,147.88136"
									/>
									<path
										className="line line6"
										d="M 50,65 H 70 C 91.937316,65 88.559322,144.91525 88.559322,144.91525"
									/>
								</svg>
								<svg
									className="x"
									version="1.1"
									height="100"
									width="100"
									viewBox="0 0 100 100"
								>
									<path className="line" d="M 34,32 L 66,68" />
									<path className="line" d="M 66,32 L 34,68" />
								</svg>
							</label>
						</div>
					</div>
				</nav>
			</header>

			<style jsx>{`
				.search-box {
					display: none;
					visibility: hidden;
				}

				.search .icon {
					width: 20px;
					height: 20px;
				}
				.option {
					display: flex;
				}

				.searchbar {
					display: flex;
					position: relative;
					width: 45px;
					height: 45px;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					transition: all 0.3s ease-in-out;
				}
				.searchbar:hover {
					transform: scale(1.2);
				}

				div.ref {
					height: 3rem;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
				}
				header {
					display: flex;
					width: 100%;
					top: 0;
					left: 0;
					z-index: 100;
					position: sticky;
					transition: 0.5s;
					justify-content: center;
					background: transparent;
					transition: all 0.4s ease-out;
				}
				.shadow {
					background: #fff;
					-webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
					-moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
					box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
				}
				.navbar {
					max-width: var(--max-container-width);
					z-index: 100;
					margin: 1rem;
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
				}

				.image {
					display: flex;
					max-width: 45px;
					max-height: 100%;
					width: 100%;
					height: 100%;
					position: relative;
				}
				.logo-image {
					display: flex;
					max-width: 125px;
					max-height: 45px;
					width: 100%;
					height: 100%;
					transition: transform 0.3s ease-in-out;
				}
				.logo-image:hover {
					transform: scale(1.1);
				}
				.text {
					filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
					display: none;
					width: 100%;
					height: 100%;
					justify-content: start;
					align-items: center;
					font-size: 20px;
					font-weight: bold;
					color: var(--primary);
				}

				.menu {
					position: fixed;
					left: -100%;
					top: 0;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					background-color: #fff;
					border-radius: 10px;
					text-align: center;
					transition: 0.4s;
					box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
				}

				.menu-item {
					margin: 1rem 0;
				}
				.link {
					text-transform: uppercase;
					position: relative;
					padding-bottom: 2px;
				}
				.link::before {
					content: "";
					position: absolute;
					width: 100%;
					height: 2px;
					border-radius: 2px;
					background-color: var(--link-hover);
					bottom: 0;
					left: 0;
					transform-origin: right;
					transform: scaleX(0);
					transition: transform 0.3s ease-in-out;
				}

				.link:hover::before {
					transform-origin: left;
					transform: scaleX(1);
				}

				.hamburger {
					display: block;
					cursor: pointer;
				}
				input[type="checkbox"] {
					display: none;
				}
				input[type="checkbox"]:checked ~ .menu {
					left: 0;
				}
				.plate {
					display: block;
					height: 45px;
					width: 45px;
					transition: transform 0.3s ease-in-out;
				}

				@media only screen and (min-width: 700px) {
					.text {
						display: flex;
					}
					.t1::before {
						content: "B";
						color: #000;
					}
					.t2::before {
						content: "I";
						color: #000;
					}
					.name {
						display: none;
					}
					.option {
						display: flex;
					}
					.search {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 10px;
					}
					.searchbar {
						position: relative;
						margin: 0;
					}
				}

				@media only screen and (min-width: 1000px) {
					.navbar {
						margin: 1rem 2rem;
					}
					.menu {
						position: static;
						flex-direction: row;
						background: transparent;
						box-shadow: none;
					}

					.menu-item {
						margin: 0;
					}

					.link {
						margin: 0 2rem 0.5rem;
						padding: 1rem 0 0.2rem;
						font-size: 12px;
					}

					.hamburger {
						display: none;
					}
				}
			`}</style>
			<style jsx>{burger}</style>
		</>
	);
};
