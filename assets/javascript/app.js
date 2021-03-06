
<script>
	var triviaQuestions = [{
	question: "Where did Ross and Rachel get married on a whim?",
	answerList: ["New York", "Las Vegas", "Bahamas", "Rome"],
	answer: 1
},{
	question: "What is Monicas apartment number?",
	answerList: ["20", "1", "15", "22"],
	answer: 0
},{
	question: "Which pairing never kissed on the show?",
	answerList: ["Monica and Pheobe", "Chandler and Rachel", "Monica and Ross", "Rachel and Joey"],
	answer: 0
},{
	question: "What is Chandler's Middle Name?",
	answerList: ["Mark", "Marcel", "Muriel", "Matthew"],
	answer: 2
},{
	question: "Who pees on Monica's leg when she gets stung by a jellyfish?",
	answerList: ["Ross", "Joey", "Gunther", "Chandler"],
	answer: 3
},{
	question: "What caused the fire in Phoebe and Rachel's apartment?",
	answerList: ["Insense", "Smoking", "Candles", "Hair-Straightner"],
	answer: 3
},{
	question: "In 'The one with the lottery', what causes Phoebe to drop the bowl of tickets?",
	answerList: ["Falling asleep", "Joey", "Rain/slipping", "Pigeon"],
	answer: 3
},{
	question: "What does Monica's dad give her to compensate ruining her childhood possesions?",
	answerList: ["A House", "Money", "Porsche", "Ferrari"],
	answer: 2
},{
	question: "Where does Chandler tell Janice he has been relocated to to avoid her",
	answerList: ["Las vegas", "Yemen", "Oklahoma", "Maine"],
	answer: 1
},{
	question: "How many season of the show were made?",
	answerList: ["12", "6", "8", "10"],
	answer: 3
},{
	question: "What exotic animal did Ross have?",
	answerList: ["Monkey", "Snake", "Lizard", "Pig"],
	answer: 0
},{
	question: "What is Rachels Favourtie film?",
	answerList: ["Frozen", "My Giant", "Weekend at Bernie's", "Toy Story"],
	answer: 2
},{
	question: "How many times do you clap in the Friends theme song?",
	answerList: ["6", "3", "5", "4"],
	answer: 3
},{
	question: "Which Friends have never lived together?",
	answerList: ["Joey and Pheobe", "Monica and Ross", "Joey and Ross", "Rachel and Chandler"],
	answer: 0
},{
	question: "'What is Ross's daughters name?",
	answerList: ["Casey", "Sam", "Emma", "Ben"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, Good Job!",
	incorrect: "No, no, that's not right at all",
	endTime: "Out of time!",
	finished: "Ok, Let's check if your a good FRIEND"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
</script>