import css from "styled-jsx/css";
import theme from "./themes";

export default css.global`
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html,
    body {
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.8;
        font-family: "Poppins", Helvetica, sans-serif;
    }

    a {
        color: ${theme.colors.link};
        text-decoration: none;
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
        color: ${theme.colors.heading};
    }
    hr {
        max-width: var(--max-container-width);
    }
    ul {
        list-style: none;
    }

    p {
        color: var(--text);
    }
    button {
        text-transform: uppercase;
        border: none;
        outline: none;
    }
    :root {
        --primary: ${theme.colors.primary};
        --secondary: ${theme.colors.secondary};
        --ternary: ${theme.colors.ternary};
        --text: ${theme.colors.text};
        --link-hover: ${theme.colors.linkHover};
        --max-container-width: 1550px;
        --max-grid-width: 1500px;
    }
`;
