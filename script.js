const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const habitsList = document.getElementById('habitsList');
const addHabitBtn = document.getElementById('addHabit');
const habitInput = document.getElementById('habitInput');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function renderHabits() {
  habitsList.innerHTML = '';
  habits.forEach((habit, index) => {
    const habitDiv = document.createElement('div');
    habitDiv.className = 'habit';

    const header = document.createElement('div');
    header.className = 'habit-header';
    header.innerText = habit.name;

    const daysContainer = document.createElement('div');
    daysContainer.className = 'days';

    days.forEach((day, dayIndex) => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.innerText = day;
      if (habit.completed.includes(dayIndex)) {
        dayDiv.classList.add('active');
      }

      dayDiv.addEventListener('click', () => {
        toggleDay(index, dayIndex);
      });

      daysContainer.appendChild(dayDiv);
    });

    habitDiv.appendChild(header);
    habitDiv.appendChild(daysContainer);
    habitsList.appendChild(habitDiv);
  });
}

function addHabit() {
  const habitName = habitInput.value.trim();
  if (habitName === '') return;

  habits.push({ name: habitName, completed: [] });
  habitInput.value = '';
  saveHabits();
  renderHabits();
}

function toggleDay(habitIndex, dayIndex) {
  const habit = habits[habitIndex];
  if (habit.completed.includes(dayIndex)) {
    habit.completed = habit.completed.filter(d => d !== dayIndex);
  } else {
    habit.completed.push(dayIndex);
  }
  saveHabits();
  renderHabits();
}

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

addHabitBtn.addEventListener('click', addHabit);

renderHabits();
