
  // Wait until the DOM is fully loaded
  window.addEventListener('DOMContentLoaded', function() {
    // Grab elements once
    const btnStart        = document.getElementById('button-start');
    const homePage        = document.querySelector('.content');
    const quizApp         = document.querySelector('.quiz-page');
    const badgeCategory   = document.querySelector('.badge-category');
    const badgeDifficulty = document.getElementById('difficulty');
    const countQ          = document.getElementById('question');
    const questionText    = document.getElementById('question-placeholder');
    const btnAnswers      = document.querySelectorAll('.btn-answer');
    const nextBtn         = document.getElementById('next-question');
    const progressBar     = document.getElementById('progress-bar');

    let questions    = [];   // will hold the 5 questions
    let currentIndex = 0;    // which question we’re on

    const API = 'https://opentdb.com/api.php?amount=5&type=multiple';

    // 1. Fetch questions from the API
    function fetchQuestions(callback) {
      fetch(API)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
          }
          return response.json();
        })
        .then(function(data) {
          questions = data.results;
          callback();
        })
        .catch(function(err) {
          console.error('Fetch error:', err);
        });
    }

    // 2. Shuffle array (Fisher–Yates)
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    // 3. Reset answer button styles
    function resetStyles() {
      btnAnswers.forEach(function(btn) {
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.backgroundColor = '';
        btn.style.color = '';
      });
    }

    // 4. Render the current question on screen
    function renderQuestion() {
      let q = questions[currentIndex];

      // update category & difficulty text
      badgeCategory.textContent = 'Category: ' + q.category;
      badgeDifficulty.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
      // color difficulty
      let colorMap = { easy: 'green', medium: 'orange', hard: 'red' };
      badgeDifficulty.style.color = colorMap[q.difficulty] || 'gray';

      // update question counter and text
      countQ.textContent = 'Question ' + (currentIndex + 1) + ' / ' + questions.length;
      questionText.innerHTML = q.question;

      // update progress bar
      let percent = (currentIndex / questions.length) * 100;
      progressBar.style.width = percent + '%';

      // prepare and shuffle answers
      let answers = q.incorrect_answers.slice(); // copy array
      answers.push(q.correct_answer);
      shuffle(answers);

      // assign text to each answer button
      btnAnswers.forEach(function(btn, idx) {
        btn.textContent = answers[idx];
      });

      // reset styles and hide Next button
      resetStyles();
      nextBtn.style.display = 'none';
    }

    // 5. When Start Quiz is clicked
    btnStart.addEventListener('click', function() {
      fetchQuestions(function() {
        homePage.classList.add('invisible');
        quizApp.classList.remove('invisible');
        renderQuestion();
      });
    });

    // 6. When an answer is clicked
    btnAnswers.forEach(function(btn) {
      btn.addEventListener('click', function() {
        let chosen = this.textContent;
        let correct = questions[currentIndex].correct_answer;

        // disable all buttons
        btnAnswers.forEach(function(b) { b.disabled = true; });

        // mark correct/incorrect
        btnAnswers.forEach(function(b) {
          if (b.textContent === correct) {
            // correct
            b.style.borderColor = 'green';
            b.style.backgroundColor = 'rgba(0,128,0,0.1)';
            b.style.color = 'green';
          } else if (b.textContent === chosen) {
            // wrong
            b.style.borderColor = 'red';
            b.style.backgroundColor = 'rgba(255,0,0,0.1)';
            b.style.color = 'red';
          }
        });

        // play success sound on correct
        if (chosen === correct) {
          successAudio.currentTime = 0;
          successAudio.play();
        }

        // show Next Question button
        nextBtn.style.display = 'inline-block';
      });
    });

    // 7. When Next Question is clicked
    nextBtn.addEventListener('click', function() {
      currentIndex++;
      if (currentIndex < questions.length) {
        renderQuestion();
      } else {
        // quiz done
        progressBar.style.width = '100%';
        countQ.textContent = 'Quiz Complete!';
        questionText.textContent = 'Well done! You’ve completed the quiz.';
        btnAnswers.forEach(function(b) { b.style.display = 'none'; });
        nextBtn.style.display = 'none';
      }
    });
  });
