import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
	const { handleLogout, currentUser } = useContext(AppContext);

	const navigate = useNavigate();

	return (
		<nav>
			<ul className="flex gap-4 bg-slate-500 px-4 py-2 content">
				<li>
					<NavLink to="/welcome">Welcome</NavLink>
				</li>
				<li>
					<NavLink to="/books">Books</NavLink>
				</li>
				<li>
					<NavLink to="/users">Users</NavLink>
				</li>
				{currentUser.fullName.trim() === "" && (
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
				)}
				{currentUser.fullName.trim() !== "" && (
					<li>
						<a className="cursor-pointer" onClick={() => handleLogout(() => {
							navigate('/login');
						})}>
							Logout
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
};
