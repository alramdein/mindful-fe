import React from 'react';

import { Stack, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';

const ChatPanel = ({ image, partnerName, message, lastMessage }) => {
	return (
		<Stack alignItems="center" direction="row" spacing={2}>
			<Box sx={{ width: '15%' }}>
				<Avatar
					alt={partnerName}
					src={image}
					sx={{
						background: '#303351',
						width: 50,
						height: 50,
					}}
				/>
			</Box>

			<Stack sx={{ width: '60%', textOverflow: 'ellipsis' }}>
				<Typography color="white">{partnerName}</Typography>
				<Typography
					color="white"
					fontSize={13}
					sx={{
						width: '100%',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{message}
				</Typography>
			</Stack>

			<Box sx={{ width: '15%' }}>
				<Typography
					color="white"
					fontSize={13}
					sx={{
						width: '100%',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{Math.ceil(lastMessage / 60)} min
				</Typography>
			</Box>
		</Stack>
	);
};

export default ChatPanel;
