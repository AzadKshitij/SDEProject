import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase";
import Alert from "@mui/material/Alert";

function Login() {
	const [values, setValues] = useState({
		email: "",
		pass: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
	const navigate = useNavigate();

	const handlegoogle = () => {
		signInWithGoogle();
		navigate("/");
	};

	const handleSubmission = () => {
		if (!values.email || !values.pass) {
			setErrorMsg("Fill all fields");
			return;
		}
		setErrorMsg("");

		setSubmitButtonDisabled(true);
		signInWithEmailAndPassword(auth, values.email, values.pass)
			.then(async (res) => {
				setSubmitButtonDisabled(false);
				navigate("/");
			})
			.catch((err) => {
				setSubmitButtonDisabled(false);
				setErrorMsg(err.message);
			});
	};
	return (
		<div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
			<div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
				<div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 p-4">
					Login To Your Account
				</div>
				<button
					type="button"
					class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
					onClick={handlegoogle}
				>
					<svg
						class="mr-2 -ml-1 w-4 h-4"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="google"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 488 512"
					>
						<path
							fill="currentColor"
							d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
						></path>
					</svg>
					Sign in with Google
				</button>
				<div class="relative mt-10 h-px bg-gray-300">
					<div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
						<span class="bg-white px-4 text-xs text-gray-500 uppercase">
							Or Login With Email
						</span>
					</div>
				</div>
				<div class="mt-10">
					<form action="#">
						<div class="flex flex-col mb-6">
							<label
								for="email"
								class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
							>
								E-Mail Address:
							</label>
							<div class="relative">
								<div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
									<svg
										class="h-6 w-6"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
									</svg>
								</div>

								<input
									id="email"
									type="email"
									name="email"
									class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
									placeholder="E-Mail Address"
									onChange={(event) =>
										setValues((prev) => ({
											...prev,
											email: event.target.value,
										}))
									}
								/>
							</div>
						</div>
						<div class="flex flex-col mb-6">
							<label
								for="password"
								class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
							>
								Password:
							</label>
							<div class="relative">
								<div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
									<span>
										<svg
											class="h-6 w-6"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
									</span>
								</div>

								<input
									id="password"
									type="password"
									name="password"
									class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
									placeholder="Password"
									onChange={(event) =>
										setValues((prev) => ({ ...prev, pass: event.target.value }))
									}
								/>
							</div>
						</div>

						<div class="flex items-center mb-6 -mt-4">
							<div class="flex ml-auto">
								{/* <a
									href="#"
									class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
								>
									Forgot Your Password?
								</a> */}
							</div>
						</div>
						{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
						<div class="flex w-full">
							<button
								type="submit"
								disabled={submitButtonDisabled}
								onClick={handleSubmission}
								class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
							>
								<span class="mr-2 uppercase">Login</span>
								<span>
									<svg
										class="h-6 w-6"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</span>
							</button>
						</div>
					</form>
				</div>
				<div class="flex justify-center items-center mt-6">
					{/* <a
						href="#"
						target="_blank"
						class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
					> */}
					<span>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
						</svg>
					</span>
					<Link to="/signup">
						<span class="ml-2">You don't have an account?</span>
					</Link>
					{/* </a> */}
				</div>
			</div>
		</div>
	);
}

export default Login;
