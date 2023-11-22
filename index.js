import { fetchItems, postItem, removeItem, fetchOneItem } from "./scripts/api.js";
import { buildHeader, buildFooter, updateWishlistCounter } from "./scripts/header and footer.js";
import { storeWishlist, readWishlist, clearWishlist, removeFromWishlist, addToWishlist } from "./scripts/localstorage.js";
import Btn from "./scripts/btn class.js";

const cardWrapper = document.getElementById("card-wrapper");
const vilniusBtnObj = document.getElementById("vilnius");
const kaunasBtnObj = document.getElementById("kaunas");
const klaipedaBtnObj = document.getElementById("klaipeda");
const sortDateBtnObj = document.getElementById("srt-date");
const sortNameBtnObj = document.getElementById("srt-name");
const sortPriceBtnObj = document.getElementById("srt-price");

new Btn(vilniusBtnObj, buildFilteredBy, "Vilnius", redraw, "filter");
new Btn(kaunasBtnObj, buildFilteredBy, "Kaunas", redraw, "filter");
new Btn(klaipedaBtnObj, buildFilteredBy, "Klaipėda", redraw, "filter");
new Btn(sortDateBtnObj, buildSortedBy, "date", redraw, "sort");
new Btn(sortNameBtnObj, buildSortedBy, "name", redraw, "sort");
new Btn(sortPriceBtnObj, buildSortedBy, "price", redraw, "sort");

let itemsList = [];
let wishList = readWishlist();

buildHeader();
console.log(wishList.length);
firstDraw();
buildFooter();

const burgerBtn = document.getElementById("burger-btn");
const burgerMenu = document.getElementById("burger-menu");
burgerBtn.addEventListener("click", () => {
	console.log("click");
	burgerMenu.classList.toggle("burger-menu-active");
});

async function firstDraw() {
	const fetchedItems = await fetchItemsList();
	itemsList = fetchedItems;
	buildCards(sortBy("default"));
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
function buildSortedBy(c) {
	const sorteddArr = sortBy(c);
	cardWrapper.innerHTML = "";
	buildCards(sorteddArr);
	if (Btn.filterBtns.some((btn) => btn.isClicked === true)) {
		const arg = Btn.filterBtns.find((btn) => btn.isClicked === true).filterArg;
		buildFilteredBy(arg);
	}
}
function redraw() {
	const defaultSorted = sortBy("default");
	cardWrapper.innerHTML = "";
	buildCards(defaultSorted);
}
function sortBy(sortingOption) {
	const itemsToSort = itemsList;
	switch (sortingOption) {
		case "default":
			const sortedByHighPrice = itemsToSort.sort((a, b) => b.price - a.price);
			itemsList = sortedByHighPrice;
			// console.log(sortedByHighPrice);
			return sortedByHighPrice;
		case "price":
			const sortedByLowPrice = itemsToSort.sort((a, b) => a.price - b.price);
			itemsList = sortedByLowPrice;
			// console.log(sortedByLowPrice);
			return sortedByLowPrice;
		case "date":
			const sortedByDate = itemsToSort.sort((a, b) => b.date_added - a.date_added);
			itemsList = sortedByDate;
			// console.log(sortedByDate);
			return sortedByDate;
		case "name":
			const sortedByName = itemsToSort.sort((a, b) => {
				if (a.name < b.name) {
					return -1;
				}
				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
			itemsList = sortedByName;
			// console.log(sortedByCity);
			return sortedByName;
		case "city":
			const sortedByCity = itemsToSort.sort((a, b) => {
				if (a.city < b.city) {
					return -1;
				}
				if (a.city > b.city) {
					return 1;
				}
				return 0;
			});
			itemsList = sortedByCity;
			// console.log(sortedByCity);
			return sortedByCity;
	}
}

async function buildCards(iList) {
	iList.forEach((item, index) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.addEventListener("click", () => {
			console.log(item.id);
		});

		function goToItem() {
			localStorage.setItem("item_Id", item.id);
			window.location.replace("item.html");
		}

		const img = document.createElement("img");
		img.src = item.pic_url;
		img.addEventListener("click", () => {
			goToItem();
		});

		const cardText = document.createElement("div");
		cardText.classList.add("card-text");
		cardText.addEventListener("click", () => {
			goToItem();
		});

		const title = document.createElement("h3");
		title.textContent = `${item.name} • ${item.price} €`;

		const city = document.createElement("h4");
		city.textContent = item.city;

		const date = document.createElement("h4");
		const numericDate = item.date_added;
		const dateString = numericDate.toString();
		const yyyy = dateString.slice(0, 4);
		const mm = dateString.slice(4, 6);
		const dd = dateString.slice(6, 8);
		date.textContent = `${yyyy} ${mm} ${dd}`;

		function createHeartSVG() {
			const svgNS = "http://www.w3.org/2000/svg";
			const svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute("class", "heart-btn");
			svg.setAttribute("xmlns", svgNS);
			svg.setAttribute("width", "24");
			svg.setAttribute("height", "24");
			svg.setAttribute("viewBox", "0 0 24 24");

			const path = document.createElementNS(svgNS, "path");
			path.setAttribute(
				"d",
				"M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
			);

			svg.appendChild(path);

			return svg;
		}

		const itemIdNumber = Number(item.id);
		// console.log(itemIdNumber);

		const wishBtn = createHeartSVG();
		if (wishList.some((i) => i === itemIdNumber)) {
			wishBtn.classList.add("heart-btn-active");
		}

		wishBtn.addEventListener("click", () => {
			if (wishList.some((obj) => obj === itemIdNumber)) {
				removeFromWishlist(itemIdNumber);
				wishList = readWishlist();
				updateWishlistCounter();
				wishBtn.classList.remove("heart-btn-active");
			} else {
				addToWishlist(itemIdNumber);
				wishList = readWishlist(); //store list localy
				// wishList.push(itemIdNumber);
				// console.log(index);
				// storeWishlist(wishList);
				updateWishlistCounter();
				wishBtn.classList.add("heart-btn-active");
			}
		});

		cardText.append(title, city, date);
		card.append(wishBtn, img, cardText);
		cardWrapper.append(card);
	});
}
