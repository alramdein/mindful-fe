import RequestAdapterService from './requestAdapterService';

export default class ChatService extends RequestAdapterService {
	baseURL = process.env.NEXT_PUBLIC_BASE_URL;

	async createNewChat(payload) {
		try {
			// const { data } = await super.sendGetRequest(
			// 	`${this.baseURL}/chat/partner-room`,
			// 	payload,
			// 	true
			// );

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

	async getChatRooms(payload) {
		try {
			// const { data } = await super.sendGetRequest(
			// 	`${this.baseURL}/chat/partner-room`,
			// 	payload,
			// 	true
			// );

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

	async getPartnerBySubId(payload) {
		try {
			// const { data } = await super.sendPostRequest(
			// 	`${this.baseURL}/user/partner`,
			// 	payload,
			// 	true
			// );

			return [
				{
					id: 65,
					sub: 'aasdaggg',
					name: 'Chifuyu',
					avatar: 'url_avatar_chifuyu',
					created_at: '2021-11-16T02:54:40.000Z',
					updated_at: '2021-11-15T20:59:19.000Z',
				},
				{
					id: 75,
					sub: 'hhsdaehd',
					name: 'Daniel',
					avatar: 'example_url_image.com',
					created_at: '2021-11-16T02:54:42.000Z',
					updated_at: '2021-11-15T22:53:32.000Z',
				},
				{
					id: 85,
					sub: 'asdahfas',
					name: 'Alif',
					avatar: 'example_url_image.com',
					created_at: '2021-11-16T03:09:33.000Z',
					updated_at: '2021-11-15T22:58:32.000Z',
				},
			];
			return data;
		} catch (error) {
			const errMsg = super.generateErrMessage(error);
			throw new Error('Getting room list: ' + errMsg);
		}
	}
}
