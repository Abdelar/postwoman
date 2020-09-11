export const updateLocalStorage = (logs, log, setLogs) => {
	const updatedLogs = JSON.parse(logs);
	updatedLogs.unshift(log);
	setLogs(JSON.stringify(updatedLogs));
	return updatedLogs;
};
