var gifButtons = ['one', 'two', 'three', 'four'];


function addBut() {
	var userInput = $('input').val();
	var newbutton = $('<button>').html(userInput);
	$('.gifs').append(newbutton);
};

for (i in gifButtons) {
	var oldButton = $('<button>').html(gifButtons[i]);
	$('.gifs').append(oldButton);
};

$('.add').on('click', function() {
	event.preventDefault();
	addBut();
	$('input').val('');
});

