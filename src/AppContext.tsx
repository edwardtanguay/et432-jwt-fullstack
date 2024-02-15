"use client";
import { createContext, useEffect, useState } from "react";
import {
	IBook,
	ICurrentUser,
	ILoginFormData,
	IUser,
	initialCurrentUser,
	initialLoginformData,
} from "./interfaces";
import axios from "axios";

const backendUrl = "http://localhost:4211";

interface IAppContext {
	books: IBook[];
	users: IUser[];
	loginFormData: ILoginFormData;
	handleLoginFormFieldChange: (
		fieldIdCode: string,
		fieldValue: string
	) => void;
	handleLoginFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	currentUser: ICurrentUser;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [loginFormData, setLoginFormData] =
		useState<ILoginFormData>(initialLoginformData);
	const [currentUser, setCurrentUser] =
		useState<ICurrentUser>(initialCurrentUser);

	const loadBooks = async () => {
		const response = await axios.get(`${backendUrl}/books`);
		const _books: IBook[] = response.data;
		setBooks(_books);
	};

	const loadUsers = async () => {
		const response = await axios.get(`${backendUrl}/users`);
		const _users: IUser[] = response.data;
		setUsers(_users);
	};

	useEffect(() => {
		loadBooks();
		loadUsers();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const headers = {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`,
				};
				const response = await axios.get(
					`${backendUrl}/users/current`,
					{ headers }
				);
				if (response.status === 200) {
					setCurrentUser(response.data.currentUser);
					console.log("currentUser", currentUser);
					console.log("statusText", response.statusText);
				} else {
					setCurrentUser(initialCurrentUser);
				}
			} catch (e) {
				setCurrentUser(initialCurrentUser);
			}
		})();
	});

	const handleLoginFormFieldChange = (
		fieldIdCode: string,
		fieldValue: string
	) => {
		switch (fieldIdCode) {
			case "login":
				loginFormData.login = fieldValue;
				break;
			case "password":
				loginFormData.password = fieldValue;
				break;
		}
		setLoginFormData(structuredClone(loginFormData));
	};

	const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		(async () => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			try {
				const response = await axios.post(
					`${backendUrl}/users/login`,
					{
						login: loginFormData.login,
						password: loginFormData.password,
					},
					{ headers }
				);
				if (response.status === 200) {
					localStorage.setItem("token", response.data.token);
					console.log("object from backend", response.data);
					console.log(response.statusText);
				}
			} catch (err) {
				console.log("ERROR: bad login");
			}
		})();
	};

	return (
		<AppContext.Provider
			value={{
				books,
				users,
				loginFormData,
				handleLoginFormFieldChange,
				handleLoginFormSubmit,
				currentUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
