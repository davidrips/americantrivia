$( document ).ready(function(){
var begin = $('<button>');

begin.addClass('begin');
begin.text('Play')

$('#gameArea').append(begin);

$('.begin').on('click', function(){
game.next()});


var questions = [
	{
		question: "Who was the first president?",
		answers: ['George Washington', 'John Adams', 'James Madison', 'John Kennedy'],
		picture: "assets/images/question1.jpg",
		correct: 0,
		display: 'George Washington',
	},
	{
		question: "Where was the first capital of the USA?",
		answers: ['Washington', 'Philadelphia', 'NYC', 'London'],
		picture: "assets/images/question2.jpg",
		correct: 2,
		display: 'NYC'
	},
	{
		question: "What country did the USA declare independence from?",
		answers: ['Canada', 'France', 'Mexico', 'England'],
		picture: "assets/images/question3.jpg",
		correct: 3,
		display: 'England', 
	},
	{
		question: "How many states compose the United States today?",
		answers: ['50', '30', '13', 'Just 1'],
		picture: "assets/images/question4.jpg",
		correct: 0,
		display: '50', 
	},
	{
		question: "What year was America 'invented'?",
		answers: ['1732', '1885', '1776', '2012'],
		picture: "assets/images/question5.jpg",
		correct: 2,
		display: '1776', 
	}
];


var game = {
	correctAns:0,
	incorrectAns:0,
	unanswered:0,
	whichQuestion:0,
	time:0,
	finishTest: questions.length-1,
		
		

	

	right: function(){
		$('#gameArea').html('');
		var right = $('<div>');
		right.addClass('rightScreen');
		$('#gameArea').append(right);
		$('.rightScreen').text('Correct! The answer was '+questions[game.whichQuestion].display);
		var image = $('<img>');
		image.addClass('answerimage')
		image.attr('src', ''+questions[game.whichQuestion].picture+'')
		$('#gameArea').append(image);
		game.whichQuestion++

		if (game.whichQuestion > game.finishTest) {
			setTimeout(game.done, 3000);
		}else{
			setTimeout(game.next, 3000);
		};
		
		
	},

	wrong: function(){
		$('#gameArea').html('');
		var wrong = $('<div>');
		wrong.addClass('wrongScreen');
		$('#gameArea').append(wrong);
		$('.wrongScreen').text('Incorrect! The correct answer was: '+questions[game.whichQuestion].display);
		var image = $('<img>');
		image.addClass('answerimage')
		image.attr('src', ''+questions[game.whichQuestion].picture+'')
		$('#gameArea').append(image);
		game.whichQuestion++

		if (game.whichQuestion > game.finishTest) {
			setTimeout(game.done, 3000);
		}else{
			setTimeout(game.next, 3000);
		};
	},

	late: function(){
		$('#gameArea').html('');
		var late = $('<div>');
		late.addClass('lateScreen');
		$('#gameArea').append(late);
		$('.lateScreen').text('You ran out of time! The correct answer is: '+questions[game.whichQuestion].display);
		var image = $('<img>');
		image.addClass('answerimage')
		image.attr('src', ''+questions[game.whichQuestion].picture+'')
		$('#gameArea').append(image);
		game.unanswered++
		game.whichQuestion++
		if (game.whichQuestion > game.finishTest) {
			setTimeout(game.done, 3000);
		}else{
			setTimeout(game.next, 3000);
		};


	},

	done: function(){
		var done = $('<div>');
		done.addClass('doneScreen');
		$('#gameArea').html('');
		$('#gameArea').append(done);
		$('.doneScreen').append( 
			"<h2>All done!</h2> <p>Here's your score:</p> <p>Answered Correctly: "+game.correctAns+"</p><p>Answered Incorrectly: "+game.incorrectAns+"</p><p>Unanswered: "+game.unanswered+"</p>"
			);
		var startOver = $('<button>');
		startOver.addClass('startOver');
		startOver.text('Try again?')
		$('#gameArea').append(startOver);
		$('.startOver').on('click', function(){
			game.correctAns = 0;
			game.incorrectAns = 0;
			game.unanswered = 0;
			game.whichQuestion = 0;
			game.next();

		});
	},

	next: function(){
		

		$('#gameArea').html('');
		var showq = $('div');
		showq.addClass('showq');
		$('.showq').html("<p>"+questions[game.whichQuestion].question+"</p>")
		$('#gameArea').append(showq);

		game.time = 10;
		showt = $('span');
		showt.addClass('showt');
		$('.showt').html("Time Left: "+game.time);
		$( '#timeLeft').append(showt)
	
		timeLeft = setInterval(function(){
					game.time--;
					$('#timeLeft').text("Time Left: "+game.time);
						if(game.time===0){
							clearInterval(this.timeLeft);
							game.late();
							
						}
				},1000);

		for (var i=0; i<questions[game.whichQuestion].answers.length; i++){
				var answerChoice = $('<input>');
				answerChoice.attr('type', "button")
				answerChoice.attr('data-num', i);
				answerChoice.addClass("answerChoice");
				answerChoice.attr('value', questions[game.whichQuestion].answers[i]);
				$('#gameArea').append(answerChoice);
		};

		$('.answerChoice').on('click', function(){
			userGuess = parseInt($(this).data('num'));
			if (userGuess==questions[game.whichQuestion].correct){
				//display you got it right text. display image. 
				clearInterval(timeLeft)
				game.correctAns++
				game.right();
			}else{
				//you got it wrong text, image, right answer
				clearInterval(timeLeft)
				game.incorrectAns++
				game.wrong()
			}
		});

		

	},

}
})