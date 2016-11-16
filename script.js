/************************************************** MODEL ************************************************/

/**
 * L'oggetto che identifica una entry dell'ordine
 * @param itemName -il nome dell'articolo
 * @param quantity -la quantità dello stesso articolo richiesta
 * @constructor
 */
function OrderEntry(itemName, quantity){
    this.itemName = itemName;
    this.quantity = quantity;
};

/**
 * L'oggetto che identifica il magazzino. Ha quindi una lista di OrderEntry e una capacità = 30 di default
 * @attribute currentOrder - la lista di OrderEntry corrente
 * @attribute capacity - la capacità del magazzino. 30 di default
 * @method addNewEntry(orderEntry) - aggiunge una nuova OrderEntry a currentOrder(o ne aumenta la sua quantità se l'articolo è gia presente)
 * @method isFull() - ritorna true se capacity < occupiedSpace, false altrimenti
 * @method updateCapacity(newCapacity) - imposta capacity al valore newCapacity
 * @method getOccupiedSpace - ritorna lo spazio occupato dagli OrderEntry in currentOrder
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

    this.updateCapacity = function(newCapacity){//aaggiorna la capacità del magazzino
        var result = false;
        console.log(newCapacity);
        if(isFinite(newCapacity) && newCapacity != ''){
            this.capacity = newCapacity;
            result = true;
        }
        return result;
    }

    this.getOccupiedSpace = function(){//ritorna lo spazio occupato dagli orderEntry in currentOrder
        var occupiedSpace = 0;
        for(var i in this.currentOrder){
            occupiedSpace += this.currentOrder[i].quantity;
        }
        return occupiedSpace;
    }
};

/************************************************** VIEW ************************************************/
/**
 * Funzione che dato un oggetto ordine crea la rispettiva tabellaHTML
 * @param order - una lista di OrderEntry
 * @returns {string} tabella HTML
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


var showOrderForm = function(formID){//Funzione che rende visibile il form di inserimento del nuovo ordine
    form  = document.getElementById(formID);
    form.style.display = 'block';

}

var refreshOrderForm = function (formID) {//Funzione che riporta il form di inserimento del nuovo ordine al suo stato iniziale(vuoto e invisibile)
    var form = document.getElementById(formID);
    form.itemName.value = "";
    form.quantity.value = "";
    form.style.display = 'none';
};

var updateCapacityInput = function(warehouse){//aggiorna la capacità nel campo di input
    var capacityInput = document.getElementById('capacityInput');
    capacityInput.value = warehouse.capacity;
};

var updateOccupiedSpaceLabel = function(quantity){//aggiorna la label dello spazio occupato
    var occupiedSpaceLabel = document.getElementById('occupiedSpaceLabel');
    console.log(quantity);
    occupiedSpaceLabel.innerHTML = quantity.toString();
}

/************************************************** CONTROLLER ************************************************/
//Creo un nuovo magazzino e gli aggiungo 3 elementi
var warehouse = new WareHouse();
warehouse.currentOrder.push(new OrderEntry("item1", 4));
warehouse.currentOrder.push(new OrderEntry("item2", 2));
warehouse.currentOrder.push(new OrderEntry("item3", 6));

//creo la tabella iniziale dell'ordine corrente, aggiorno il valore di capacità e di spazio occupato
document.getElementById("storedItems").innerHTML = getHTMLOrderTable(warehouse.currentOrder);
updateCapacityInput(warehouse);
updateOccupiedSpaceLabel(warehouse.getOccupiedSpace());

/**
 * Funzione che viene chiamata dal bottone SendOrder per inserire un nuovo articolo. Manda un messaggio di alert se i
 * dati sono sbagliati e se il magazzino è pieno
 *
 * @param formID - l'id Del form da cui devo prendere i dati
 */
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

/**
 * Funzione chiamata dal bottone UpdateCapacity per aggiornare la capacità del magazzino al valore impostato dall'utente
 * @param capacityInputID - l'id del campo di input da cui prendo la nuova capacity
 */
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

/**
 * Funzione chiamata dal bottone NewOrder per mostrare il form di inserimento del nuovo articolo(nome, quantità).
 * Manda un messagio di alert se il magazzino è già pieno.
 * @param formID - l'id Del form per l'inserimento del nuovo articolo
 */
var setViewForNewOrder = function(formID){
    showOrderForm(formID);
    if(warehouse.isFull()){
        alert("Il magazzino è pieno!");
    }
}