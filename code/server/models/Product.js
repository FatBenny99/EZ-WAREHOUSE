'use strict'

class Product {

	constructor(SKUId, itemId, description, price, qty) {
		this.SKUId = SKUId;
		this.itemId = itemId;
		this.description = description;
		this.price = price;
		this.qty = qty;

	};

}

module.exports = Product;