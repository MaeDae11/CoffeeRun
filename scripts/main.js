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




// 2 C
function setValues(key, keyValue){
    localStorage.setItem(key, keyValue);
    theDataz[key] = keyValue;
};
// 2 C
function getCoffee(){
    var coffeeType = 'coffee';
    var $coffeeValue = $('[name="coffee"]').val();
    setValues(coffeeType, $coffeeValue);
}
// 2 C
function getEmail(){
    var email = 'emailAddress';
    var $emailValue = $('[name="emailAddress"]').val();
    setValues(email, $emailValue);
}
// 2 C
function getSize(){
    var size = 'size';
    var $sizeValue = $('[name="size"]').val();
    setValues(size, $sizeValue);
}
// 2 C
function getFlavor() {
    var flavor = 'flavor';
    var $flavorValue = $('[name="flavor"]').val();
    setValues(flavor, $flavorValue);
}
// 2 C
function getStrength() {
    var strength = 'strength';
    var $strengthValue = $('[name="strength"]').val();
    setValues(strength, $strengthValue);
}

// 1 C
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


// 2 B
// callback: gets all data from API and prints to HTML
function getOrdersFromAPI(){
     $.getJSON(URL, 'coffeeOrders', function(data){
        $.each(data, function(key, val){
            $(".past-order span")
                .append("Order: " + key + ": " + "orders a " + val['coffee'] + " " + val['size'] + " with " + val['flavor'] + ", " + val['strength'] + "mg strong." +  "<br />");
        });
    });
};


// 1 B
//innitiates to get all past orders from API
function getAllPastOrders(){
    $('[data-type-button="orders"]').on('click', function (){
        event.preventDefault();
        $( ".past-orders-container" ).show();
        getOrdersFromAPI();
    });
};


// 2 A
// get localstorave values in array and prints to HTML
function getValues(){
    for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        $(".local-storage-past-order span")
            .append(key + ": " + value + "<br />");

    }
};

// 1 A
// innitiates to get order from local storage
function getOrderFromStorage(){
    $('[data-type-button="personal-order"]').on('click', function () {
        event.preventDefault();
        $(".local-orders-container").show();
        getValues();
    });
};


// hides containers for orders until button is clicked
$(".local-orders-container").hide();
$( ".past-orders-container" ).hide();

// innitializes page
// A, B and C correlate to code above and which steps are first, second, etc.
getOrderFromStorage();  // A
getAllPastOrders(); // B
submitClick();  // C





