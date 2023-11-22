function buildHeader() {
	document.querySelector("header").innerHTML = `<div class="header-wrapper">
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
        <svg class="shopping-cart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm-11.816 6c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm8-16.5l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-2.541 9h2.102l3.432-12h4.195z" />
        </svg>
    </nav>
    <svg
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
}
function buildFooter() {
	document.querySelector("footer").innerHTML = `<p>Buy&Sel &copy all rights reserved 2023</p>`;
}
export { buildHeader, buildFooter };
