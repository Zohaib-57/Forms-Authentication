import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";

const ProtectedRoute = ({ children }) => {
	const { token } = useAuth();
	if (!token) return <Navigate to="/login" replace />;
	return children;
};

function App() {
	return (
		<AuthProvider>
			<div
				className="min-h-screen flex flex-col"
				style={{
					background: "linear-gradient(180deg, #fff7e0, #fff3cc, #fff8e5)",
				}}
			>
				<Header />
				<main className="flex-grow container mx-auto px-4 py-8">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</main>
				<footer
					className="text-center py-4 text-sm"
					style={{
						backgroundColor: "rgb(255,207,113)",
						color: "rgb(123,84,47)",
					}}
				>
					© {new Date().getFullYear()} Forms Authentication — Secure & Elegant
				</footer>
			</div>
		</AuthProvider>
	);
}

export default App;
