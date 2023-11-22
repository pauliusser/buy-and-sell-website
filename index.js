import { fetchItems, postItem, removeItem, fetchOneItem } from "./scripts/api.js";
import { buildHeader, buildFooter } from "./scripts/header and footer.js";
import Btn from "./scripts/btn class.js";

const cardWrapper = document.getElementById("card-wrapper");
const vilniusBtnObj = document.getElementById("vilnius");
const kaunasBtnObj = document.getElementById("kaunas");
const klaipedaBtnObj = document.getElementById("klaipeda");

new Btn(vilniusBtnObj, buildFilteredBy, "Vilnius", redraw);
new Btn(kaunasBtnObj, buildFilteredBy, "Kaunas", redraw);
new Btn(klaipedaBtnObj, buildFilteredBy, "Klaipėda", redraw);

let itemsList = [];
buildHeader();
firstDraw();
buildFooter();

async function firstDraw() {
	const fetchedItems = await fetchItemsList();
	buildCards(fetchedItems);
	itemsList = fetchedItems;
}
async function fetchItemsList() {
	const fetchedItems = await fetchItems();
	return fetchedItems;
}
function buildFilteredBy(c) {
	const filteredArr = itemsList.filter((item) => item.city === c);
	cardWrapper.innerHTML = "";
	buildCards(filteredArr);
}
function redraw() {
	cardWrapper.innerHTML = "";
	buildCards(itemsList);
}

async function buildCards(iList) {
	iList.forEach((item) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.addEventListener("click", () => {
			localStorage.setItem("item_Id", item.id);
			window.location.replace("item.html");
		});

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
