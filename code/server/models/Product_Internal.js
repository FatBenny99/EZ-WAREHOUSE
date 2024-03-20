'use strict'

class Product_Internal {

    constructor(SKUId, description, price, qty) {
        this.SKUId = SKUId;
        this.description = description;
        this.price = price;
        this.qty = qty;

    };

}

module.exports = Product_Internal;