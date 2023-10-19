import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype.tsx";
import PokemonTypesElement from "./PokemonTypesElement.tsx";

import getPokemonData from "../../../../functions/api_calls/getPokemonData.tsx";
import capitalizeWords from "../../../../functions/utilities/capitalizeWords.tsx";
import { PokemonNumberPropsInterface } from "../../../../interfaces&types/misc_Interfaces.tsx";
import PokemonInterface from "../../../../interfaces&types/pokemonInterface.tsx";
import typesColors from "../../../../objects/typesColors.tsx";
import { TypesColorsInt } from "../../../../interfaces&types/misc_Interfaces.tsx";

const Container = styled(Link)<{ $mainType: string }>`
	width: 10rem;
	height: 7.5rem;
	padding: 0.5rem;
	border-radius: 25px;
	text-decoration: none;
	background-color: ${props =>
		typesColors[
			props.$mainType as keyof TypesColorsInt
		]}; //review this answer for better "keyof" concept understanding
`;

const Wrapper = styled(ContainerPrototype)`
	display: flex;
	flex-direction: column;
	border-radius: 25px;
`;

const PokeName = styled.h3`
	height: 20%;
	color: white;
`;

const SubContainer = styled(ContainerPrototype)``;

const PokemonTypesContainer = styled(ContainerPrototype)`
	width: 50%;
	flex-direction: column;
	justify-content: end;
`;

const PokemonImgWrapper = styled.div`
	width: 50%;
`;

const SvgImg = styled.svg.attrs({ viewBox: "50 50 200 200" })`
	width: 100%;
	height: 100%;
`;
const PokemonImg = styled.image.attrs({})`
	width: 200;
	aspect-ratio: 1/1;
`;

export default function PokemonPictureCard(
	props: PokemonNumberPropsInterface,
): JSX.Element {
	const [pokemonInfo, setPokemonInfo] = useState<
		PokemonInterface | { [key: string]: any }
	>({});

	async function getData(pokeNumber: number): Promise<PokemonInterface | {}> {
		const data: PokemonInterface = await getPokemonData(pokeNumber);
		setPokemonInfo(data);
		return pokemonInfo;
	}

	useEffect(() => {
		getData(props.id);
	}, [props.id]);

	const { id, name, sprites, types } = pokemonInfo;

	const renderPokemonTypes = (): JSX.Element[] =>
		types
			.toReversed()
			.map(
				(x: /*replace this with an  interface-> */ {
					slot: number;
					type: { name: string; url: string };
				}) => <PokemonTypesElement typeName={capitalizeWords(x.type.name)} />,
			);

	return (
		<Container
			to={`/pokemons/id/${id}`}
			$mainType={types && types[0].type.name}
		>
			<Wrapper>
				<PokeName>{name && capitalizeWords(name)}</PokeName>
				<SubContainer>
					<PokemonTypesContainer>
						{types && renderPokemonTypes()}
					</PokemonTypesContainer>
					<PokemonImgWrapper>
						{sprites && (
							<SvgImg>
								<PokemonImg
									href={sprites.front_default}
									/* 	alt="a pokemon image" */
									width="325"
									height="325" //move these to attrs
								/>
							</SvgImg>
						)}
					</PokemonImgWrapper>
				</SubContainer>
			</Wrapper>
		</Container>
	);
}