var gifButtons = ['Hugh Jackman', 'Ryan Gosling', 'Chris Pratt', 'Anne Hathaway', 'Jackie Chan', 'Will Smith'];

function addBut() {
    var userInput = $('input').val();
    userInput = userInput.replace(/\w\S*/g, function(userInput) {
        return userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
    });

    var newbutton = $('<button>').html(userInput);
    newbutton.addClass('search');
    for (a in gifButtons) {
        if (userInput != gifButtons[a]) {
            $('.gifButtons').append(newbutton);
            gifButtons.push(userInput);
        } else {
        	alert(userInput + " is already listed below.")
        }
    }
};

$('.add').on('click', function() {
    event.preventDefault();
    if ($('input').val() != "") {
        addBut();
    };
    $('input').val("");
});

for (i in gifButtons) {
    var oldButton = $('<button>').html(gifButtons[i]);
    oldButton.addClass('search');
    $('.gifButtons').append(oldButton);
};

$(document).on('click', '.search', function() {
    var search = $(this).html();
    var xhr = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=0UsaSP9p2kh0tXU4u0hPr0lVlSOW8O4i&limit=10";
    $('.gifs').empty();
    $.ajax({
        url: xhr,
    }).then(function(response) {
        for (i in response.data) {
            var rating = $('<p>').text(response.data[i].rating);
            var gifStill = $('<img>').attr('src', response.data[i].images.original_still.url);
            gifStill.attr('data-still', response.data[i].images.original_still.url);
            gifStill.attr('data-animate', response.data[i].images.original.url);
            gifStill.attr('data-state', 'still');
            gifStill.addClass('click');
            $('.gifs').append(gifStill);
            $('.gifs').append(rating);
        }
        console.log(response);
    });
});

$(document).on('click', '.click', function() {
    var state = $(this).attr('data-state');
    var gif = $(this).attr('data-animate');
    var still = $(this).attr('data-still');
    if (state == 'still') {
        $(this).attr('src', gif);
        $(this).attr('data-state', 'animate');
    }

    if (state == 'animate') {
        $(this).attr('src', still);
        $(this).attr('data-state', 'still');
    }
});







