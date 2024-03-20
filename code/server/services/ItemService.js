'use strict';

class ItemService {
    dao;
    constructor(dao) {
        this.dao = dao;
    }

    deleteItemData = async () => {
        const res = await this.dao.deleteItemData();
        return res;
    };

    getItemList = async () => {
        const list = await this.dao.getItemList();
        return list;
    };

    getItemByIdAndSupplierId = async (id, supplierId) => {
        const item = await this.dao.getItemByIdAndSupplierId(id, supplierId)
        return item;
    };

    createItem = async (item) => {
        const res = await this.dao.createItem(item);
        return res;
    };

    updateItemByIdAndSupplierId = async (item, id, supplierId) => {
        const res = await this.dao.updateItemByIdAndSupplierId(item, id, supplierId);
        return res;
    };

    deleteItemByIdAndSupplierId = async (id, supplierId) => {
        const res = await this.dao.deleteItemByIdAndSupplierId(id, supplierId);
        return res;
    };

    getIfSupplierSellItem = async (suppID, skuID) => {
        const res = await this.dao.getIfSupplierSellItem(suppID, skuID);
        return res;
    };

    getIfSupplierSellItem2 = async (suppID, itemID) => {
        const res = await this.dao.getIfSupplierSellItem2(suppID, itemID);
        return res;
    };


}

module.exports = ItemService;