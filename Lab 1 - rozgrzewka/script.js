const result = document.querySelector(".result");
const addInput = document.querySelector(".add");
const inputSection = document.querySelector(".container");
const showresultBtn = document.querySelector(".count");

let ID = 3;

const count = () => {
  const inputs = document.querySelectorAll(".input");
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  let validCount = 0;

  inputs.forEach((input) => {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      sum += value;
      min = Math.min(min, value);
      max = Math.max(max, value);
      validCount++;
    }
  });

  const average = validCount > 0 ? sum / validCount : 0;

  showResult(sum, average, min, max);
};

const showResult = (sum, average, min, max) => {
  result.innerHTML = `Suma: ${sum}<br>`;
  result.innerHTML += `Średnia: ${average}<br>`;
  result.innerHTML += `Najmniejsza liczba: ${min}<br>`;
  result.innerHTML += `Maksymalna liczba: ${max}`;
  count();
};

const createNewInput = () => {
  const newInput = document.createElement("div");
  newInput.setAttribute("id", `input_${ID}`);
  newInput.innerHTML = `
    <input class="input" type="number" oninput="count()">
    <button type="button" onclick="deleteInput(${ID})" class="delete">Usuń</button>
  `;
  inputSection.appendChild(newInput);
  ID++;

  const newInputElement = newInput.querySelector(".input");
  newInputElement.addEventListener("input", count);
};

const deleteInput = (id) => {
  const inputToDelete = document.getElementById(`input_${id}`);
  inputToDelete.remove();
  count();
};

addInput.addEventListener("click", createNewInput);
showresultBtn.addEventListener("click", showResult);
