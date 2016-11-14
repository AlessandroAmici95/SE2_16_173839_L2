//model
var OrderEntry = function(itemName, quantity){
    this.itemName = itemName;
    this.quantity = quantity;
};

var warehouse = new function(capacity){
    this.currentOrder = [];
};

//view
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

var showOrderForm = function(divID){

    form  = document.getElementById(divID);
    form.style.display = 'block';

}

//Controller

warehouse.currentOrder.push(new OrderEntry("item1", 4));
warehouse.currentOrder.push(new OrderEntry("item2", 2));
warehouse.currentOrder.push(new OrderEntry("item3", 6));

document.getElementById("storedItems").innerHTML = getHTMLOrderTable(warehouse.currentOrder);
console.log(getHTMLOrderTable(warehouse.currentOrder));

