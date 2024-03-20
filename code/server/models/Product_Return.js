'use strict'


class Product_Return {

	constructor(SKUId, itemId, description, price, RFID) {
		this.SKUId = SKUId;
		this.itemId = itemId;
		this.description = description;
		this.price = price;
		this.RFID = RFID;

	};

}

module.exports = Product_Return;