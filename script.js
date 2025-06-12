const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const habitsList = document.getElementById("habitsList");
const toggleDark = document.getElementById("darkToggle");
const chartCanvas = document.getElementById("habitChart");

const days = ["M", "T", "W", "T", "F", "S", "S"];
let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  habitsList.innerHTML = "";

  habits.forEach((habit, index) => {
    const habitDiv = document.createElement("div");
    habitDiv.className = "habit";

    const infoDiv = document.createElement("div");
    infoDiv.className = "habit-info";

    const title = document.createElement("div");
    title.className = "habit-header";
    title.innerText = habit.name;

    const daysContainer = document.createElement("div");
    daysContainer.className = "days";

    days.forEach((day, dayIndex) => {
      const dayBox = document.createElement("div");
      dayBox.className = "day";
      dayBox.innerText = day;

      if (habit.days.includes(dayIndex)) {
        dayBox.classList.add("active");
      }

      dayBox.addEventListener("click", () => {
        if (habit.days.includes(dayIndex)) {
          habit.days = habit.days.filter(d => d !== dayIndex);
        } else {
          habit.days.push(dayIndex);
        }
        saveHabits();
        renderHabits();
        updateChart();
      });

      daysContainer.appendChild(dayBox);
    });

    infoDiv.appendChild(title);
    infoDiv.appendChild(daysContainer);
    habitDiv.appendChild(infoDiv);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
      updateChart();
    };

    habitDiv.appendChild(deleteBtn);
    habitsList.appendChild(habitDiv);
  });
}

addHabitBtn.addEventListener("click", () => {
  const name = habitInput.value.trim();
  if (!name) return;

  habits.push({ name, days: [] });
  habitInput.value = "";
  saveHabits();
  renderHabits();
  updateChart();
});

toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDark.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

let chart;
function updateChart() {
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];

  habits.forEach(habit => {
    habit.days.forEach(day => {
      dayCounts[day]++;
    });
  });

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Habits Completed',
        data: dayCounts,
        backgroundColor: '#1f8ef1',
        borderRadius: 6
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });
}

renderHabits();
updateChart();
