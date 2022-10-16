const h2 = document.querySelector("h2");
const form = document.querySelector("form");
const categoryInput = document.querySelector("input");
const button = document.querySelector("button");
const div = document.querySelector(".absalute");
const limitInput = document.querySelector(".limit");

const createQuestionsApp = (category, limit) => {
  const promise = fetch(
    `https://quizapi.io/api/v1/questions?apiKey=XEtdSWA2te2Uj1Isz2vMQLqC8ScgrSgRxUd3Gvi8&limit=${limit}&category=${category}`
  );

  const showQuestions = (question) => {
    h2.innerHTML = `
      ${question.question}
    `;

    form.innerHTML = `
      <label>
      <input type="radio" name="answer" value="answer_a_correct" style="background-color: black;"  />
      ${question.answers.answer_a}
      </label>
      <label>
      <input type="radio" name="answer" value="answer_b_correct" />
      ${question.answers.answer_b}
      </label>
      <label><br/>
      <input type="radio" name="answer" value="answer_c_correct" />
      ${question.answers.answer_c}
      </label>
      <label>
      <input type="radio" name="answer" value="answer_d_correct" />
      ${question.answers.answer_d}
      </label>
      <button type="submit">Next question</button>
  `;
  };

  promise
    .then((response) => {
      if (response.ok === false) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((questions) => {
      let currentQuestionIndex = 0;

      let wrongAnswer = 0;
      let rightAnswer = 0;

      showQuestions(questions[currentQuestionIndex]);

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll("input");

        inputs.forEach((input) => {
          if (!input.checked) return;

          if (questions[0].correct_answers[input.value] === "true")
            rightAnswer++;
          else wrongAnswer++;

          currentQuestionIndex++;

          if (currentQuestionIndex === limit) {
            alert(`Wrong Answers: ${wrongAnswer}`);
            alert(`Right Answers: ${rightAnswer}`);

            window.location.reload();

            return;
          }

          showQuestions(questions[currentQuestionIndex]);
        });
      });
    })
    .catch((error) => {
      console.log(error, "Error");
    });
};

button.addEventListener("click", () => {
  const limit = Number(limitInput.value);

  if (!limit || limit < 1) {
    alert("Invalid limit");

    return;
  }

  createQuestionsApp(categoryInput.value, limit);

  div.style.display = "block";
});
