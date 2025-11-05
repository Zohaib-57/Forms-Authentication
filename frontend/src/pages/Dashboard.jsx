import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
	const { token } = useAuth();
	const [data, setData] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					import.meta.env.VITE_API_URL + "/api/auth/dashboard",
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setData(res.data);
			} catch (error) {
				setError(error.response?.data?.message || "Failed to Fetch Data");
			}
		};
		fetchData();
	}, [token]);

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(255,207,113)] via-[rgb(255,157,0)] to-[rgb(182,119,29)]">
				<div className="text-center bg-white/90 p-8 rounded-2xl shadow-xl max-w-lg">
					<h2 className="text-2xl font-bold mb-3 text-red-600">Error</h2>
					<p className="text-gray-700">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-[rgb(255,207,113)] via-[rgb(255,157,0)] to-[rgb(182,119,29)] flex justify-center items-center py-10 px-4">
			<div className="max-w-3xl w-full bg-white/95 rounded-2xl shadow-2xl p-8">
				<h2
					className="text-4xl font-extrabold text-center mb-6"
					style={{
						color: "rgb(123,84,47)",
						textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
					}}
				>
					Dashboard
				</h2>

				{!data ? (
					<p className="text-center text-lg text-[rgb(123,84,47)]">
						Loading your data...
					</p>
				) : (
					<div className="text-center">
						<p
							className="text-lg mb-4 font-medium"
							style={{ color: "rgb(182,119,29)" }}
						>
							{data.message}
						</p>

						<div
							className="p-5 rounded-xl shadow-md text-left"
							style={{
								backgroundColor: "rgb(255,207,113,0.4)",
								border: "1px solid rgb(182,119,29,0.3)",
							}}
						>
							<h3
								className="text-xl font-semibold mb-2"
								style={{ color: "rgb(123,84,47)" }}
							>
								User Information
							</h3>
							<pre
								className="text-sm bg-white rounded-lg p-3 shadow-inner overflow-x-auto"
								style={{
									color: "rgb(123,84,47)",
									border: "1px solid rgb(255,157,0,0.3)",
								}}
							>
								{JSON.stringify(data.user, null, 2)}
							</pre>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
