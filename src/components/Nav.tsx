import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";

export const Nav = () => {
	const { handleLogout } = useContext(AppContext);

	return <nav>
		<ul className="flex gap-4 bg-slate-500 px-4 py-2 content">
			<li><NavLink to="/welcome">Welcome</NavLink></li>
			<li><NavLink to="/books">Books</NavLink></li>
			<li><NavLink to="/users">Users</NavLink></li>
			<li><NavLink to="/login">Login</NavLink></li>
			<li><a className="cursor-pointer" onClick={handleLogout}>Logout</a></li>
		</ul>
	</nav>;
};
