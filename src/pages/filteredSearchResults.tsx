import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContainerPrototype from "../components/prototypes/ContainerPrototype";
import { useParams } from "react-router-dom";
import { getPokemonNameAndTypes } from "../functions/api/batchApiCalls/getPokemonNameAndTypes";
import { GenerationsInterface, PokemonSpecy } from "../interfaces/generationsInterface";
import { getGenerationsData } from "../functions/api/batchApiCalls/getGenerationsData";
import { PokemonPictureCard } from "../components/homepage/pokemonPictureCards/PokemonPictureCard";
import { capitalizeWords } from "../functions/utilities/capitalizeWords";
import { CustomPokemonInfo } from "../interfaces/miscInterfaces";

export function FilteredSearchResults(): React.ReactElement {
    const [myState, setMyState] = useState<CustomPokemonInfo[]>();
    const NamesAndValuesOfFilters = useParams();
    const NamesOfFilters = Object.entries(NamesAndValuesOfFilters).filter(
        (x) => x[0].includes("param") && x[1] !== "generation" //[Note] Band aid solution,will fix later
    );

    useEffect(() => {
        getData(Number(NamesAndValuesOfFilters.generation));
        console.log("nof", Number(NamesAndValuesOfFilters.generation));
    }, []);

    const getData = async (pokeGen: number): Promise<void> => {
        try {
            const generationData: GenerationsInterface = await getGenerationsData(pokeGen);
            const pokemonSpecies: PokemonSpecy[] = generationData.pokemon_species;
            const generationPokemonList: CustomPokemonInfo[] = await Promise.all(
                pokemonSpecies.map(async (x: PokemonSpecy) => await getPokemonNameAndTypes(x.name))
            );
            setMyState(generationPokemonList);
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const filterChecker: { [key: string]: (x: CustomPokemonInfo) => boolean } = {
        type: (x: CustomPokemonInfo) => capitalizeWords(`${x.types[0].type.name}`) === NamesAndValuesOfFilters.type,
        type2: (x: CustomPokemonInfo) => capitalizeWords(`${x.types[1]?.type.name}`) === NamesAndValuesOfFilters.type2,
        height: (x: CustomPokemonInfo) => Number(x.height) >= Number(NamesAndValuesOfFilters.height),
        weight: (x: CustomPokemonInfo) => x.weight >= Number(NamesAndValuesOfFilters.height)
    };

    const checkPokemonForFilters = (pokemon: CustomPokemonInfo) => {
        for (let i = 0; i < NamesOfFilters.length; i++) {
            const nameOfFilter = NamesOfFilters[i][1]!;
            const isFilterActive = NamesAndValuesOfFilters[nameOfFilter] !== "undefined";

            if (isFilterActive === false) {
                continue;
            }

            if (filterChecker[nameOfFilter](pokemon) === false) {
                return false;
            }
        }

        return true;
    };

    const applyFilter = () => {
        if (myState) {
            const displayMatchingPokemons = () =>
                myState.filter((x) => checkPokemonForFilters(x) === true).map((y) => <PokemonPictureCard id={y.id} />);

            return displayMatchingPokemons().length <= 0
                ? "No Pokemon matching these criterias have been found"
                : displayMatchingPokemons();
        }
    };

    if (myState) {
        return <Container>{applyFilter()}</Container>;
    } else {
        return <Container>Loading</Container>;
    }
}

const Container = styled(ContainerPrototype)`
    flex-direction: column;
`;
