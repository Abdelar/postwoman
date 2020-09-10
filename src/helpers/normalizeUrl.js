export const normalizeUrl = url => {
	return url.toLowerCase().startsWith('http://') ||
		url.toLowerCase().startsWith('https://')
		? url
		: 'http://' + url;
};
