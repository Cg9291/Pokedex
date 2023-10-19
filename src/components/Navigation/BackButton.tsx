import styled from "styled-components";
import ContainerPrototype from "../prototypes/ContainerPrototype.tsx";

const Container = styled(ContainerPrototype)`
	width: 2rem;
	height: 2rem;
	position: absolute;
	background-color: yellow;
	top: 0.5rem;
	left: 0.5rem;
	z-index: 1;
	border-radius: 50%;
`;

const Button = styled.button.attrs({ type: "button" })`
	width: 100%;
	border-radius: 50%;
	border: none;
`;

const SvgImg = styled.svg.attrs({ viewBox: "0 0 219.151 219.151" })``;

const SvgPath = styled.path`
	width: 100%;
	height: 100%;
`;

export default function BackButton(props: { action: () => void }): JSX.Element {
	const svgPath = [
		"M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z",
		"M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z",
	];

	return (
		<Container>
			<Button onClick={props.action}>
				<SvgImg>
					{/* <SvgPath d={svgPath[0]}></SvgPath> */}
					<SvgPath d={svgPath[1]}></SvgPath>
				</SvgImg>
			</Button>
		</Container>
	);
}
