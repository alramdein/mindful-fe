import React, { useRef, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Stack, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';

import ChatPanel from '../comps/Chat/ChatPanel';
import Message from '../comps/Chat/Message';
import ChatRoomHeader from '../comps/Chat/ChatRoomHeader';

import ChatService from '../services/ChatService';

const ChatPage = () => {
	const { user, error, isLoading } = useUser();
	const [keyword, setKeyword] = useState('');

	const getChatRooms = async () => {
		try {
			const chatService = new ChatService();

			const response = ChatService.getChatRooms({
				sub: user.sub,
				keyword,
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			await getChatRooms();
		})();
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<Stack
			direction="row"
			py={3}
			sx={{
				boxSizign: 'border-box',
				color: 'white',
				height: '100vh',
				width: '100vw',
				overflow: 'hidden',
				background:
					'linear-gradient(149deg, rgba(94,98,201,1) 0%, rgba(46,47,75,1) 100%)',
			}}
		>
			<Box sx={{ width: '30%' }} px={5}>
				<Stack spacing={2}>
					<Stack
						alignItems="center"
						direction="row"
						justifyContent="space-between"
						sx={{ maxHeight: '15vh' }}
					>
						<Typography sx={{ color: 'white', fontSize: 24 }}>
							Chat
						</Typography>

						<Stack direction="row">
							<AddOutlinedIcon />
						</Stack>
					</Stack>

					<TextField
						fullWidth
						id="friend-search"
						placeholder="Search friend..."
						color="secondary"
						onChange={(e) => console.log(e)}
						ref={searchInputRef}
						sx={{
							background:
								'linear-gradient(149deg, rgba(116,118,164,1) 0%, rgba(59,59,90,1) 100%)',
						}}
					/>

					<Stack
						className="chat-panel"
						sx={{ maxHeight: '85vh', overflowY: 'auto' }}
						spacing={3}
					>
						{new Array(8).fill('').map((_, index) => (
							<ChatPanel key={`cht-pnl-key_${index}`} />
						))}
					</Stack>
				</Stack>
			</Box>

			<Box sx={{ width: '70%' }} px={5}>
				<Stack spacing={3}>
					<Stack
						alignItems="center"
						direction="row"
						justifyContent="space-between"
						sx={{ maxHeight: '15vh' }}
					>
						<ChatRoomHeader
							name="Alif R"
							isOnline={true}
							image={null}
						/>
					</Stack>

					<Stack
						className="chat-room"
						sx={{
							maxHeight: '70vh',
							overflowY: 'auto',
							scrollbarWidth: 'none',
						}}
						spacing={3}
					>
						{[
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`,
								is_my_message: true,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
								is_my_message: false,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`,
								is_my_message: true,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
								is_my_message: false,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`,
								is_my_message: true,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
								is_my_message: false,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged`,
								is_my_message: true,
							},
							{
								message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
								is_my_message: false,
							},
						].map(({ message, is_my_message }, index) => {
							return (
								<Message
									key={`msg-key_${index}`}
									message={message}
									isMyMessage={is_my_message}
								/>
							);
						})}
					</Stack>

					<Box sx={{ height: '20vh', bottom: 0 }}>
						<TextField
							className="message-input"
							fullWidth
							id="chat-message"
							maxRows={2}
							multiline
							placeholder="Write your message here..."
							color="secondary"
							sx={{
								background:
									'linear-gradient(149deg, rgba(116,118,164,1) 0%, rgba(59,59,90,1) 100%)',
							}}
						/>
					</Box>
				</Stack>
			</Box>
		</Stack>
	);
};

export default withPageAuthRequired(ChatPage);
