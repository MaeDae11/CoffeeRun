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
// $ageInput.on('input', function (event){
//     console.log($ageInput.val());
// });

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
    var email = 'email';
    var $emailValue = $EMAIL.val();
    setValues(email, $emailValue);
}

function getSize(){
    var size = 'size';
    var $sizeValue = $SIZE.val();
    setValues(size, $sizeValue)
}

function getFlavor() {
    var flavor = 'flavor';
    var $flavorValue = $FLAVOR.val();
    setValues(flavor, $flavorValue)
}

function getStrength() {
    var strength = 'strength';
    var $strengthValue = $STRENGTH.val();
    setValues(strength, $strengthValue)
}

function submitClick(){
    $('[data-coffee-order="form"]').on('submit', function (){
        event.preventDefault();
        getCoffee();
        getEmail();
        getSize();
        getFlavor();
        getStrength();
        console.log(theDataz)
    }); 
};

submitClick();





// $.get(URL, function (data) {
//      console.log(data);
// });

// function coffeeInfo() {
//     var $COFFEE = $('[name="coffee"]');
//     var name = 'coffee'
//     localStorage.setItem('coffee', $COFFEE.val());
// }




  // localStorage.setItem('email', $EMAIL.val());
    // theDataz['email'] = $EMAIL.val();
    // localStorage.setItem('size', $SIZE.val());
    // theDataz['size'] = $SIZE.val();
    // localStorage.setItem('flavor', $FLAVOR.val());
    // theDataz['flavor'] = $FLAVOR.val();
    // localStorage.setItem('strength', $STRENGTH.val());
    // theDataz['strength'] = $STRENGTH.val();
    // console.log(theDataz);