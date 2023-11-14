import { http, HttpResponse } from 'msw';

export const serverHandlers = [
	http.post('/watchlist/watch', () => {
		return HttpResponse.json({ success: true });
	})
];
