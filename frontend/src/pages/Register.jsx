import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { register } = useAuth();

	const handleChange = (e) =>
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await register(form.username, form.email, form.password);
			setLoading(false);
			navigate("/login");
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message || "Registration Failed");
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(255,207,113)] via-[rgb(255,157,0)] to-[rgb(182,119,29)]"
		>
			<div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
				<h2
					className="text-3xl font-bold text-center mb-6"
					style={{ color: "rgb(123,84,47)" }}
				>
					Create Your Account
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
						type="text"
						name="username"
						value={form.username}
						onChange={handleChange}
						placeholder="Full Name"
						className="w-full border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(182,119,29)]"
						style={{ borderColor: "rgb(182,119,29)" }}
						required
					/>

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

					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={form.password}
							onChange={handleChange}
							placeholder="Password"
							className="w-full border px-3 py-2 rounded-lg pr-10 shadow-sm focus:ring-2 focus:ring-[rgb(182,119,29)]"
							style={{ borderColor: "rgb(182,119,29)" }}
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-2.5 text-gray-500 hover:text-[rgb(182,119,29)]"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
						style={{
							background:
								"linear-gradient(90deg, rgb(182,119,29), rgb(255,157,0))",
						}}
					>
						{loading ? "Creating..." : "Create Account"}
					</button>
				</form>

				<p className="text-sm text-center mt-5 text-[rgb(123,84,47)]">
					Already have an account?{" "}
					<a
						href="/login"
						className="font-semibold hover:underline"
						style={{ color: "rgb(182,119,29)" }}
					>
						Login here
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
