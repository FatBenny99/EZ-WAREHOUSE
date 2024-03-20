'use strict';

const ItemService = require('../services/ItemService');
const ItemDB = require('../database/ItemDB.js');
const item_service = new ItemService(ItemDB);
const Item = require('../models/Item.js');



describe('Item Service - DB test', () => {

    beforeAll(async () => {
        await item_service.deleteItemData();
    });

    test('Checking if no items are present', async () => {
        var res = await item_service.getItemList();
        expect(res.length).toStrictEqual(0);
    });

    // TEST : New item

    testNewItem(new Item(1, "desc1", 10.99, 1, 2)); // ok
    testNewItem(new Item(2, "desc2", 11.99, 2, 1)); // ok
    testNewItem(new Item(3, "desc3", 13.99, 3, 2)); // ok
    testNewItem(new Item(4, undefined, 13.99, 3, 2));    // missing descr (NOT NULL CONSTRAINT FAILED)

    // TESTING Get items
    testGetItemList();

    // TESTING GetItem by Id and supplierId

    testGetItemByIdAndSupplierId(1, 2);
    testGetItemByIdAndSupplierId(2, 1);
    testGetItemByIdAndSupplierId(3, 2);
    testGetItemByIdAndSupplierId(4, 1); //id not valid

    // TESTING getIfSupplierSellItem
    testGetSpecific(2, 1, 1)
    testGetSpecific(2, 2, 2) //fail

    // TESTING getIfSupplierSellItem2
    testGetSpecific2(2, 1, 1);
    testGetSpecific2(1, 1, 2); //fail

    // TESTING UpdateItem by Id

    testUpdateItemByIdAndSupplierId(new Item(1, "desc1 modificata", 210.99, 1, 2), 1, 2); // existing id => successfull test expected
    testUpdateItemByIdAndSupplierId(new Item(2, "desc2 modificata", 211.99, 2, 1), 2, 1); // existing id => successfull test expected
    testUpdateItemByIdAndSupplierId(new Item(3, "desc3 modificata", 200.22, 3, 2), 3, 2); // existing id => successfull test expected
    testUpdateItemByIdAndSupplierId(new Item(4, "desc4 modificata", 13.99, 3, 2), 4, 1); // non existing id => failed test expected

    //// TESTING DeleteItem by Id and supplier id

    testDeleteItemByIdAndSupplierId(1, 2); // existing id => successfull test expected
    testDeleteItemByIdAndSupplierId(2, 1); // existing id => successfull test expected
    testDeleteItemByIdAndSupplierId(3, 2); // existing id => successfull test expected
    testDeleteItemByIdAndSupplierId(4, 1); // non existing id => failed test expected


    afterAll(async () => {
        await item_service.deleteItemData();
    });

});

function testNewItem(item, call) {
    test('Create new item', async () => {

        if (call <= 3) {
            // SUCCESSFULL CALLS
            let res = await item_service.createItem(item);
            expect(res).toStrictEqual(true);
        } else {
            // CALL WITH EXPECTED ERROR IN DATABASE (ELEMENT CREATION WITH NOT NULL CONSTRAINT NOT SATISIFED)
            try {
                await item_service.createItem(item);
            } catch (err) {
                let res = false;
                expect(res).toStrictEqual(false);
            }

        }
    });
}


function testGetItemList() {
    test('Get item LIST ', async () => {
        let items = await item_service.getItemList();
        expect(items.length).toStrictEqual(3);
    });
}

function testGetItemByIdAndSupplierId(id, supplierId) {
    test('Get item by id  and supplierId', async () => {
        let item = await item_service.getItemByIdAndSupplierId(id, supplierId);
        if (id <= 3) {
            expect(item.id).toStrictEqual(id);
        } else {
            let res = true;
            if (item === undefined)
                res = false;
            expect(res).toStrictEqual(false);
        }
    });
}

function testGetSpecific(suppID, skuID, call) {
    test('Get specific items', async () => {

        if (call === 1) {
            let res = await item_service.getIfSupplierSellItem(suppID, skuID);
            expect(res).toStrictEqual(true);
        }
        if (call === 2) {
            let res = await item_service.getIfSupplierSellItem(suppID, skuID);
            expect(res).toStrictEqual(false);
        }

    });
}

function testGetSpecific2(suppID, id, call) {
    test('Get specific2 items', async () => {

        if (call === 1) {
            let res = await item_service.getIfSupplierSellItem2(suppID, id);
            expect(res).toStrictEqual(true);
        }
        if (call === 2) {
            let res = await item_service.getIfSupplierSellItem2(suppID, id);
            expect(res).toStrictEqual(false);
        }
    });
}

function testUpdateItemByIdAndSupplierId(item, id, supplierId) {

    test('Update item by item id and supplierId', async () => {

        if (id <= 3) {
            let res = await item_service.updateItemByIdAndSupplierId(item, id, supplierId);
            expect(res).toStrictEqual(true);
        } else {
            let res = await item_service.updateItemByIdAndSupplierId(item, id, supplierId);
            expect(res).toStrictEqual(false);
        }
    });
}

function testDeleteItemByIdAndSupplierId(id, supplierId) {
    test('Delete item (by item ID and supplierId)', async () => {
        let res = await item_service.deleteItemByIdAndSupplierId(id, supplierId);
        if (id <= 3) {
            expect(res).toStrictEqual(true);
        }
        else {
            expect(res).toStrictEqual(false);
        }
    });
}