# Design Document 


Authors: Simone Mascali, Alessandro Vancini, Alessandro Giaccaglini, Benito Marra

Date: 27/04/2022

Version: 1.0


# Contents

- [Design Document](#design-document)
- [Contents](#contents)
- [High level design](#high-level-design)
  - [Package diagram](#package-diagram)
- [Low level design](#low-level-design)
- [Verification traceability matrix](#verification-traceability-matrix)
- [Verification sequence diagrams](#verification-sequence-diagrams)

# High level design 

Architectural pattern: MVC (Model View Controller)

## Package diagram

```plantuml
package EZWhClient <<Folder>>{

}
package EZWhServer <<Folder>>{
    package API <<Folder>>{
    }
    package Models <<Folder>>{
    }
    package Database_utilities <<Folder>>{
    }
    package Services <<Folder>>{
    }
}


API <-- EZWhClient
Models <|-- API
Services <|-- API
Models <|-- Database_utilities
Database_utilities <|-- Services

```


# Low level design


![low_level_diagram](/design_images/LowLevelDesign.PNG)




# Verification traceability matrix

| FR  | EZWarehouse | User  | Position | Restock Order | Return Order | Internal Order | RestockOrderService, ReturnOrderService, InternalOrderService | SkuService, SkuItemService, PositionService, ItemService | TestDescriptorService, TestResultService | UserService |  Sku  | Sku item | Supplier Item | Test Result | Test Descriptor |
| --- | :---------: | :---: | :------: | :-----------: | :----------: | :------------: | :--------------: | :------------------: | :--------------------------------------: | :-------------: | :---: | :------: | :-----------: | :---------: | :-------------: |
| FR1 |      x      |   x   |          |               |              |                |                  |                      |                                          |        x        |       |          |               |             |                 |
| FR2 |      x      |       |    x     |               |              |                |                  |          x           |                                          |                 |   x   |          |               |             |        x        |
| FR3 |      x      |       |    x     |               |              |                |                  |          x           |        x                                 |                 |   x   |          |               |             |        x        |
| FR4 |      x      |   x   |          |               |              |                |                  |                      |                                          |                 |       |          |               |             |                 |
| FR5 |      x      |       |          |       x       |       x      |                |        x         |                      |                                          |                 |   x   |     x    |       x       |      x      |        x        |
| FR6 |      x      |   x   |          |               |              |       x        |                  |                      |                                          |                 |   x   |     x    |               |             |                 |
| FR7 |      x      |   x   |          |               |              |                |                  |                      |                                          |                 |       |          |       x       |             |                 |









# Verification sequence diagrams 

- Scenario 1-1

```plantuml

actor Manager
Manager --> EzWarehouse  : API CALL(/api/sku)


EzWarehouse  -> SkuService: createSKU()

SkuService  -> SkuDB : createSKU()

SkuDB -> EzWhDB.sqlite : QUERY CREATE SKU

```
- Scenario 2-2

```plantuml


actor Manager
Manager --> EzWarehouse  : API CALL(/api/position)


EzWarehouse  -> PositionService: createPosition()

PositionService-> PositionDB : createPosition()

PositionDB -> EzWhDB.sqlite : QUERY CREATE POSITION

```

- Scenario 4-1

```plantuml
actor Manager
Manager --> EzWarehouse  : API CALL(/api/newUser)


EzWarehouse  -> UserService: createUser()

UserService-> UserDB : createUser()

UserDB -> EzWhDB.sqlite : QUERY CREATE USER

```

- Scenario 4-2

```plantuml

actor Admin

Admin--> EzWarehouse : API CALL(/api/users/:username)

EzWarehouse  -> UserService: updateUser()

UserService-> UserDB : updateUser()

UserDB -> EzWhDB.sqlite : QUERY UPDATE USER


```



- Scenario 7-1

```plantuml

actor User
User--> EzWarehouse  : API CALL(/api/customerSession)


EzWarehouse  -> UserService: getUserByEmailAndPassword()

UserService-> UserDB : getUserByEmailAndPassword()

UserDB -> EzWhDB.sqlite : QUERY SELECT USER

UserDB <- EzWhDB.sqlite : return User (if found)

UserDB -> UserService: return User (if found)

UserService -> EzWarehouse : return user (if found)


```


- Scenario 11-1

```plantuml

actor Supplier
Supplier --> EzWarehouse  : API CALL(/api/item)


EzWarehouse  -> ItemService: createItem()

ItemService -> ItemDB : createItem()

ItemDB -> EzWhDB.sqlite : QUERY CREATE ITEM

```

- Scenario 11-2

```plantuml

actor Supplier
Supplier --> EzWarehouse  : API CALL(/api/item/:id/:supplierId)

EzWarehouse  -> ItemService: getItemByIdAndSupplierId()

ItemService -> ItemDB : getItemByIdAndSupplierId()

ItemDB -> EzWhDB.sqlite : QUERY GET ITEM

EzWhDB.sqlite -> ItemDB : return item (if found)

ItemDB -> ItemService : return item (if found)

ItemService -> EzWarehouse : return item (if found)

EzWarehouse  -> ItemService: updateItemByIdAndSupplierId()

ItemService -> ItemDB : updateItemByIdAndSupplierId()

ItemDB -> EzWhDB.sqlite : QUERY UPDATE ITEM


```
