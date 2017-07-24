// Overall rundown: 
// Person types in all their answers on form and hits submit.
// submit will be the trigger function to store in local storage AND API.
// Get My Order button triggers function to get most recent order from Local Storage
//  Get All Past Orders button triggers function to get all orders in API


// global Variables
var URL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders';
var $SUBMIT = $('[type="submit"]');
var theDataz = {};

// global variables that ended up only being used once as of right now
// var $EMAIL = $('[name="emailAddress"]');
// var $COFFEE = $('[name="coffee"]');
// var $SIZE = $('[name="size"]');
// var $FLAVOR = $('[name="flavor"]');
// var $STRENGTH = $('[name="strength"]')




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

// 2 (now condenced below)
// callback: gets all data from API and prints to HTML
// function getOrdersFromAPI(){
//      $.getJSON(URL, 'coffeeOrders', function(data){
//         $.each(data, function(key, val){
//             $(".past-order span")
//                 .append("Order: " + key + ": " + "orders a " + val['coffee'] + " " + val['size'] + " with " + val['flavor'] + ", " + val['strength'] + "mg strong." +  "<br />");
//         });
//     });
// };




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
            .append("Order: " + key + ": " + "orders a " + val['coffee'] + " " + checkForUndefined(val['size']) + " " + checkForUndefined(val['flavor']) + " " + checkForUndefined(val['strength']) + " " + "coffee." + "<br />");
    });
};
// gets data from API in JSON format
// 2.3
function getDataFromAPI(){
    return $.getJSON(URL);
}
// 2.2
// callback: gets all data from API and then prints to HTML
function getOrdersFromAPI(){
    getDataFromAPI()
        .then(appendOrderToHTML);
};
//1.2
// get localstorave values in array and prints to HTML
function getValues(counter){
    for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        $(".local-storage-past-order span")
            .append(key + ": " + value + "<br />");
    }
};

// 1 and 2 keeps track of how many times button is clicked
function clickCounter(receivedCounter, dataType){
    if (receivedCounter === 0){
            dataType.show();
            getOrdersFromAPI();
            receivedCounter = 1;
    } else if (receivedCounter === 1){
            dataType.hide();
            receivedCounter = 0;
    } return receivedCounter
}

// 1.2
//innitiates to get all past orders from API
function getAllPastOrders(){
    var counter = 0;
    $('[data-type-button="orders"]').on('click', function (){
        event.preventDefault();
        counter = clickCounter(counter, $( ".past-orders-container"));
    });
};

// 1.1
// innitiates to get order from local storage
function getOrderFromStorage(){
    var counter = 0;
    $('[data-type-button="personal-order"]').on('click', function () {
        event.preventDefault();
        getValues();
        counter = clickCounter(counter, $(".local-orders-container"));
    });
};


// hides containers for orders until button is clicked
$(".local-orders-container").hide();
$(".past-orders-container").hide();

// innitializes page
// A, B and C correlate to code above and which steps are first, second, etc.
getOrderFromStorage();  // 1
getAllPastOrders(); // 2
submitClick();  // 3





