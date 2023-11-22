export default class Btn {
	static buttonsList = [];
	isClicked = false;
	constructor(btnObject, filterAction, filterArg, redrawAction) {
		this.btnObject = btnObject;
		this.filterArg = filterArg;
		this.btnObject.addEventListener("click", () => this.click());
		this.filterAction = filterAction;
		this.redrawAction = redrawAction;
		Btn.buttonsList.push(this);
	}
	click() {
		console.log("click");
		if (this.isClicked === false) {
			Btn.resetAll();
			this.filterAction(this.filterArg);
			this.btnObject.setAttribute("class", "is-clicked");
			this.isClicked = true;
		} else {
			Btn.resetAll();
			this.isClicked = false;
			this.redrawAction(this.redrawArg);
		}
	}
	reset() {
		this.btnObject.removeAttribute("class", "is-clicked");
		this.isClicked = false;
	}
	static resetAll() {
		Btn.buttonsList.forEach((button) => {
			button.reset();
		});
	}
}
