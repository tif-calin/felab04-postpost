const HISTORY = 'HISTORY';

const deleteHistory = () => {
  localStorage.removeItem(HISTORY);
};

const addToHistory = (url, params, request) => {
  const history = JSON.parse(localStorage.getItem(HISTORY)) || [];
  history.push({ url, params, request, timestamp: Date.now() });
  localStorage.setItem(HISTORY, JSON.stringify(history));
};

const getHistory = () => JSON.parse(localStorage.getItem(HISTORY)) || [];

export { addToHistory, deleteHistory, getHistory };
