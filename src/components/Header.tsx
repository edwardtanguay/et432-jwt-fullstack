import { useContext } from "react";
import { Nav } from "./Nav";
import { AppContext } from "../AppContext";

export const Header = () => {
	const { currentUser } = useContext(AppContext);

	return (
		<>
			<h1 className="text-3xl mb-3 text-slate-800 flex gap-3">
				<div>Library Site</div>
				{currentUser.fullName.trim() !== "" && (
					<div className="text-blue-950 bg-yellow-300 px-2 font-sans pb-1 rounded">
						{currentUser.fullName}
					</div>
				)}
			</h1>
			<Nav />
		</>
	);
};
