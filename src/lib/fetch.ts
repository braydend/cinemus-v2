export const post = async <BodyType extends object>(route: string, body: BodyType) =>
	fetch(new URL(route, typeof location !== 'undefined' ? location.origin : undefined), {
		method: 'POST',
		body: JSON.stringify(body)
	});

export const get = async (route: string) =>
	fetch(new URL(route, typeof location !== 'undefined' ? location.origin : undefined), {
		method: 'GET'
	});
