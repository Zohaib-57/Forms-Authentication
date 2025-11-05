import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) =>
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login(form.email, form.password);
			setLoading(false);
			navigate("/dashboard");
		} catch (error) {
			setError(error.response?.data?.message || "Login Failed");
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(255,207,113)] via-[rgb(255,157,0)] to-[rgb(182,119,29)]">
			<div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
				<h2
					className="text-3xl font-bold text-center mb-6"
					style={{ color: "rgb(123,84,47)" }}
				>
					Welcome Back
				</h2>

				{error && (
					<div
						className="mb-4 p-3 text-sm rounded-md text-red-700"
						style={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}
					>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Email"
						className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(182,119,29)]"
						style={{ borderColor: "rgb(182,119,29)" }}
						required
					/>

					<input
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						placeholder="Password"
						className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(182,119,29)]"
						style={{ borderColor: "rgb(182,119,29)" }}
						required
					/>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
						style={{
							background:
								"linear-gradient(90deg, rgb(182,119,29), rgb(255,157,0))",
						}}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="text-sm text-center mt-5 text-[rgb(123,84,47)]">
					Don’t have an account?{" "}
					<a
						href="/register"
						className="font-semibold hover:underline"
						style={{ color: "rgb(182,119,29)" }}
					>
						Create one
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
