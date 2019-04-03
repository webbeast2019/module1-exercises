class Card {
    constructor(id) {
        this._id = id;
        this._isVisible = false;
    }

    get id() {
        return this._id;
    }

    get isVisible() {
        return this._isVisible;
    }

    set isVisible(value) {
        this._isVisible = value;
    }
}

export { Card };