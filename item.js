import { fetchItems, postItem, removeItem, fetchOneItem } from "./scripts/api.js";
import { buildHeader, buildFooter } from "./scripts/header and footer.js";
const itemWrapper = document.getElementById("item-wrapper");

buildHeader();
buildElements();
buildFooter();

async function buildElements() {
	const id = localStorage.getItem("item_Id");
	const item = await fetchOneItem(id);

	console.log(item);

	const img = document.createElement("img");
	img.classList.add("item-img");
	img.src = item.pic_url;

	const title = document.createElement("h3");
	title.textContent = item.name;

	const price = document.createElement("h3");
	price.textContent = item.price + " €";

	const details = document.createElement("h4");
	details.textContent = `${item.date_added} ${item.city}`;

	const description = document.createElement("p");
	description.textContent = item.description;

	const removeBtn = document.createElement("button");
	removeBtn.textContent = "X";
	removeBtn.classList.add("remove-btn");
	removeBtn.addEventListener("click", async () => {
		localStorage.removeItem("item_Id");
		await removeItem(id);
		setTimeout(window.location.replace("./index.html"), 2000);
	});

	itemWrapper.append(removeBtn, title, img, price, details, description);
}
