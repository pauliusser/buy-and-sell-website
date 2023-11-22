function storeWishlist(list) {
	try {
		if (list.length === 0) {
			clearWishlist();
		} else {
			localStorage.setItem("wish_list", JSON.stringify(list));
		}
	} catch (err) {
		console.log(err);
	}
}

function readWishlist() {
	try {
		const list = JSON.parse(localStorage.getItem("wish_list"));
		return list || [];
	} catch (err) {
		console.log(err);
		return [];
	}
}

function clearWishlist() {
	try {
		localStorage.removeItem("wish_list");
	} catch (err) {
		console.log(err);
	}
}

function removeFromWishlist(itemToRemove) {
	try {
		const currentItems = readWishlist();
		const updatedList = currentItems.filter((obj) => obj !== itemToRemove);
		storeWishlist(updatedList);
	} catch (err) {
		console.log(err);
	}
}

function addToWishlist(itemToAdd) {
	try {
		const list = readWishlist();
		console.log(list);
		list.push(itemToAdd);
		console.log(list);
		storeWishlist(list);
	} catch (err) {
		console.log(err);
	}
}

export { storeWishlist, readWishlist, clearWishlist, removeFromWishlist, addToWishlist };
