import { useRoutes } from "react-router-dom";
import PokemonProfile from "./PokemonProfiles/PokemonProfile.tsx";
import Homepage from "../pages/Homepage.tsx";
import About from "./PokemonProfiles/profileNavBodies/About.tsx";
import NoMatch from "../pages/NoMatch.tsx";
import WTP from "../pages/Wtp.tsx";
import Favorites from "../pages/Favorites.tsx";

export default function MapPathsToElement(): React.ReactElement | null {
	return useRoutes([
		{ path: "/", element: <Homepage /> },
		/* { path: "/about", element: <About /> }, */
		{ path: "*", element: <NoMatch /> },
		{ path: "/pokemons/id/:id", element: <PokemonProfile /> },
		{ path: "/pokemons/name/:name", element: <PokemonProfile /> },
		{ path: "/favorites", element: <Favorites /> },
		{ path: "/wtp", element: <WTP /> },
	]);
}
