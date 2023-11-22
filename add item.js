import { fetchItems, postItem, removeItem, fetchOneItem } from "./scripts/api.js";
import { buildHeader, buildFooter } from "./scripts/header and footer.js";

buildHeader();
buildFooter();

const addBtn = document.getElementById("add-item");
const message = document.getElementById("message");
message.style.display = "none";

addBtn.addEventListener("click", () => {
	// console.log("click");
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

		// console.log("upload successfull");
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
		date_added: "2023 11 22",
		city: cityInput,
	};
	return itemObj;
}
async function uploaditemObj(itemObj) {
	// console.log(itemObj);
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
