function runTests() {
    const tests = {
        'ex-1-1': () => { return t_createList() },
        'ex-1-2': () => { return t_addCategory() },
        'ex-1-3': () => { return t_removeCategory() },
        'ex-1-4': () => { return t_addItem() },
        'ex-1-5': () => { return t_removeItem() },
        'ex-1-6': () => { return t_incItem() },
        'ex-1-7': () => { return t_decItem() },
    }
    for (let test in tests) {
        runTest(test, tests[test])
    }
}


function runTest(elementId, testFun) {
    let result = "";
    try {
        let errs = testFun();
        if (errs.length === 0) {
            result = '✅';
        } else {
            result = '❌';
            console.warn(`${elementId} didn't pass: ${errs}`);
        }
    } catch(err) {
        result = '💥';
        console.error(`${elementId} failed`, err);
    }
    console.log(result, elementId);
    document.getElementById(elementId).innerText = result;    
}

function t_createList() {
    let errs = [];
    let emptyList = createList();
    if (categories(emptyList).length !== 0) {
        errs.push(`Demasiadas categorias al crear una nueva lista: ${categories(emptyList)}`)
    }
    return errs;
}

function t_addCategory() {
    let errs = [];
    let emptyList = createList();
    let withOne = addCategory(emptyList, "verdulería");
    if (categories(withOne).length !== 1) {
        errs.push(`Categorias incorrectas al agregar "verdulería": ${categories(withOne)}`)
    }
    if (itemsIn(withOne, "verdulería").length !== 0) {
        errs.push(`Demasiados items para comprar en la verdulería: ${itemsIn(withOne, "verdulería")}`)
    }

    // Si agregamos una categoría que ya existe, no pasa nada
    let stillOne = addCategory(withOne, "verdulería");
    if (categories(stillOne).length !== 1) {
        errs.push(`Categorias incorrectas al agregar "verdulería": ${categories(stillOne)}`)
    }
    if (itemsIn(stillOne, "verdulería").length !== 0) {
        errs.push(`Demasiados items para comprar en la verdulería: ${itemsIn(stillOne, "verdulería")}`)
    }

    let withTwo = addCategory(stillOne, "mercadona");
    if (categories(withTwo).length !== 2) {
        errs.push(`Categorias incorrectas al agregar "mercadona": ${categories(withTwo)}`)
    }
    if (itemsIn(withTwo, "mercadona").length !== 0) {
        errs.push(`Demasiados items para comprar en mercadona: ${itemsIn(withTwo, "mercadona")}`)
    }

    return errs;
}

function t_removeCategory() {
    let errs = [];
    let emptyList = createList();
    let withTwo = addCategory(addCategory(emptyList, "verdulería"), "mercadona");

    let withOne = removeCategory(withTwo, "verdulería");
    if (categories(withOne).length !== 1) {
        errs.push(`Categorias incorrectas al quitar "verdulería": ${categories(withOne)}`)
    }
    if (itemsIn(withOne, "verdulería").length !== 0) {
        errs.push(`Demasiados items para comprar en la verdulería: ${itemsIn(withOne, "verdulería")}`)
    }

    return errs;
}

