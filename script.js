const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

// Days of the week
const days = ["M", "T", "W", "T", "F", "S", "S"];

// Load habits from localStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function createHabitElement(habit, index) {
  const habitDiv = document.createElement("div");
  habitDiv.className = "habit";

  const nameDiv = document.createElement("div");
  nameDiv.className = "habit-name";
  nameDiv.innerText = habit.name;

  const daysDiv = document.createElement("div");
  daysDiv.className = "days";

  days.forEach((day, dayIndex) => {
    const dayBox = document.createElement("div");
    dayBox.className = "day";
    dayBox.innerText = day;
    
    if (habit.days.includes(dayIndex)) {
      dayBox.classList.add("checked");
    }

    dayBox.addEventListener("click", () => {
      if (habit.days.includes(dayIndex)) {
        habit.days = habit.days.filter(d => d !== dayIndex);
      } else {
        habit.days.push(dayIndex);
      }
      saveHabits();
      renderHabits();
    });

    daysDiv.appendChild(dayBox);
  });

  habitDiv.appendChild(nameDiv);
  habitDiv.appendChild(daysDiv);

  return habitDiv;
}

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    habitList.appendChild(createHabitElement(habit, index));
  });
}

addHabitBtn.addEventListener("click", () => {
  const name = habitInput.value.trim();
  if (name) {
    habits.push({ name, days: [] });
    habitInput.value = "";
    saveHabits();
    renderHabits();
  }
});

renderHabits();
