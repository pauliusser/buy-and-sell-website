import { fetchItems, postItem, removeItem, fetchOneItem } from "./scripts/api.js";
import { buildHeader, buildFooter, updateWishlistCounter } from "./scripts/header and footer.js";
import { storeWishlist, readWishlist, clearWishlist, removeFromWishlist, addToWishlist } from "./scripts/localstorage.js";
const itemWrapper = document.getElementById("item-wrapper");

buildHeader();
buildElements();
buildFooter();

const burgerBtn = document.getElementById("burger-btn");
const burgerMenu = document.getElementById("burger-menu");
burgerBtn.addEventListener("click", () => {
	burgerMenu.classList.toggle("burger-menu-active");
});

async function buildElements() {
	const id = localStorage.getItem("item_Id");
	const item = await fetchOneItem(id);

	const img = document.createElement("img");
	img.classList.add("item-img");
	img.src = item.pic_url;

	const title = document.createElement("h3");
	title.textContent = item.name;

	const price = document.createElement("h3");
	price.textContent = item.price + " €";

	const details = document.createElement("h4");
	const numericDate = item.date_added;
	const dateString = numericDate.toString();
	const yyyy = dateString.slice(0, 4);
	const mm = dateString.slice(4, 6);
	const dd = dateString.slice(6, 8);
	details.textContent = `${yyyy} ${mm} ${dd} • ${item.city}`;

	const description = document.createElement("p");
	description.textContent = item.description;

	const message = document.createElement("div");
	message.setAttribute("id", "message");
	message.textContent = "Item was removed!";
	message.style.display = "none";

	const removeBtn = document.createElement("button");
	removeBtn.textContent = "X";
	removeBtn.classList.add("remove-btn");
	removeBtn.addEventListener("click", async () => {
		removeFromWishlist(Number(item.id));
		updateWishlistCounter();

		localStorage.removeItem("item_Id");
		await removeItem(id);
		contactSeller.style.display = "none";
		message.style.display = "flex";
		message.style.backgroundColor = "red";
		setTimeout(() => {
			window.location.replace("./index.html");
		}, 3000);
	});
	const contactSeller = document.createElement("button");
	contactSeller.textContent = "Contact Seller";
	contactSeller.classList.add("contact-seller-btn");
	contactSeller.addEventListener("click", () => {
		alert("this page is for demonstration purpose only");
	});

	itemWrapper.append(removeBtn, title, img, price, details, description, message, contactSeller);
}
