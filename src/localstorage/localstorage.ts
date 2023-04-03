export const setItemInLS = (key: string, id: string) => {
	localStorage.setItem(key, JSON.stringify(id));
};

export const getItemFromLS = (key: string) => {
	const savedDate = localStorage.getItem(key);

	if (savedDate) {
		return JSON.parse(savedDate);
	}

	return null;
};
