// Overall rundown: 
// Person types in all their answers on form and hits submit.
// submit will be the trigger function to store in local storage AND API.
// Get My Order button triggers function to get most recent order from Local Storage
//  Get All Past Orders button triggers function to get all orders in API


// global Variables
var URL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders';
var $SUBMIT = $('[type="submit"]');
var theDataz = {};





// 3.3
function setValues(key, keyValue){
    localStorage.setItem(key, keyValue);
    theDataz[key] = keyValue;
};
// 3.3
function getCoffee(){
    var coffeeType = 'coffee';
    var $coffeeValue = $('[name="coffee"]').val();
    setValues(coffeeType, $coffeeValue);
}
// 3.3
function getEmail(){
    var email = 'emailAddress';
    var $emailValue = $('[name="emailAddress"]').val();
    setValues(email, $emailValue);
}
// 3.3
function getSize(){
    var size = 'size';
    var $sizeValue = $('[name="size"]').val();
    setValues(size, $sizeValue);
}
// 3.3
function getFlavor() {
    var flavor = 'flavor';
    var $flavorValue = $('[name="flavor"]').val();
    setValues(flavor, $flavorValue);
}
// 3.3
function getStrength() {
    var strength = 'strength';
    var $strengthValue = $('[name="strength"]').val();
    setValues(strength, $strengthValue);
}

// 3.1
// submitts to API
function submitClick(){
    $('[data-type-button="submit"]').on('click', function (){
        event.preventDefault();
        getCoffee();
        getEmail();
        getSize();
        getFlavor();
        getStrength();
        $.post(URL, theDataz, function (resp){
            console.log(resp);
        });
    }); 
};

// takes value of 'strength' for coffee and returns a phrase in a string instead of a number
//2.5
function setStrengthOfCoffee(value){
    if (value === undefined){
        value = "";
    } else if (value === 0){
        value = "decaf";
    } else if (value <= 25) {
        value = "mild";
    } else if (value < 75 || value > 25) {
        value = "medium roast";
    } else if (value >=75) {
        value = "strong"
    } return value;
};

// checks if value is undefined and replaces it with empty string
//2.5
function checkForUndefined(value){
    if (value === undefined){
       value = "";
    }
    return value;
};
// prints to HTML
// 2.4
function appendOrderToHTML(data){
    $.each(data, function(key, val){
        $(".past-order span")
            .append("Order: " + key + ": " + 
            "orders a " + val['coffee'] + " " + 
            checkForUndefined(val['size']) + " " + 
            checkForUndefined(val['flavor']) + " " + 
            setStrengthOfCoffee(val['strength']) + " " + "coffee." + " " + "<input id='chk_" + key + "'data-type='check-box' type='checkbox' value='" + true + "' />"  + "<br />" ); 
    });
    deleteOrderFromAPI();
};               


function deleteOrderFromAPI(){
    var ifChecked = ($("input[type='checkbox']").attr())
    if (ifChecked === "checked"){
        console.log("OKKKKK");
    };              
}
//$('#test').prop('checked', true); */}
  


// gets data from API in JSON format
//2.3
function getDataFromAPI(){
    return $.getJSON(URL);
}
// 2.2 
// callback: gets all data from API and then prints to HTML
function getOrdersFromAPI(){
    getDataFromAPI()
        .then(appendOrderToHTML);
};


// 1 and 2 and 4 keeps track of how many times button is clicked
function clickCounter(receivedCounter, dataType){
    if (receivedCounter === 0){
            dataType.show();
            getOrdersFromAPI();
            receivedCounter = 1;
    } else if (receivedCounter === 1){
            dataType.hide();
            receivedCounter = 0;
    } return receivedCounter;
};

// 2.2
//innitiates to get all past orders from API
function getAllPastOrders(){
    var counter = 0;
    $('[data-type-button="orders"]').on('click', function (){
        event.preventDefault();
        counter = clickCounter(counter, $( ".past-orders-container"));
    });
};

//1.2
// get localstorage values in array and prints to HTML
function getValues(counter){
    for (var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        $(".local-storage-past-order span")
            .append(key + ": " + value + "<br />");
    }
};
// 1.1
// innitiates to get order from local storage
function getOrderFromStorage(){
    var counter = 0;
    $('[data-type-button="personal-order"]').on('click', function () {
        event.preventDefault();
        emptyText($(".local-storage-past-order span"));
        getValues();
        counter = clickCounter(counter, $(".local-orders-container"));
    });
};

// when search container is filled out and search is click, this initializes
// gets data from API 
// then searchs the API for particular email input by user
// then uses a counter so person can hide search bar
//4.1
function searchForOrder(){
    $('[data-type-button="find-order"]').on('click', function () {
        event.preventDefault();
        // no ; after because would stop
        getDataFromAPI()
            .then(searchAPI);
    });
};

// after getting data from API
// takes value submited in search area. 
//creates a blank object so can sort through specific data associated with email address
//if email is found within data...
// order will be set to data[$email] / this enables the ability to print different key values of data[$email] object
// if the email has been found, the order will be appended to the DOM
// if email was NOT found, user will recieve error
function searchAPI(data){
    emptyText($(".searched-order span"));
    var $email = $('.email-search').val();
    var order = {};
    if (data[$email]){
        order = data[$email];
        $(".searched-order span")
            .append($email + ": " + 
            checkForUndefined(order.coffee) + " " + 
            checkForUndefined(order.size) + " " + 
            checkForUndefined(order.flavor) + " " + 
            setStrengthOfCoffee(order.strength)  + 
            " coffee." + "<br />");
    } else {
        $(".searched-order span").append("We do not have that email on file.");
    }
};
// 
// emptys text in certain text fields so if button is clicked multiple times, the information is not printed over and over and over.
function emptyText(className){
    className.empty("");
}







// hides containers for orders until button is clicked
$(".local-orders-container").hide();
$(".past-orders-container").hide();

// innitializes page
// 1-4 correlate to code above and which steps are first, second, etc.
getOrderFromStorage();  // 1
getAllPastOrders(); // 2
submitClick();  // 3
searchForOrder(); //4





