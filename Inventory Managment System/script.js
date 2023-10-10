// ALL THE VARIABLE THAT ARE USED


// varable to select buttons(Add,Update,Dlete) which will call the popups function
const addBtn=document.querySelector("#add-btn");
const updateBtn=document.querySelector("#update-btn");
const deleteBtn=document.querySelector("#delete-btn");

// variable to select overlay (it is a div that appear behind the popupto give shadow-effect)
const overlay=document.querySelector("#overlay");

// variable to select popups
const popup1=document.querySelector(".add");
const popup2=document.querySelector(".update");
const popup3=document.querySelector(".delete");
const popup4=document.querySelector(".update-detail");

// variable to select submit button of the popups
let addSubmit=document.querySelector("#add-submit");
let deleteSubmit=document.querySelector("#delete-submit");
let updateDetailSubmit=document.querySelector("#update-detail-submit");
let updateSubmit=document.querySelector("#update-submit");

// variable to select input fields of add popup
let nameIpt=document.querySelector("#name-ipt");
let priceIpt=document.querySelector("#price-ipt");
let quanIpt=document.querySelector("#quan-ipt");
let ctgIpt=document.querySelector("#ctg-ipt");

// variable to select input fields of update popup
let nameIpt2=document.querySelector("#name-ipt-2");
let priceIpt2=document.querySelector("#price-ipt-2");
let quanIpt2=document.querySelector("#quan-ipt-2");
let ctgIpt2=document.querySelector("#ctg-ipt-2");

// variable to select input field which take id to take action
let updateIdIpt=document.querySelector("#update-id-ipt");
let deleteIdIpt=document.querySelector("#delete-id-ipt");

// other variable
let cancel=document.querySelectorAll(".cancel");
let table=document.querySelector("#table");
let totalCost=document.querySelector("#total-cost");
let tempid;

// id which will be unique for all the items
let id=205;


// it is to close the popup when cancel button is cicked
for(let i=0; i<cancel.length; i++){
    cancel[i].addEventListener("click", function(){
        popup1.style.display="none";
        popup2.style.display="none";
        popup3.style.display="none";
        popup4.style.display="none";
        
        overlay.style.opacity=0;
    })
}





// ALL THE FUNCTIONS


// function to clear the data from the table
function clearTable(){
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// function to show the data from the table
function showInventory(arr){
    clearTable();
    itemCost(inventory);
    inventoryCost(inventory);

    
    for(let i=0; i<arr.length; i++){
        let tr=table.insertRow(-1);

        let td1=tr.insertCell(0);
        let td2=tr.insertCell(1);
        let td3=tr.insertCell(2);
        let td4=tr.insertCell(3);
        let td5=tr.insertCell(4);
        let td6=tr.insertCell(5);

        td1.innerText=arr[i].id;
        td2.innerText=arr[i].name;
        td3.innerText=arr[i].price;
        td4.innerText=arr[i].quantity;
        td5.innerText=arr[i].category;
        td6.innerText=arr[i].cost;
    }
}

// function to calculate the cost of an item 
function itemCost(arr){
    for(let i=0; i<arr.length; i++){
        let costofitem=arr[i].cost;
        costofitem=arr[i].price*arr[i].quantity;
        arr[i].cost=costofitem;
    }
    
}

// functioin to calculate the cost whole inventory 
function inventoryCost(arr){
    let costOfInventory=0;
    for(let i=0; i<arr.length; i++){
        costOfInventory+=arr[i].cost;
    }
    totalCost.innerText=costOfInventory;
}



// ALL THE EVENT LISTENERS


// Popups appear when button is cliked

// Add popup
addBtn.addEventListener("click", function(){
    popup1.style.display="block";
    overlay.style.opacity=1;
})

// Update popup
updateBtn.addEventListener("click", function(){
    popup2.style.display="block";
    overlay.style.opacity=1;
})

// delete popup
deleteBtn.addEventListener("click", function(){
    popup3.style.display="block";
    overlay.style.opacity=1;
})




// event for add popup
addSubmit.addEventListener("click", function(){
    clearTable();
    if(nameIpt!==""){
        let newItem={};
        newItem.id=id;
        id++;
        newItem.name=nameIpt.value;
        newItem.price=Number(priceIpt.value);
        newItem.quantity=Number(quanIpt.value);
        newItem.category=ctgIpt.value;
        newItem.cost=0;
        inventory.push(newItem);
        nameIpt.value="";
        priceIpt.value="";
        quanIpt.value="";
        ctgIpt.value="";
    }
    showInventory(inventory);
    popup1.style.display="none";
    overlay.style.opacity=0;
});

// events for update popup
updateSubmit.addEventListener("click", function(){
    for(let i=0; i<inventory.length; i++){
        if(tempid===inventory[i].id){
            inventory[i].name=nameIpt2.value;
            inventory[i].price=Number(priceIpt2.value);
            inventory[i].quantity=Number(quanIpt2.value);
            inventory[i].category=ctgIpt2.value;
            clearTable();
            showInventory(inventory);
        }
    }
    popup4.style.display="none";
    popup2.style.display="none";
    overlay.style.opacity=0;
})

updateDetailSubmit.addEventListener("click", function(){
    tempid=Number(updateIdIpt.value);
    popup4.style.display="block"; 
    for(let i=0; i<inventory.length; i++){
        if(tempid===inventory[i].id){
            nameIpt2.value=inventory[i].name;
            priceIpt2.value=inventory[i].price;
            quanIpt2.value=inventory[i].quantity;
            ctgIpt2.value=inventory[i].category;
            updateIdIpt.value="";
            
            break;
        }
    }
})

// event for delete popup
deleteSubmit.addEventListener("click", function(){
    let id=Number(deleteIdIpt.value);
    for(let i=0; i<inventory.length; i++){
        if(id===inventory[i].id){
            let rowToDelete = i + 1;
            if (rowToDelete >= 0 && rowToDelete < table.rows.length){
                inventory.splice(i, 1);
                clearTable();
                showInventory(inventory);
                
            }
        }
        deleteIdIpt.value="";
    }
    popup3.style.display="none";
    overlay.style.opacity=0;

})  


// main array for the inventory
const inventory=[
    {id: 200, name: "Fridge", price: 20000, quantity: 2, category: "Electronics", cost: 0},
    {id: 201, name: "EV Bike", price: 140000, quantity: 1, category: "Vehicle", cost: 0},
    {id: 202, name: "Table", price: 4000, quantity: 4, category: "Furniture", cost: 0},
    {id: 203, name: "Oppo A3s", price: 10000, quantity: 3, category: "Mobile", cost: 0},
    {id: 204, name: "RD Sharma", price: 500, quantity: 10, category: "Books", cost: 0}
]

// to show the table 
showInventory(inventory);

