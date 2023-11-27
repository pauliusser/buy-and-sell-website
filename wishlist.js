import { buildHeader, buildFooter, updateWishlistCounter } from "./scripts/elements.js";
import { readWishlist, clearWishlist, removeFromWishlist } from "./scripts/localstorage.js";
import { fetchItems } from "./scripts/api.js";

const clearListBtn = document.getElementById("clear-btn");
const wishListWrapper = document.getElementById("wish-list-wrapper");

const wishlistIds = readWishlist();
let wishListItems;

buildHeader();
firstCardDraw();
buildFooter();

const burgerBtn = document.getElementById("burger-btn");
const burgerMenu = document.getElementById("burger-menu");
burgerBtn.addEventListener("click", () => {
	burgerMenu.classList.toggle("burger-menu-active");
});

async function firstCardDraw() {
	wishListWrapper.innerHTML = "";
	wishListItems = await getwishListItems();
	drawCards(wishListItems);
}
function drawCards(wishListItems) {
	wishListWrapper.innerHTML = "";
	wishListItems.forEach((item) => {
		function goToItem() {
			localStorage.setItem("item_Id", item.id);
			window.location.replace("item.html");
		}

		const card = document.createElement("div");
		card.classList.add("wish-list-card");

		const img = document.createElement("img");
		img.src = item.pic_url;
		img.addEventListener("click", goToItem);

		const name = document.createElement("h2");
		name.textContent = item.name;
		name.addEventListener("click", goToItem);

		const price = document.createElement("h3");
		price.textContent = item.price + " €";
		price.addEventListener("click", goToItem);

		const eraseBtn = document.createElement("button");
		eraseBtn.textContent = "remove";
		eraseBtn.addEventListener("click", async () => {
			wishListItems = wishListItems.filter((i) => i.id != item.id);
			const itemId = Number(item.id);
			removeFromWishlist(itemId);
			updateWishlistCounter();
			drawCards(wishListItems);
		});
		card.append(img, name, price, eraseBtn);
		wishListWrapper.append(card);
	});
}
function goToItem() {
	localStorage.setItem("item_Id", item.id);
	window.location.replace("item.html");
}

async function getwishListItems() {
	const wishlistItems = [];
	const allItems = await fetchItems();
	wishlistIds.forEach((index) => {
		const whishedItem = allItems.find((item) => {
			if (item.id == index) {
				return item;
			}
		});
		wishlistItems.push(whishedItem);
	});
	return wishlistItems;
}
clearListBtn.addEventListener("click", () => {
	clearWishlist();
	wishListItems = [];
	updateWishlistCounter();
	wishListWrapper.innerHTML = "";
});
