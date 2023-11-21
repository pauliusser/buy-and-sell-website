import { fetchItems, postItem, removeItem } from "./scripts/api.js";
import buildHeader from "./scripts/header.js";
import buildFooter from "./scripts/footer.js";

const cardWrapper = document.getElementById("card-wrapper");

let itemsList = [];
buildHeader();
buildCards();
buildFooter();

async function itemsListUpdate() {
	const fetchedItems = await fetchItems();
	itemsList = fetchedItems;
}

async function buildCards() {
	await itemsListUpdate();
	itemsList.forEach((item) => {
		const card = document.createElement("div");
		card.classList.add("card");

		const img = document.createElement("img");
		img.src = item.pic_url;

		const cardText = document.createElement("div");
		cardText.classList.add("card-text");

		const title = document.createElement("h3");
		title.textContent = `${item.name} • ${item.price} €`;

		const city = document.createElement("h4");
		city.textContent = item.city;

		const date = document.createElement("h4");
		date.textContent = item.date_added;

		cardText.append(title, city, date);
		card.append(img, cardText);
		cardWrapper.append(card);
	});
}
