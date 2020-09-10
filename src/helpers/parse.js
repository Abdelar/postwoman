export const parse = raw => {
	try {
		return JSON.parse(raw);
	} catch {
		return raw;
	}
};
