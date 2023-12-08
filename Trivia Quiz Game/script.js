const quizData = [
    {
        question: "What data structure uses LIFO (Last In, First Out) principle?",
        options: ["Stack", "Queue", "Heap", "LinkedList"],
        answer: "Stack"
      },
      {
        question: "Which sorting algorithm has the best time complexity in the best-case scenario?",
        options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
        answer: "Quick Sort"
      },
      {
        question: "What data structure represents a hierarchical relationship?",
        options: ["Tree", "Stack", "Heap", "Queue"],
        answer: "Tree"
      },
      {
        question: "Which searching algorithm operates by dividing the search range in half?",
        options: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search"],
        answer: "Binary Search"
      },
      {
        question: "Which sorting algorithm has a time complexity of O(n log n) in the worst-case scenario?",
        options: ["Bubble Sort", "Selection Sort", "Heap Sort", "Merge Sort"],
        answer: "Merge Sort"
      },
      {
        question: "What data structure follows the FIFO (First In, First Out) principle?",
        options: ["Stack", "Queue", "Linked List", "Hash Table"],
        answer: "Queue"
      },
      {
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: ["Dijkstra's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", "Bellman-Ford Algorithm"],
        answer: "Dijkstra's Algorithm"
      },
    
  ]; 
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const feedbackElement = document.getElementById('feedback');
  const nextButton = document.getElementById('next-btn');
  const backButton = document.getElementById('back-btn');
  const timeElement = document.getElementById('time');
  
  let currentQuestion = 0;
  let score = 0;
  let time = 10;
  let countdown;
  
  function displayQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
  
    choicesElement.innerHTML = '';
    q.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', checkAnswer);
      choicesElement.appendChild(button);
    });
  
    startTimer();
    updateButtonVisibility();
  }
  
  function startTimer() {
    time = 10;
    clearInterval(countdown);
    countdown = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    timeElement.textContent = time + ' seconds';
    if (time === 0) {
      clearInterval(countdown);
      checkAnswer();
    } else {
      time--;
    }
  }
  
  function checkAnswer(event) {
    const selectedOption = event ? event.target.textContent : '';
    const correctAnswer = quizData[currentQuestion].answer;
  
    if (selectedOption === correctAnswer) {
      feedbackElement.textContent = 'Correct!';
      score++;
    } else {
      feedbackElement.textContent = `Wrong! The correct answer is ${correctAnswer}`;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(countdown);
    questionElement.textContent = `Quiz Over! Your score is ${score}/${quizData.length}`;
    choicesElement.innerHTML = '';
    feedbackElement.textContent = '';
    timeElement.textContent = '';
    nextButton.style.display = 'none';
    backButton.style.display = 'none';
  }
  
  function updateButtonVisibility() {
    if (currentQuestion === 0) {
      backButton.style.display = 'none';
    } else {
      backButton.style.display = 'inline-block';
    }
    if (currentQuestion === quizData.length - 1) {
      nextButton.textContent = 'Finish';
    } else {
      nextButton.textContent = 'Next Question';
    }
  }
  
  function goBack() {
    if (currentQuestion > 0) {
      currentQuestion--;
      displayQuestion();
      feedbackElement.textContent = ''; // Clear feedback when going back
    }
  }
  
  function goToNext() {
    currentQuestion++;
    displayQuestion();
  }
  
  backButton.addEventListener('click', goBack);
  nextButton.addEventListener('click', goToNext);
  displayQuestion();
  