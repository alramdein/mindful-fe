import RequestAdapterService from './requestAdapterService';

export default class ChatService extends RequestAdapterService {
	baseURL = process.env.NEXT_PUBLIC_BASE_URL;

	async getChatRooms(payload) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseURL}/chat/partner-room`,
				payload,
				true
			);

			return [
				{
					partner_name: 'Chifuyu',
					partner_avatar: 'url_avatar_chifuyu',
					last_partner_message: 'Ohhh',
					last_chat_minute: 20573,
				},
			];
			return data;
		} catch (error) {
			const errMsg = super.generateErrMessage(error);
			throw new Error('Getting room list: ' + errMsg);
		}
	}
}
