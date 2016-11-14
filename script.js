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
    this.addNewEntry = function(orderEntry){
        var result = true;
        if(!isFinite(new Number(orderEntry.quantity))){
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

}

//Controller
var warehouse = new WareHouse();
warehouse.currentOrder.push(new OrderEntry("item1", 4));
warehouse.currentOrder.push(new OrderEntry("item2", 2));
warehouse.currentOrder.push(new OrderEntry("item3", 6));

document.getElementById("storedItems").innerHTML = getHTMLOrderTable(warehouse.currentOrder);
console.log(getHTMLOrderTable(warehouse.currentOrder));

var insertNewOrder = function(formID){
    var form = document.getElementById(formID);
    newItem = new OrderEntry(form.itemName.value, parseInt(form.quantity.value));
    if(warehouse.addNewEntry(newItem)){
        document.getElementById("storedItems").innerHTML = getHTMLOrderTable(warehouse.currentOrder);
        refreshOrderForm();
    }else{
        alert("i dati inseriti sono sbagliati, riprova");
        refreshOrderForm();
    }
    console.log(newItem);
}