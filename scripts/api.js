async function fetchItems() {
	try {
		const fetchedData = await fetch("https://65552d2e63cafc694fe784d3.mockapi.io/item/");
		const items = await fetchedData.json();
		return items;
	} catch (err) {
		console.log("error", err);
	}
}
async function postItem(itemObj) {
	try {
		await fetch("https://65552d2e63cafc694fe784d3.mockapi.io/item/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(itemObj),
		});
	} catch (err) {
		console.log("error", err);
	}
}
async function removeItem(itemId) {
	try {
		await fetch(`https://65552d2e63cafc694fe784d3.mockapi.io/item/${itemId}`, { method: "DELETE" });
	} catch (err) {
		console.log("error", err);
	}
}

export { fetchItems, postItem, removeItem };
