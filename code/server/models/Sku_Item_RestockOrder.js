'use strict'


class Sku_Item_RestockOrder {

	constructor(SKUId, itemId, RFID) {
		this.SKUId = SKUId;
		this.itemId = itemId;
		this.RFID = RFID;
	};

}

module.exports = Sku_Item_RestockOrder;