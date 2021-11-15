import React from 'react';

import { Stack, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';

const ChatPanel = () => {
	return (
		<Stack alignItems="center" direction="row" spacing={2}>
			<Box sx={{ width: '15%' }}>
				<Avatar
					sx={{
						background: '#303351',
						width: 50,
						height: 50,
					}}
				>
					OP
				</Avatar>
			</Box>

			<Stack sx={{ width: '60%', textOverflow: 'ellipsis' }}>
				<Typography color="white">Chat Name</Typography>
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
					This is the last message you sent to me hey dude
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
					12 min
				</Typography>
			</Box>
		</Stack>
	);
};

export default ChatPanel;
