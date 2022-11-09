import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, signInWithGoogle } from "../../firebase";
import Alert from "@mui/material/Alert";

function SignUp() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: "",
		email: "",
		pass: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

	const handlegoogle = () => {
		signInWithGoogle();
		navigate("/");
	};

	const handleSubmission = () => {
		if (!values.name || !values.email || !values.pass) {
			setErrorMsg("Fill all fields");
			return;
		}
		setErrorMsg("");

		setSubmitButtonDisabled(true);
		createUserWithEmailAndPassword(auth, values.email, values.pass)
			.then(async (res) => {
				setSubmitButtonDisabled(false);
				const user = res.user;
				await updateProfile(user, {
					displayName: values.name,
				});
				navigate("/");
			})
			.catch((err) => {
				setSubmitButtonDisabled(false);
				setErrorMsg(err.message);
			});
	};
	return (
		<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div
				class="
        flex flex-col
        bg-white
        shadow-md
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        py-8
        rounded-3xl
        w-50
        max-w-md
      "
			>
				<div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
					Create Account
				</div>
				{/* <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
					Enter your credentials to get access account
				</div> */}

				<div class="mt-10">
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
					<form action="#">
						<div class="flex flex-col mb-5">
							<label
								for="email"
								class="mb-1 text-xs tracking-wide text-gray-600"
							>
								Name:
							</label>
							<div class="relative">
								<div
									class=" inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
								>
									<i class="fas fa-user text-blue-500"></i>
								</div>

								<input
									id="email"
									type="email"
									name="email"
									class="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
									placeholder="Enter your name"
									onChange={(event) =>
										setValues((prev) => ({ ...prev, name: event.target.value }))
									}
								/>
							</div>
						</div>
						<div class="flex flex-col mb-5">
							<label
								for="email"
								class="mb-1 text-xs tracking-wide text-gray-600"
							>
								E-Mail Address:
							</label>
							<div class="relative">
								<div
									class="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
								>
									<i class="fas fa-at text-blue-500"></i>
								</div>

								<input
									id="email"
									type="email"
									name="email"
									class="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
									onChange={(event) =>
										setValues((prev) => ({
											...prev,
											email: event.target.value,
										}))
									}
									placeholder="Enter your email"
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
								<div
									class="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
								>
									<span>
										<i class="fas fa-lock text-blue-500"></i>
									</span>
								</div>

								<input
									id="password"
									type="password"
									name="password"
									class="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
									placeholder="Enter your password"
									onChange={(event) =>
										setValues((prev) => ({ ...prev, pass: event.target.value }))
									}
								/>
							</div>
						</div>
						{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
						<div class="flex w-full">
							<button
								onClick={handleSubmission}
								disabled={submitButtonDisabled}
								type="submit"
								class="
                flex
                mt-2
                items-center
                justify-center
                focus:outline-none
                text-white text-sm
                sm:text-base
                bg-blue-500
                hover:bg-blue-600
                rounded-2xl
                py-2
                w-full
                transition
                duration-150
                ease-in
              "
							>
								<span class="mr-2 uppercase">Sign Up</span>
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
			</div>
			<div class="flex justify-center items-center mt-6">
				{/* <a
					href="#"
					target="_blank"
					class="
          inline-flex
          items-center
          text-gray-700
          font-medium
          text-xs text-center
        "
				> */}
				<span class="ml-2">
					You have an account?
					<Link to="/login">
						<span class="text-xs ml-2 text-blue-500 font-semibold">
							Login here
						</span>
					</Link>
				</span>
				{/* </a> */}
			</div>
		</div>
	);
}

export default SignUp;
