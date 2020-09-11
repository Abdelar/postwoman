export const updateLocalStorage = (logs, log, setLogs) => {
	const updatedLogs = JSON.parse(logs);
	updatedLogs.push(log);
	setLogs(JSON.stringify(updatedLogs));
	return updatedLogs;
};
