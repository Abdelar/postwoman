import { parse } from './parse';

export const withElementParsed = (container, ...elements) => {
	elements.forEach(element => {
		if (container[element]) {
			container[element] = parse(container[element]);
		}
	});
	return container;
};
