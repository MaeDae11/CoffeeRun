// local storage helps with username, timestamped tokens, etc instead of constantly asking the server over and over




// submit event
// var $theForm = $('[data-form="form"]');
// $theForm.on('submit', function (event) {

// });

// change event
// var $ageInput = $('[data-input="age"]'); 
// $ageInput.on('input', function(event){

// });

// value
// Get the current value of the first element in the set of matched elements or set the value of every matched element.

// change value
// $ageInput.val('');


// set to local storage
// The setItem() method of the Storage interface, when passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
// storage.setItem(keyName, keyValue);
// localStorage.setItem('age', '23');


// get local storage
// The getItem() method of the Storage interface, when passed a key name, will return that key's value.
// var age = localStorage.getItem('age');

// The .serialize() method creates a text string in standard URL-encoded notation. It can act on a jQuery object that has selected individual form controls, such as <input>, <textarea>, and <select>: $( "input, textarea, select" ).serialize();

// $(document.createElement('div'));

// Person writes in all their stuff on form and hits submit.
// submit will be the trigger function.
// then loop through all the data and push it storage
var URL = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders';
var $SUBMIT = $('[type="submit"]');
var $EMAIL = $('[name="emailAddress"]');
var $COFFEE = $('[name="coffee"]');
var $SIZE = $('[name="size"]');
var $FLAVOR = $('[name="flavor"]');
var $STRENGTH = $('[name="strength"]')

var theDataz = {};

function setValues(key, keyValue){
    localStorage.setItem(key, keyValue);
    theDataz[key] = keyValue;
};

function getCoffee(){
    var coffeeType = 'coffee';
    var $coffeeValue = $COFFEE.val();
    setValues(coffeeType, $coffeeValue);
}

function getEmail(){
    var email = 'emailAddress';
    var $emailValue = $EMAIL.val();
    setValues(email, $emailValue);
}

function getSize(){
    var size = 'size';
    var $sizeValue = $SIZE.val();
    setValues(size, $sizeValue);
}

function getFlavor() {
    var flavor = 'flavor';
    var $flavorValue = $FLAVOR.val();
    setValues(flavor, $flavorValue);
}

function getStrength() {
    var strength = 'strength';
    var $strengthValue = $STRENGTH.val();
    setValues(strength, $strengthValue);
}

// submitts to API
function submitClick(){
    $('[data-type-button="submit"]').on('click', function (){
        event.preventDefault();
        getCoffee();
        getEmail();
        getSize();
        getFlavor();
        getStrength();
        // $.post(URL, theDataz, function (resp){
        //     console.log(resp);
        });
    // }); 
};

// callback: gets all data from API and prints to HTML
function getOrdersFromAPI(){
     $.getJSON(URL, 'coffeeOrders', function(data){
        $.each(data, function(key, val){
            $(".past-order span")
                .append("Order: " + key + ": " + "orders a " + val['coffee'] + " " + val['size'] + " with " + val['flavor'] + ", " + val['strength'] + "mg strong." +  "<br />");
        });
    });
};

//innitiates to get all past orders from API
function getAllPastOrders(){
    $('[data-type-button="orders"]').on('click', function (){
        event.preventDefault();
        $( ".past-orders-container" ).show();
        getOrdersFromAPI();
    });
};

// get localstorave values in array and prints to HTML
function getValues(){
    for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        $(".local-storage-past-order span")
            .append(key + ": " + value + "<br />");

    }
};

// innitiates to get order from local storage
function getOrderFromStorage(){
    $('[data-type-button="personal-order"]').on('click', function () {
        event.preventDefault();
        $(".local-orders-container").show();
        getValues();
    });
};


$(".local-orders-container").hide();
$( ".past-orders-container" ).hide();
getOrderFromStorage();
getAllPastOrders();
submitClick();





