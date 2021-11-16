import RequestAdapterService from './requestAdapterService';

export default class ChatService extends RequestAdapterService {
	baseURL = process.env.NEXT_PUBLIC_BASE_URL;

	async getChatRooms(payload) {
		try {
			const { data } = await super.sendGetRequest(
				`${this.baseURL}/client/job-applications/${id}`,
				payload,
				true
			);

			return data;
		} catch (error) {
			const errMsg = super.generateErrMessage(error);
			throw new Error('Getting room list: ' + errMsg);
		}
	}
}
