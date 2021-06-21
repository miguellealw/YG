import React, { useEffect, useState } from "react"
import { AuthApi } from './api/auth'

import {useRouter} from 'next/router'
import { useAuth } from "../utils/auth/useAuth"
import useUser from "../utils/auth/useUser"
import Layout from './layout'
import Link from "next/link"
import InputField from "../components/InputField"

const LogIn : React.FC = () => {
	const router = useRouter()
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

	const {mutateUser} = useUser({
		redirectTo: "/channels",
		redirectIfFound: true
	})

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    try {
      const api = new AuthApi();
      api.setup();
      const response = await api.login(username, password);

      if (response.kind === "ok") {
				mutateUser(response)
				router.push('/channels')
      } else {
        setIsError(true);
      }

    } catch (err) {
      setIsError(true);
    }
  };


	return (
		<Layout>
			<div className = "w-full h-screen flex flex-col justify-center items-center">
				<h1 className="text-5xl font-bold mb-10">Login</h1>
				<form action="POST" onSubmit={onSubmit}>
					<InputField label="Username" type="text" setValue={setUsername}/>
					<InputField label="Password" type="password" setValue={setPassword}/>
					<button type="submit" className="bg-red-600 hover:bg-red-500 text-white py-2  text-center font-bold w-full">Log In</button>
				</form>
	
				{isError && (
						<div>
							There's an error while login, try again!
						</div>
					)}

				<div className="pt-2">
					Don&apos;t have an account? 
					<Link href="/register" passHref>
						<a className="underline text-gray-400 pl-1">Register</a>
					</Link>
				</div>
			</div>
		</Layout>
	)

}


export default LogIn