import { readWishlist } from "./localstorage.js";

function buildHeader() {
	document.querySelector("header").innerHTML = `
    <div class="header-wrapper">
        <div class="logo">
            <img src="./img/logo.png" alt="logo" />
            <h1>Buy&Sell</h1>
        </div>
        <nav class="nav-pc">
            <ul>
                <li>
                    <a href="./index.html">Stuff for sale</a>
                </li>
                <li><a href="./add item.html">Sel yours</a></li>
            </ul>
            <a class="wishlist-wrapper" href="./wishlist.html">
                <svg id="wish-list" class="wish-list" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                </svg>
                <h5 id="wish-list-counter">1</h5>
            </a>
        </nav>
        <div id="burger-menu" class="burger-menu">
            <nav class="nav-phone">
                <ul>
                    <li>
                        <a href="./wishlist.html">Wishlist</a>
                    </li>
                    <li>
                        <a href="./index.html">Stuff for sale</a>
                    </li>
                    <li>
                        <a href="./add item.html">Sel yours</a>
                    </li>
                </ul>
            </nav>
        </div>
        <svg
            id="burger-btn"
            class="burger-btn"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="m22 15.25c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-6.5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
                fill-rule="nonzero" />
        </svg>
    </div>`;
	updateWishlistCounter();
}

function updateWishlistCounter() {
	const wishListCounter = document.getElementById("wish-list-counter");
	wishListCounter.innerHTML = readWishlist().length;
}

function buildFooter() {
	document.querySelector("footer").innerHTML = `<p>Buy&Sel &copy all rights reserved 2023</p>`;
}
export { buildHeader, buildFooter, updateWishlistCounter };
