'use strict';

const sqlite3 = require('sqlite3');
const Item = require('../models/Item');
const db = new sqlite3.Database('./database/EzWhDB.sqlite', (err) => {
    if (err) throw err;
});

db.get("PRAGMA busy_timeout = 30000");


exports.deleteItemData = () => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM ITEM';
        db.run(sql, [], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        })
    })
};

exports.getItemList = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT *  FROM Item';
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else {
                const items = rows.map(row => new Item(row.id, row.description, row.price, row.SKUId, row.supplierId))
                resolve(items);
            }

        });

    })
}

exports.getItemByIdAndSupplierId = (id, supplierId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT *  FROM Item WHERE id=? AND supplierId=?';
        db.get(sql, [id, supplierId], (err, row) => {
            if (err) reject(err);
            else {
                if (row === undefined) resolve(row)
                else resolve(new Item(row.id, row.description, row.price, row.SKUId, row.supplierId))
            }
        });
    })
}

exports.createItem = (item) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Item(id,description,price,SKUId,supplierId) VALUES(?,?,?,?,?)';
        db.run(sql, [item.id, item.description, item.price, item.SKUId, item.supplierId], function (err) {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

exports.updateItemByIdAndSupplierId = async (item, id, supplierId) => {
    let found = await this.getItemByIdAndSupplierId(id, supplierId);
    if (found) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE Item SET price=?,description=? WHERE id=? AND supplierId=?';
            db.run(sql, [item.price, item.description, id, supplierId], function (err) {
                if (err) reject(err);
                else resolve(true);
            });
        });
    } else {
        return false;
    }
}

exports.deleteItemByIdAndSupplierId = async (id, supplierId) => {
    let found = await this.getItemByIdAndSupplierId(id, supplierId);
    if (found) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Item WHERE id=? AND supplierId=?';
            db.run(sql, [id, supplierId], function (err) {
                if (err) reject(err);
                else resolve(true);
            });

        });
    } else {
        return false;
    }
}

//THOSE 2 FUNCTIONS ARE FOR CHECKING THE GET /api/item (JUST A CHECK ON DB IF SUPPLIER SELLS ALREADY ITEMS)
exports.getIfSupplierSellItem = (suppID, skuID) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM  Item WHERE SKUId=? AND supplierID=?';
        db.get(sql, [skuID, suppID], (err, row) => {
            if (err) reject(err);
            else {
                if (row === undefined) resolve(false);
                else resolve(true)
            }
        });
    })
};

exports.getIfSupplierSellItem2 = (suppID, itemID) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM  Item WHERE id=? AND supplierID=?';
        db.get(sql, [itemID, suppID], (err, row) => {
            if (err) reject(err);
            else {
                if (row === undefined) resolve(false);
                else resolve(true)
            }
        });
    })
}