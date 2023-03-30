class Liked_Facts
{
    static list = [];

    constructor(fact)
    {
        this.fact = fact;
    }
}

class Disliked_Facts
{
    static list = [];

    constructor(fact)
    {
        this.fact = fact;
    }
}

let fact = null;
let counter = 0;

function getDogData()
{
    $.ajax({
        url: "https://dogapi.dog/api/facts",
        header: {"":""},
        method: "GET",
        success: function(data){
            fact = data.facts;
            Liked_Facts.list.forEach(element => {
                if(element == fact)
                {
                    counter++;
                    getDogData();
                }
            });
            Disliked_Facts.list.forEach(element => {
                if(element == fact)
                {
                    counter++;
                    getDogData();
                }
            });
            if(counter >= 5)
            {
                $("#main").empty();
                $("#main").append('<h3 class="text-danger">No new Dog fact</h3>');
                return;
            }
            $("#error").empty();
            counter = 0;
            createTable();
        },
        error: function(error){
            $("#error").empty();
            $("#error").append('<div class="alert alert-danger" role="alert">Service currently unaviable, try again later!</div>');
        }
    });
}

function createTable()
{
    $("#main").empty();
    $("#list").empty();
    $("#main").append('<div class="px-2" id="dogfact"> <div class="card"> <h5 class="card-header">Dog Fact</h5> <div class="card-body"> <h5 class="card-title">About dogs</h5> <p class="card-text">' + fact + '</p> <div class="d-flex justify-content-around"> <a href="#" class="btn btn-success px-3 py-2" id="like" onclick="like()">Like</a> <a href="#" class="btn btn-danger px-3 py-2" id="dislike" onclick="dislike()">Dislike</a> </div> </div> </div> </div>');
}

function like()
{
    Liked_Facts.list.push(new Liked_Facts(fact));
    getDogData();
}

function dislike()
{
    Disliked_Facts.list.push(new Liked_Facts(fact));
    getDogData();
}

function showLiked()
{
    $("#list").empty();
    $("#main").empty();
    Liked_Facts.list.forEach(element =>{
        $("#list").append('<div class="py-2 w-50" id="dogfact"> <div class="card"> <h5 class="card-header">Dog Fact</h5> <div class="card-body"> <h5 class="card-title">About dogs</h5> <p class="card-text">' + element.fact + '</p> </div> </div> </div>');
    });
}

function showDisliked()
{
    $("#list").empty();
    $("#main").empty();
    Disliked_Facts.list.forEach(element =>{
        $("#list").append('<div class="py-2 w-50" id="dogfact"> <div class="card"> <h5 class="card-header">Dog Fact</h5> <div class="card-body"> <h5 class="card-title">About dogs</h5> <p class="card-text">' + element.fact + '</p> </div> </div> </div>');
    });
}