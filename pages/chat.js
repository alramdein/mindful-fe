import React, { useEffect, useState } from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Avatar, Stack, Typography, TextField, Skeleton } from '@mui/material';
import { Box } from '@mui/system';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ChatPanel from '../comps/Chat/ChatPanel';
import Message from '../comps/Chat/Message';
import ChatRoomHeader from '../comps/Chat/ChatRoomHeader';

import ChatService from '../services/ChatService';

const ChatPage = () => {
	const { user, error, isLoading } = useUser();

	const [isLoadingRoom, setIsLoadingRoom] = useState(true);
	const [isSelectingPartner, setIsSelectingPartner] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [partnerKeyword, setPartnerKeyword] = useState('');
	const [rooms, setRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [partners, setPartners] = useState([]);

	useEffect(() => {
		(async () => {
			await getChatRooms();
		})();
	}, []);

	useEffect(() => {
		(async () => {
			await getChatRooms();
		})();
	}, [keyword]);

	useEffect(() => {
		(async () => {
			await openChoosePartnerPanel();
		})();
	}, [partnerKeyword]);

	const createNewChat = async () => {
		try {
			const chatService = new ChatService();

			const response = await chatService.createNewChat({
				owner_sub: user.sub,
				keyword,
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	const getChatRooms = async () => {
		try {
			setIsLoadingRoom(true);
			const chatService = new ChatService();

			const response = await chatService.getChatRooms({
				owner_sub: user.sub,
				keyword,
			});
			setRooms(response);
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoadingRoom(false);
		}
	};

	const openChoosePartnerPanel = async () => {
		try {
			setIsLoadingRoom(true);

			const chatService = new ChatService();
			const response = await chatService.getPartnerBySubId({
				owner_sub: user.sub,
				keyword: partnerKeyword,
			});
			setPartners(response);

			setIsSelectingPartner(true);
		} catch (error) {
			error.message(true);
		} finally {
			setIsLoadingRoom(false);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	console.log(selectedRoom);

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
							{!isSelectingPartner ? (
								<AddOutlinedIcon
									sx={{ cursor: 'pointer' }}
									onClick={openChoosePartnerPanel}
								/>
							) : (
								<ArrowBackIosIcon
									sx={{ cursor: 'pointer' }}
									onClick={() => setIsSelectingPartner(false)}
								/>
							)}
						</Stack>
					</Stack>

					{!isSelectingPartner ? (
						<>
							<TextField
								fullWidth
								id="friend-search"
								placeholder="Search friend..."
								color="secondary"
								onChange={(e) => setKeyword(e.target.value)}
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
								{isLoadingRoom ? (
									new Array(8)
										.fill('')
										.map((_, index) => (
											<Skeleton varian="text" />
										))
								) : rooms.length === 0 ? (
									<Typography sx={{ color: 'white' }}>
										Start chatting with your friend by
										clicking the + icon on top right corner
									</Typography>
								) : (
									rooms.map(
										({
											partner_name,
											partner_avatar,
											last_partner_message,
											last_chat_minute,
											room_id,
										}) => (
											<ChatPanel
												onClick={() =>
													setSelectedRoom({
														avatar: partner_avatar,
														roomId: room_id,
														partnerName:
															partner_name,
													})
												}
												partnerName={partner_name}
												image={partner_avatar}
												message={last_partner_message}
												lastMessage={last_chat_minute}
											/>
										)
									)
								)}
							</Stack>
						</>
					) : (
						<>
							<TextField
								fullWidth
								id="friend-search"
								placeholder="Choose partner..."
								color="secondary"
								onChange={(e) =>
									setPartnerKeyword(e.target.value)
								}
								sx={{
									background:
										'linear-gradient(149deg, rgba(116,118,164,1) 0%, rgba(59,59,90,1) 100%)',
								}}
							/>

							{partners.map(
								({
									avatar,
									name: partnerName,
									sub,
									...rest
								}) => {
									return (
										<Stack
											alignItems="center"
											spacing={2}
											direction="row"
											sx={{ cursor: 'pointer' }}
											onClick={() =>
												createNewChat({
													avatar,
													partnerName,
													sub,
													...rest,
												})
											}
										>
											<Box
												sx={{
													width: '15%',
												}}
											>
												<Avatar
													alt={partnerName}
													src={avatar}
													sx={{
														background: '#303351',
														width: 50,
														height: 50,
													}}
												/>
											</Box>

											<Typography color="white">
												{partnerName}
											</Typography>
										</Stack>
									);
								}
							)}
						</>
					)}
				</Stack>
			</Box>

			<Box sx={{ width: '70%' }} px={5}>
				{!selectedRoom ? (
					<Box />
				) : (
					<Stack spacing={3}>
						<Stack
							alignItems="center"
							direction="row"
							justifyContent="space-between"
							sx={{ maxHeight: '15vh' }}
						>
							<ChatRoomHeader
								name={selectedRoom.partnerName}
								isOnline={true}
								image={selectedRoom.avatar}
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
				)}
			</Box>
		</Stack>
	);
};

export default withPageAuthRequired(ChatPage);
