import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(255,207,113)] via-[rgb(255,157,0)] to-[rgb(182,119,29)]">
			<div className="max-w-3xl text-center bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl mx-4">
				<h1
					className="text-5xl font-extrabold mb-6"
					style={{
						color: "rgb(123,84,47)",
						textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
					}}
				>
					Welcome to Secure Forms
				</h1>

				<p
					className="text-lg mb-8 leading-relaxed"
					style={{ color: "rgb(123,84,47)" }}
				>
					Protect your credentials with our secure database and authenticated
					routes. Experience seamless registration, login, and data protection —
					all in one place.
				</p>

				<div className="flex flex-col sm:flex-row justify-center gap-5">
					<Link
						to="/register"
						className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300"
						style={{
							background:
								"linear-gradient(90deg, rgb(182,119,29), rgb(255,157,0))",
						}}
					>
						Get Started
					</Link>

					<Link
						to="/login"
						className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-lg border-2 transition-all duration-300"
						style={{
							borderColor: "rgb(182,119,29)",
							color: "rgb(182,119,29)",
						}}
					>
						Already have an account?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Landing;
