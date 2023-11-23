import { fetchItems, postItem, removeItem, fetchOneItem } from "./scripts/api.js";
import { buildHeader, buildFooter } from "./scripts/elements.js";

buildHeader();
buildFooter();

const burgerBtn = document.getElementById("burger-btn");
const burgerMenu = document.getElementById("burger-menu");
burgerBtn.addEventListener("click", () => {
	burgerMenu.classList.toggle("burger-menu-active");
});

const addBtn = document.getElementById("add-item");
const message = document.getElementById("message");
message.style.display = "none";

addBtn.addEventListener("click", () => {
	const res = itemObjMaker();
	if (typeof res != "object") {
		message.style.display = "flex";
		message.style.backgroundColor = "red";
		message.textContent = res;
	} else {
		uploaditemObj(res);

		message.style.display = "flex";
		message.style.backgroundColor = "green";
		message.textContent = "success!";

		setTimeout(() => {
			window.location.replace("./index.html");
		}, 3000);
	}
});

function itemObjMaker() {
	const imgInput = document.getElementById("img").value;
	const nameInput = document.getElementById("item-name").value;
	const priceInput = document.getElementById("price").value;
	const descriptionInput = document.getElementById("description").value;
	const cityInput = document.getElementById("city").value;
	const currentDate = getCurrentTimeString();

	if (imgInput === "") {
		return "Image url is missing!";
	}
	if (nameInput === "") {
		return "name is missing!";
	}
	if (priceInput === "") {
		return "price is missing!";
	}
	if (descriptionInput === "") {
		return "description is missing!";
	}
	if (descriptionInput.length < 3) {
		return "description too short!";
	}
	if (cityInput === "") {
		return "city is missing!";
	}
	if (priceInput <= 0) {
		return "invalid price!";
	}
	const itemObj = {
		name: nameInput,
		price: priceInput,
		pic_url: imgInput,
		description: descriptionInput,
		date_added: currentDate,
		city: cityInput,
	};
	return itemObj;
}
async function uploaditemObj(itemObj) {
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

function getCurrentTimeString() {
	const currentDate = new Date();

	// Get year, month, and day components
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are zero-based
	const day = currentDate.getDate().toString().padStart(2, "0");

	// Create the time string in the format "yyyy mm dd"
	const timeString = `${year}${month}${day}`;

	return timeString;
}
