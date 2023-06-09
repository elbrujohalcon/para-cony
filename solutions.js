function createList() {
    return {};
}

function categories(list) {
    return Object.keys(list);
}

function addCategory(list, category) {
    list[category] = {};
    return list;
}

function itemsIn(list, category) {
    if(list[category]) {
        return Object.keys(list[category]);
    } else {
        return [];
    }
}

function removeCategory(list, category) {
    let newList = {};
    for (let cat in list) {
        if (cat !== category) {
            newList[cat] = list[cat]
        }
    }
    return newList;
}

function addItem(list, category, item, quantity) {
    quantity = quantity === undefined ? 1 : quantity;
    list[category][item] = quantity;
    return list;
}

function quantityOf(list, category, item) {
    if(list[category]) {
        if (list[category][item]) {
            return list[category][item];
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

function removeItem(list, category, item) {
    if(list[category]) {
        let newCat = {};
        for (let itm in list[category]) {
            if (itm !== item) {
                newCat[itm] = list[category][itm]
            }
        }
        list[category] = newCat;
        return list;
    } else {
        return list;
    }
}

function incItem(list, category, item) {
    if(list[category]) {
        if (list[category][item]) {
            list[category][item]++;
            return list;
        } else {
            return list;
        }
    } else {
        return list;
    }
}

function decItem(list, category, item) {
    if(list[category]) {
        if (list[category][item]) {
            list[category][item]--;
            return list;
        } else {
            return list;
        }
    } else {
        return list;
    }
}
