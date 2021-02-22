
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const endButton = document.getElementById('end-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const endGameElement = document.getElementById('end-game-message')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

endButton.addEventListener('click', gameOver)
// //function to disappear welcome message
document.querySelector(".start-btn").addEventListener("click", disappear_welcome);

function disappear_welcome() {
    document.querySelector(".welcome-message").style.display = "none";
    endGameElement.style.display = "none";
}

function gameOver() {
    questionContainerElement.classList.add('hide')
    nextButton.classList.add('hide')
    endGameElement.style.display = "block"
    startButton.classList.remove('hide')
    startButton.innerText = 'Restart'
    endButton.classList.add('hide')

    // const end = endButton.dataset.end
    // setStatusClass(document.body, end)
    clearStatusClass(document.body)
    document.body.classList.add('end')

}

function startGame() {


    startButton.classList.add('hide')
    shuffledQuestions = questions // questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
        endButton.classList.remove('hide')
    } else {
        //startButton.innerText = 'Restart'
        //endButton.innerText = 'End'
        //endButton.classList.remove('hide')
        endGameElement.classList.remove('hide')

    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
    element.classList.remove('end')
}


const questions = [{
    question: "Grid search is: ",
    answers: [{
        text: 'Linear in dimensionality.',
        correct: false
    },
    {
        text: 'Polynomial in dimensionality.',
        correct: false
    },
    {
        text: 'Exponential in dimensionality.',
        correct: true
    },
    {
        text: 'Linear in the number of sample points.',
        correct: true
    }
    ]
},
{
    question: 'We have a 1/2 in front of the mean-square-error(MSE) because ',
    answers: [{
        text: 'scaling MSE by half makes gradient descent converge faster.',
        correct: false
    },
    {
        text: 'presence of half makes it easy to do grid search.',
        correct: false
    },
    {
        text: 'it does not matter whether half is there or not.',
        correct: true
    },
    {
        text: 'non of the above.',
        correct: false
    }
    ]
},
{
    question: 'We have computed the gradient of cost function, what is the cost of one gradient update given the gradient?',
    answers: [{
        text: 'O(Dimension)',
        correct: true
    },
    {
        text: 'O(Sample Size)',
        correct: false
    },
    {
        text: 'O(Dimension * Sample Size)',
        correct: false
    },
    {
        text: 'O(sample Size * Dimension^2)',
        correct: false
    }
    ]
},
{
    question: 'k-fold cross-validation is ',
    answers: [{
        text: 'linear in k',
        correct: true
    },
    {
        text: 'quadratic in k',
        correct: false
    },
    {
        text: 'cubic in k',
        correct: false
    },
    {
        text: 'exponential in k',
        correct: false
    }
    ]
},
{
    question: 'Adding more basis functions in a linear model would mostly likely: ',
    answers: [{
        text: 'Decrease model bias.',
        correct: true
    },
    {
        text: 'Decreases estimation bias.',
        correct: false
    },
    {
        text: 'Decreases variance.',
        correct: false
    },
    {
        text: "Does not affect bias and variance.",
        correct: false
    }
    ]
},
{
    question: 'Do you like Machine Learning and Artificial Intelligence? ',
    answers: [{
        text: 'Yes! it is supper interesting!',
        correct: true
    },
    {
        text: 'No, it sucks.',
        correct: false
    },
    {
        text: 'Of course I do, let us do something big with it!',
        correct: true
    },
    {
        text: "No, not interested at all.",
        correct: false
    }
    ]
}
]

console.log(questions.length)

//special thanks to Dev Ed