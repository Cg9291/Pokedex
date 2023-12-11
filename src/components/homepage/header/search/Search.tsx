import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ContainerPrototype from "../../../prototypes/ContainerPrototype";
import React, { useRef, useState, useEffect } from "react";
import { SearchSuggestions } from "./SearchSuggestions";
import SearchIcon from "../../../../assets/icons8-search-100.png";
import { punctuationRegex } from "../../../../regularExpressions/punctuationRegex";

export function Search(): React.ReactElement {
    const [searchInput, setSearchInput] = useState<string>("");
    const [suggestedInput, setSuggestedInput] = useState<string>("");
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const hasSuggestions = suggestedInput?.length > 0;

    (function handleOutsideClicks() {
        useEffect(() => {
            const detectOutsideClicks = (e: MouseEvent) => {
                if (!searchRef.current?.contains(e.target as Node)) {
                    setSuggestedInput("");
                }
            };

            document.addEventListener("mousedown", detectOutsideClicks);
            return () => {
                document.removeEventListener("mousedown", detectOutsideClicks);
            };
        }, []);
    })();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        if (hasSuggestions) {
            navigate(`/pokemons/name/${suggestedInput}`);
        } else {
            const formData = new FormData(e.currentTarget);
            const transmittedDataObject = Object.fromEntries(formData.entries());
            const searchedPokemoName = transmittedDataObject.searchInput.toString().toLowerCase();
            navigate(`/pokemons/name/${searchedPokemoName}`);
        }
    };

    const handleFilterClick = () => {
        navigate(`/filter/:gen`);
    };

    const handleChange = (e: React.ChangeEvent) => {
        const clearedInput = (e.target as HTMLInputElement).value.replace(punctuationRegex, "");
        setSearchInput(clearedInput);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputContainer ref={searchRef}>
                    <Label $isShowingSuggestions={hasSuggestions}>
                        <Input value={searchInput} onChange={handleChange} required />
                        <SearchIconButton $isShowingSuggestions={hasSuggestions}>
                            <ImgSvgContainer>
                                <SearchIconImg href={SearchIcon} />
                            </ImgSvgContainer>
                        </SearchIconButton>
                    </Label>
                    <SearchSuggestions
                        searchInput={searchInput.toLowerCase()}
                        setSearchInput={setSearchInput}
                        suggestedInput={suggestedInput}
                        setSuggestedInput={setSuggestedInput}
                    />
                </InputContainer>
                <ButtonsContainer>
                    <SearchButton>Search</SearchButton>
                    <FilterButton onClick={handleFilterClick}>Filter</FilterButton>
                </ButtonsContainer>
            </Form>
        </Container>
    );
}

const Container = styled(ContainerPrototype)``;

const Form = styled.form.attrs({
    method: "get"
})`
    width: 100%;
    display: flex;
`;

const InputContainer = styled.div`
    position: relative;
    min-width: 85%;
    width: 85%;
    max-width: 85%;
    height: fit-content;
`;
const Label = styled.label<{ $isShowingSuggestions: boolean }>`
    width: 100%;
    height: 3rem;
    display: flex;
    border-radius: 99px;
    z-index: 2;
    background-color: white;
    padding-right: 0.5rem;
    border-top-left-radius: ${(props) => (props.$isShowingSuggestions ? "24px" : "99px")};
    border-top-right-radius: ${(props) => (props.$isShowingSuggestions ? "24px" : "99px")};
    border-bottom-left-radius: ${(props) => (props.$isShowingSuggestions ? "0" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$isShowingSuggestions ? "0" : "99px")};
    padding: 0.5rem 0;
`;

const Input = styled.input.attrs({
    placeholder: "Search anything related to a pokemon",
    name: "searchInput"
})`
    width: 85%;
    height: 100%;
    z-index: 2;
    margin-top: auto;
    padding-left: 1rem;
    border: none;
    background-color: transparent;
    border-right: 0.1px solid grey;
`;

const SearchButton = styled.button.attrs({ type: "submit" })`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
const ButtonsContainer = styled(ContainerPrototype)`
    flex-direction: column;
`;

const FilterButton = styled.button.attrs({ type: "button" })`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const SearchIconButton = styled.button.attrs({ type: "submit" })<{ $isShowingSuggestions: boolean }>`
    width: 15%;
    height: 100%;
    border: none;
    background-color: white;
    border-top-right-radius: ${(props) => (props.$isShowingSuggestions ? "24px" : "99px")};
    border-bottom-right-radius: ${(props) => (props.$isShowingSuggestions ? "0" : "99px")};
    display: flex;
    justify-content: center;
`;

const ImgSvgContainer = styled.svg.attrs({ viewBox: "0 0 24 24" })`
    display: flex;
    justify-content: center;
    max-height: 100%;
    max-width: 100%;
`;

const SearchIconImg = styled.image`
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    align-self: center;
`;