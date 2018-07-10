var topics = ['Hugh Jackman', 'Emily Blunt', 'Chris Pratt', 'Anne Hathaway', 'Jackie Chan', 'Will Smith'];
var favorites = [];

for (i in topics) {
    var oldButton = $('<button>').html(topics[i]);
    oldButton.addClass('search');
    $('.gifButtons').append(oldButton);
};

$('.message').html("Hello!" + "<br>" + "Click on a name to recieve gifs" + "<br>" +
        "Add any name to the list");

// add button function
function addBut() {
    var userInput = $('input').val();
    userInput = userInput.replace(/\w\S*/g, function(userInput) {
        return userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
    });
    var newbutton = $('<button>').html(userInput);
    newbutton.addClass('search');
    if (topics.indexOf(userInput) < 1) {
        $('.gifButtons').append(newbutton);
        topics.push(userInput);
    } else {
        $('.message').html(userInput + " is already listed!")
    }
};

// add button click function
$('.add').on('click', function() {
    event.preventDefault();
    if ($('input').val() != "") {
        addBut();
    } else {
        $('.message').html("Don't forget to enter a name!");
    };
    $('input').val("");
});

// clear gifs click function
$('.cleargifs').on('click', function() {
    event.preventDefault();
    $('.gifs').empty();
    $('#intro').addClass('message');
    if ($('.message').html() != "Hello!" + "<br>" + "Click on a name to recieve gifs" + "<br>" +
        "Add any name to the list") {
        $('.message').html("Your gifs have been cleared!");
    }
    $('.search').removeClass('active');
})

// display gifs click function
$(document).on('click', '.search', function() {
    event.preventDefault();
    var search = $(this).html();
    var xhr = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=0UsaSP9p2kh0tXU4u0hPr0lVlSOW8O4i&limit=10";
    $('.gifs').empty();
    $('.message').empty();
    $('.message').removeClass('message');
    $.ajax({
        url: xhr,
    }).then(function(response) {
        for (i in response.data) {
            var span = $('<span>');
            var title = "Title: " + response.data[i].title + "<br>";
            var rating = " Rating: " + response.data[i].rating + "<br>";
            var dateImport = "Upload Date: " + response.data[i].import_datetime;
            var gifInfo = $('<p>').html(title + rating + dateImport);
            var gifStill = $('<img>').attr('src', response.data[i].images.original_still.url);
            span.append(gifStill);
            span.append(gifInfo);
            gifStill.attr('data-still', response.data[i].images.original_still.url);
            gifStill.attr('data-animate', response.data[i].images.original.url);
            gifStill.attr('data-state', 'still');
            gifStill.addClass('click');
            $('.gifs').append(span);
        }
    });
    $('.search').removeClass('active');
    $(this).addClass('active');
});

// toggle animate gifs click function
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

// add more gifs click function
$('.addmore').on('click', function() {
    event.preventDefault();
    var search = $('.active').html();
    var xhr = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=0UsaSP9p2kh0tXU4u0hPr0lVlSOW8O4i&limit=20";
    $.ajax({
        url: xhr,
    }).then(function(response) {
        if (search != undefined) {
            for (i in response.data) {
                var span = $('<span>').addClass('hi');
                var rating = $('<p>').html("Rating: " + response.data[i].rating);
                var gifStill = $('<img>').attr('src', response.data[i].images.original_still.url);
                span.append(gifStill);
                span.append(rating);
                gifStill.attr('data-still', response.data[i].images.original_still.url);
                gifStill.attr('data-animate', response.data[i].images.original.url);
                gifStill.attr('data-state', 'still');
                gifStill.addClass('click');
                $('.gifs').append(span);
            }
        } else {
            $('.message').html("No One Is Selected!");
        }
    });
});

// add gif to favorites click function
$(document).on('click', '.addFav', function() {
    var selectedActor = $('.active').html();
    event.preventDefault();
    if (favorites.indexOf(selectedActor) < 0) {
        if (selectedActor != undefined) {
            var favButton = $('<button>').html(selectedActor);
            favButton.addClass('search');
            $('.favorites').append(favButton);
            favorites.push($('.active').html());
        } else {
            $('.message').html("Select an actor first!");
        }
    }
});

// back to top scroll function
$(document).on('scroll', function() {
    if ($(document).scrollTop()) {
        $('#arrow').addClass('top');
    } else {
        $('#arrow').removeClass('top');
    }
});

// back to top click function
$(document).on('click', '.top', function() {
    $('html, body').animate({ scrollTop: 0 }, 1000);
});