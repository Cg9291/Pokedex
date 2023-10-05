import { useState, useEffect } from "react";
import styled from "styled-components";
import ContainerPrototype from "../../prototypes/ContainerPrototype.tsx";
import PokemonProfileInfo from "./PokemonProfileInfo.tsx";
import { PokemonInfoInt } from "../../interfaces.tsx";
import getPokemonData from "../../../functions/api_calls/getPokemonData.tsx";
import capitalizeWords from "../../../functions/utilities/capitalizeWords.tsx";
import { useParams } from "react-router-dom";
import typesColors, { TypesColorsInt } from "../../../objects/typesColors.tsx";

let spriteUrl: string;

const Container = styled(ContainerPrototype)`
	display: unset;
`;

const SubContainer = styled(ContainerPrototype)<{ mainType: string }>`
	flex-direction: column;
	justify-content: center;
	background-color: ${props =>
		typesColors[props.mainType as keyof TypesColorsInt]};
	z-index: 0;
	position: relative;
`;
const ImageContainer = styled(ContainerPrototype)`
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	max-height: 40%;
	//border: solid white;
`;
const PokeNumber = styled.span``;
const PokemonName = styled.span``;
const SvgImg = styled.svg`
	width: 100%;
	height: 50%;
	//border:solid red;
`;
const PokemonImg = styled.image.attrs(props => ({
	href: spriteUrl,
	alt: "a pokemon image",
}))`
	width: 100%;
	height: 100%;
	border: solid black;
	//aspect-ratio: 1/1;
`;

const ProfileContainer = styled(ContainerPrototype)`
	max-height: 60%;
`;

export default function PokemonProfile(): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<
		PokemonInfoInt | { [key: string]: any }
	>({});

	const paramId: number = Number(useParams().id);
	const paramName: string | undefined = useParams().name; //review involved logic of this hook
	console.log(paramId, paramName);

	async function getData(
		pokeNumber?: number | string,
		//pokeName?: string |undefined,
	): Promise<PokemonInfoInt | {}> {
		let data: PokemonInfoInt;
		data = await getPokemonData(pokeNumber);
		setPokemonInfo(data);

		console.log("info is ", pokemonInfo);
		return pokemonInfo;
	}

	useEffect(() => {
		if (typeof paramId===number){
			getData(paramId);
		}
	}, []);

	const {
		abilities,
		base_experience,
		forms,
		game_indices,
		height,
		held_items,
		id,
		is_default,
		location_area_encounters,
		moves,
		name,
		order,
		past_types,
		species,
		sprites,
		stats,
		types,
		weight,
	} = pokemonInfo;

	if (sprites) {
		spriteUrl = sprites.front_default;
	}

	return (
		<Container>
			<SubContainer mainType={types && types[0].type.name}>
				<ImageContainer>
					<PokeNumber>{id && id}</PokeNumber>
					<PokemonName>{name && capitalizeWords(name)}</PokemonName>
					{sprites && (
						<SvgImg>
							<PokemonImg />
						</SvgImg>
					)}
				</ImageContainer>
				<ProfileContainer></ProfileContainer>
			</SubContainer>
			<PokemonProfileInfo />
		</Container>
	);
}
