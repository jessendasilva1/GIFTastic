var buttonArray = ["hawk", "giraffe", "dog", "cat", "rabbit", "squirrel", "lion", "hamster"];
var animalClicked;
var currentAnimal;
var apikey = "oDHbUaskKcKp6fj1tNKzNusrKKFcaDRS";
var queryURL = "https://api.giphy.com/v1/gifs/search?q=";


function start() {
    generateButtons();
    //console.log('christmas is almost here!');
}
function generateButtons() {
    $("#buttonDiv").empty();
    $.each(buttonArray, function (index, animalName) {
       // console.log(animalName);
        $("#buttonDiv").append(`
            <button id="${animalName}" type="button" class="btn animalButton" onclick="generateGifs(this)">${animalName}</button>
        `);
    })
}

function generateGifs(element){
    animalClicked = element.id;
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalClicked + "&api_key=" + apikey + "&limit=10&rating=g";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        gifData = response.data;
        $("#gifDisplay").empty();
        for(var i = 0; i < gifData.length; i++){
            $("#gifDisplay").append(`
            <div class="d-flex flex-column">
                <h5 id="gifTitle">Rating: ${gifData[i].rating}</h5>
                <img src="${gifData[i].images.fixed_height_still.url}" data-still="${gifData[i].images.fixed_height_still.url}" data-animate="${gifData[i].images.fixed_height.url}" data-state="still" class="animalGifs" alt="animal" onclick="changeGifState(this)">
                </div
            `);
        }
    })
}

function changeGifState(element){
    var state = element.dataset;
    if(state.state === "still"){
        element.src = state.animate;
        state.state = "animate"
    }   
    else{
        element.src = state.still;
        state.state = "still";
    }
    //console.log("gifState: " + state);
}

$("#animalSubmitButton").on("click", function(){
    currentAnimal = $("#animalName").val();
    $("#animalName").empty();
    buttonArray.push(currentAnimal);
    generateButtons();
})