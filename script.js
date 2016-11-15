//model
/**
 * L'oggetto che identifica una entry dell'ordine
 * @param itemName
 * @param quantity
 * @constructor
 */
function OrderEntry(itemName, quantity){
    this.itemName = itemName;
    this.quantity = quantity;
};

/**
 * L'oggetto che identifica il magazzino. Ha quindi una lista di ordini -> da aggiungere capacità = 30 di default
 * @type {warehouse}
 */
function WareHouse(){
    this.currentOrder = [];
    this.capacity = 30;
    this.addNewEntry = function(orderEntry){//funzione che permette di aggiungere una entry al currentOrder
        var result = true;
        if((!isFinite(new Number(orderEntry.quantity))) || (orderEntry.itemName == '') || (orderEntry.quantity <= 0)){
            result = false;
        }
        else {
            var i; //l'indice dell'orderEntry con lo stesso nome, se esiste
            for (i = 0; i < this.currentOrder.length; i++) {
                if (this.currentOrder[i].itemName == orderEntry.itemName) {
                    break;
                }
            }
            if (i == this.currentOrder.length) {
                this.currentOrder.push(orderEntry);
            }
            else {
                this.currentOrder[i].quantity += orderEntry.quantity;
            }
        }
        return result;
    };

    this.isFull = function(){//funzione che controlla se la somma delle quantità è superiore alla capacità del magazzino
        var result = false;
        sum = 0;
        for(i in this.currentOrder){
            sum += this.currentOrder[i].quantity;
        }
        if(sum > this.capacity){
            result = true;
        }
        return result;
    };

    this.updateCapacity = function(newCapacity){
        var result = false;
        console.log(newCapacity);
        if(isFinite(newCapacity) && newCapacity != ''){
            this.capacity = newCapacity;
            result = true;
        }
        return result;
    }

    this.getOccupiedSpace = function(){
        var occupiedSpace = 0;
        for(var i in this.currentOrder){
            occupiedSpace += this.currentOrder[i].quantity;
        }
        return occupiedSpace;
    }
};

//view
/**
 * Funzione che dato un oggetto ordine crea la rispettiva tabellaHTML
 * @param order
 * @returns {string}
 */
var getHTMLOrderTable = function(order){
    var s = "<table border=\"1\" id=\"storedItems\">";
    itemList = [];
    quantityList = [];
    order.forEach(function(orderEntry){
        itemList.push(orderEntry.itemName);
        quantityList.push(orderEntry.quantity);

    })
    s += "<tr>";
    for(var i = 0; i < itemList.length; i ++){
        s += "<td>" +
                itemList[i] +
            "</td>";
    }
    s += "</tr>"+
          "<tr>";
    for(var i = 0; i < quantityList.length; i ++){
        s += "<td>" +
                quantityList[i] +
            "</td>";
    }
    s += "</tr>" +
        "</table>";
    return s;
};

/**
 * Funzione che rende visibile il form di inserimento del nuovo ordine
 * @param formID
 */
var showOrderForm = function(formID){
    form  = document.getElementById(formID);
    form.style.display = 'block';

}

var refreshOrderForm = function (formID) {
    var form = document.getElementById(formID);
    form.itemName.value = "";
    form.quantity.value = "";
    form.style.display = 'none';
};

var updateCapacityInput = function(warehouse){
    var capacityInput = document.getElementById('capacityInput');
    capacityInput.value = warehouse.capacity;
};

var updateOccupiedSpaceLabel = function(quantity){
    var occupiedSpaceLabel = document.getElementById('occupiedSpaceLabel');
    console.log(quantity);
    occupiedSpaceLabel.innerHTML = quantity.toString();
}

//Controller
var warehouse = new WareHouse();
warehouse.currentOrder.push(new OrderEntry("item1", 4));
warehouse.currentOrder.push(new OrderEntry("item2", 2));
warehouse.currentOrder.push(new OrderEntry("item3", 6));

document.getElementById("storedItems").innerHTML = getHTMLOrderTable(warehouse.currentOrder);
updateCapacityInput(warehouse);
updateOccupiedSpaceLabel(warehouse.getOccupiedSpace());
console.log(getHTMLOrderTable(warehouse.currentOrder));

var insertNewOrder = function(formID){
    var form = document.getElementById(formID);
    newItem = new OrderEntry(form.itemName.value, parseInt(form.quantity.value));
    if(warehouse.addNewEntry(newItem)){
        document.getElementById("storedItems").innerHTML = getHTMLOrderTable(warehouse.currentOrder);
        refreshOrderForm(formID);
        updateOccupiedSpaceLabel(warehouse.getOccupiedSpace());
        if(warehouse.isFull()){
            alert("Il magazzino è pieno!");
        }
    }else{
        alert("i dati inseriti sono sbagliati, riprova");
        refreshOrderForm(formID);
    }
    console.log(newItem);
};

var updateCapacity = function(capacityInputID){
    var capacityInput = document.getElementById(capacityInputID);
    if(warehouse.updateCapacity(capacityInput.value)){
        if(warehouse.isFull()){
            alert("Il magazzino è pieno!");
        }
    }
    else{
        alert("Non sono riuscito ad aggiornare la capacità del magazzino!");
    }

};

var setViewForNewOrder = function(formID){
    showOrderForm(formID);
    if(warehouse.isFull()){
        alert("Il magazzino è pieno!");
    }
}