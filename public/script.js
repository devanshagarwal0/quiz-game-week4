let questions = [];

async function apiCall() {
  try {
    const res = await fetch("http://localhost:3000/question");
    questions = await res.json();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

async function fetchData() {
  await apiCall();
  xyz();
}

function xyz(){
    const ques = document.getElementById("ques");
    const ansBtn = document.getElementById("ansBtns");
    const nxtBtn = document.getElementById("nxtBtn");
  
    let currentQuesIdx = 0;
    let score = 0;
  
    function strt() {
      currentQuesIdx = 0;
      score = 0;
      nxtBtn.innerHTML = "Next";
      showQues();
    }
    function showQues() {
      resetState();
      let currQues = questions[currentQuesIdx];
      let quesNum = currentQuesIdx + 1;
      ques.innerHTML = quesNum + " . " + currQues.question;
  
      currQues.options.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if (option === currQues.answer) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAns);
    });

}
  
    function resetState() {
      nxtBtn.style.display = "none";
      while (ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
      }
    }
  
    function selectAns(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(ansBtn.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nxtBtn.style.display = "block";
    }
  
    nxtBtn.addEventListener("click", () => {
      if (currentQuesIdx < questions.length) {
        handleNxtBtn();
      } else {
        strt();
      }
    });
  
    function handleNxtBtn() {
      currentQuesIdx++;
      if (currentQuesIdx < questions.length) {
        showQues();
      } else {
        showScore();
      }
    }
  
    function showScore() {
      resetState();
      ques.innerHTML = `You scored ${score} out of ${questions.length}!`;
      nxtBtn.innerHTML = "Play Again";
      nxtBtn.style.display = "block";
    }
  
    strt();
}

fetchData();