function t_addItem() {
    let errs = [];
    let withCats = addCategory(addCategory(createList(), "verdulería"), "mercadona");

    let withOne = addItem(withCats, "verdulería", "melón");
    if (itemsIn(withOne, "verdulería").length !== 1) {
        errs.push(`Items incorrectos al agregar "melón" en "verdulería": ${itemsIn(withOne, "verdulería")}`)
    }
    if (quantityOf(withOne, "verdulería", "melón") !== 1) {
        errs.push(`Deberíamos tener que comprar 1 melón en la verdulería, pero tenemos que comprar ${quantityOf(withOne, "verdulería", "melón")}`)
    }
    if (quantityOf(withOne, "mercadona", "melón") !== 0) {
        errs.push(`No deberíamos tener que comprar melón en mercadona, pero tenemos que comprar ${quantityOf(withOne, "mercadona", "melón")}`)
    }

    // Si agregamos un item que ya existe, no pasa nada
    let stillOne = addItem(withOne, "verdulería", "melón");
    if (itemsIn(stillOne, "verdulería").length !== 1) {
        errs.push(`Items incorrectos al agregar "melón" en "verdulería": ${itemsIn(stillOne, "verdulería")}`)
    }
    if (quantityOf(stillOne, "verdulería", "melón") !== 1) {
        errs.push(`Deberíamos tener que comprar 1 melón en la verdulería, pero tenemos que comprar ${quantityOf(stillOne, "verdulería", "melón")}`)
    }
    if (quantityOf(stillOne, "mercadona", "melón") !== 0) {
        errs.push(`No deberíamos tener que comprar melón en mercadona, pero tenemos que comprar ${quantityOf(stillOne, "mercadona", "melón")}`)
    }

    // Si lo agregamos a otra categoria, cada una tiene lo suyo
    let withTwo = addItem(stillOne, "mercadona", "melón", 2);
    if (itemsIn(withTwo, "verdulería").length !== 1) {
        errs.push(`Items incorrectos al agregar "melón" en "verdulería": ${itemsIn(withTwo, "verdulería")}`)
    }
    if (itemsIn(withTwo, "mercadona").length !== 1) {
        errs.push(`Items incorrectos al agregar "melón" en "mercadona": ${itemsIn(withTwo, "mercadona")}`)
    }
    if (quantityOf(withTwo, "verdulería", "melón") !== 1) {
        errs.push(`Deberíamos tener que comprar 1 melón en la verdulería, pero tenemos que comprar ${quantityOf(withTwo, "verdulería", "melón")}`)
    }
    if (quantityOf(withTwo, "mercadona", "melón") !== 2) {
        errs.push(`Deberíamsos tener que comprar 2 melones en mercadona, pero tenemos que comprar ${quantityOf(withTwo, "mercadona", "melón")}`)
    }

    return errs;
}

function t_removeItem() {
    let errs = [];
    let withCats = addCategory(addCategory(createList(), "verdulería"), "mercadona");
    let withTwo = addItem(addItem(withCats, "verdulería", "melón"), "verdulería", "calabaza")

    let withOne = removeItem(withTwo, "verdulería", "melón");
    if (itemsIn(withOne, "verdulería").length !== 1) {
        errs.push(`Items incorrectas al quitar "melón": ${itemsIn(withOne, "verdulería")}`)
    }
    if (quantityOf(withOne, "verdulería", "melón") !== 0) {
        errs.push(`Demasiados melones para comprar en la verdulería: ${quantityOf(withOne, "verdulería", "melón")}`)
    }

    return errs;   
}

function t_incItem() {
    let errs = [];
    let withCats = addCategory(addCategory(createList(), "verdulería"), "mercadona");
    let withTwo = addItem(addItem(withCats, "verdulería", "melón"), "verdulería", "calabaza")

    let withTwoMelons = incItem(withTwo, "verdulería", "melón");
    if (quantityOf(withTwoMelons, "verdulería", "melón") !== 2) {
        errs.push(`Incorrecta cantidad de melones para comprar en la verdulería: ${quantityOf(withTwoMelons, "verdulería", "melón")}`)
    }
    if (quantityOf(withTwoMelons, "verdulería", "calabaza") !== 1) {
        errs.push(`Incorrecta cantidad de calabazas para comprar en la verdulería: ${quantityOf(withTwoMelons, "verdulería", "calabaza")}`)
    }

    return errs;   
}

function t_decItem() {
    let errs = [];
    let withCats = addCategory(addCategory(createList(), "verdulería"), "mercadona");
    let withFour = addItem(addItem(withCats, "verdulería", "melón", 4), "verdulería", "calabaza")

    let withThreeMelons = decItem(withFour, "verdulería", "melón");
    if (quantityOf(withThreeMelons, "verdulería", "melón") !== 3) {
        errs.push(`Incorrecta cantidad de melones para comprar en la verdulería: ${quantityOf(withThreeMelons, "verdulería", "melón")}`)
    }
    if (quantityOf(withThreeMelons, "verdulería", "calabaza") !== 1) {
        errs.push(`Incorrecta cantidad de calabazas para comprar en la verdulería: ${quantityOf(withThreeMelons, "verdulería", "calabaza")}`)
    }

    return errs;   
}
