import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import AuthService from '../services/AuthService';

const checkIfUserAlreadyStoreProfile = () => {
	const profile = localStorage.getItem('hasStoreProfile');
	return profile ? true : false;
};

function Profile() {
	const authService = new AuthService();
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	useEffect(() => {
		(async () => {
			const isAlreadyStoreProfile = checkIfUserAlreadyStoreProfile();

			console.log(isAlreadyStoreProfile);
			if (!isAlreadyStoreProfile) await storeProfile();
		})();
	}, []);

	const storeProfile = async () => {
		try {
			await authService.saveProfile(user);
			console.info('Succesfully store profile to database');
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		user && (
			<div>
				<p>{JSON.stringify(user, null, 2)}</p>
				<Image
					src={user.picture}
					height="100"
					width="100"
					alt={user.name}
				/>

				<h2>name: </h2>
				<span>{user.name}</span>
				<h2>email: </h2>
				<span>{user.email}</span>

				<h1>
					<Link href="/">Back to Home</Link>
				</h1>

				<Link href="/chat">
					<Button
						sx={{
							background: 'skyblue',
							bottom: 30,
							color: 'white',
							position: 'fixed',
							right: 50,
						}}
					>
						<ChatBubbleIcon sx={{ color: 'white' }} /> Go To Chat
					</Button>
				</Link>
			</div>
		)
	);
}

export default withPageAuthRequired(Profile);
