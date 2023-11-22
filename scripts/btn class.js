export default class Btn {
	static buttonsList = [];
	static filterBtns = [];
	static sortBtns = [];
	isClicked = false;
	constructor(btnObject, filterAction, filterArg, redrawAction, type) {
		this.btnObject = btnObject;
		this.filterArg = filterArg;
		this.btnObject.addEventListener("click", () => this.click());
		this.filterAction = filterAction;
		this.redrawAction = redrawAction;
		this.type = type;
		switch (this.type) {
			case "filter":
				Btn.filterBtns.push(this);
				break;
			case "sort":
				Btn.sortBtns.push(this);
				break;
			default:
				this.type = "default";
				Btn.buttonsList.push(this);
				break;
		}
	}
	click() {
		// console.log("click");
		// console.log(Btn.buttonsList, Btn.filterBtns, Btn.sortBtns);
		if (this.isClicked === false) {
			Btn.resetAll(this.type);
			this.filterAction(this.filterArg);
			this.btnObject.setAttribute("class", "is-clicked");
			this.isClicked = true;
		} else {
			Btn.resetAll(this.type);
			this.isClicked = false;
			this.redrawAction(this.redrawArg);
		}
	}
	reset() {
		this.btnObject.removeAttribute("class", "is-clicked");
		this.isClicked = false;
	}
	static resetAll(arg) {
		switch (arg) {
			case "filter":
				Btn.filterBtns.forEach((button) => {
					button.reset();
				});
				break;
			case "sort":
				Btn.sortBtns.forEach((button) => {
					button.reset();
				});
				break;
			default:
				Btn.buttonsList.forEach((button) => {
					button.reset();
				});
		}
	}
}
