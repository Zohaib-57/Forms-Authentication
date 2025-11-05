import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
	const { token, user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header
			className="shadow-md sticky top-0 z-50"
			style={{
				background: "linear-gradient(90deg, rgb(255,207,113), rgb(255,157,0))",
			}}
		>
			<div className="container mx-auto px-6 py-4 flex items-center justify-between">
				{/* Left: Logo + Title */}
				<div className="flex items-center gap-3">
					<div
						className="w-10 h-10 flex items-center justify-center rounded-lg shadow-md"
						style={{
							backgroundColor: "rgb(182,119,29)",
							color: "white",
							fontWeight: "bold",
						}}
					>
						F
					</div>
					<Link
						to="/"
						className="text-xl font-semibold tracking-wide"
						style={{ color: "rgb(123,84,47)" }}
					>
						Forms Authentication
					</Link>
				</div>

				{/* Right: Navigation */}
				<nav className="flex items-center gap-4">
					{!token ? (
						<>
							<Link
								to="/login"
								className="px-4 py-2 rounded-md border transition duration-200"
								style={{
									borderColor: "rgb(182,119,29)",
									color: "rgb(123,84,47)",
								}}
							>
								Login
							</Link>
							<Link
								to="/register"
								className="px-4 py-2 rounded-md text-white font-medium shadow-md transition duration-200"
								style={{
									background:
										"linear-gradient(90deg, rgb(182,119,29), rgb(255,157,0))",
								}}
							>
								Register
							</Link>
						</>
					) : (
						<>
							<span
								className="text-sm font-medium"
								style={{ color: "rgb(123,84,47)" }}
							>
								Hello,&nbsp;
								<span className="font-semibold text-[rgb(182,119,29)]">
									{user?.username || user?.email}
								</span>
							</span>
							<button
								onClick={handleLogout}
								className="px-4 py-2 rounded-md border text-sm transition duration-200 hover:shadow"
								style={{
									borderColor: "rgb(182,119,29)",
									color: "rgb(123,84,47)",
								}}
							>
								Logout
							</button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
