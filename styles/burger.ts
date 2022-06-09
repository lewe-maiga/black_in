import css from "styled-jsx/css";

export default css`
	svg {
		height: 45px;
		position: absolute;
		width: 45px;
	}

	.plate:hover {
		transform: scale(1.1);
	}

	.x {
		transform: scale(0);
		transition: transform 400ms;
	}
	.line {
		fill: none;
		stroke: black;
		stroke-width: 6px;
		stroke-linecap: round;
		stroke-linejoin: round;
		transform-origin: 50%;
		transition: stroke-dasharray 500ms 200ms, stroke-dashoffset 500ms 200ms,
			transform 500ms 200ms;
	}
	.x .line {
		stroke-width: 5.5px;
	}
	input[type="checkbox"]:checked ~ .option label .x {
		transform: scale(1);
		transition: transform 400ms 350ms;
	}
	input[type="checkbox"]:checked ~ .option label .line {
		transition: stroke-dasharray 500ms, stroke-dashoffset 500ms, transform 500ms;
	}

	.plate3 .line {
		transition: stroke-dasharray 300ms 200ms, stroke-dashoffset 300ms 200ms,
			transform 300ms 200ms;
	}
	.plate3 .line1 {
		stroke-dasharray: 21 109;
	}
	.plate3 .line2 {
		stroke-dasharray: 21 112;
	}
	.plate3 .line3 {
		stroke-dasharray: 21 102;
	}
	.plate3 .line4 {
		stroke-dasharray: 21 103;
	}
	.plate3 .line5 {
		stroke-dasharray: 21 110;
	}
	.plate3 .line6 {
		stroke-dasharray: 21 115;
	}
	.plate3 .x {
		transition: transform 400ms 50ms;
	}

	input[type="checkbox"]:checked ~ .option label.plate3 .line {
		transition: stroke-dasharray 400ms, stroke-dashoffset 400ms, transform 400ms;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .line1 {
		stroke-dasharray: 5 109;
		stroke-dashoffset: -100px;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .line2 {
		stroke-dasharray: 5 112;
		stroke-dashoffset: -100px;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .line3 {
		stroke-dasharray: 5 102;
		stroke-dashoffset: -100px;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .line4 {
		stroke-dasharray: 5 103;
		stroke-dashoffset: -100px;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .line5 {
		stroke-dasharray: 5 110;
		stroke-dashoffset: -100px;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .line6 {
		stroke-dasharray: 5 115;
		stroke-dashoffset: -100px;
	}
	input[type="checkbox"]:checked ~ .option label.plate3 .x {
		transition: transform 400ms 100ms;
	}
`;
