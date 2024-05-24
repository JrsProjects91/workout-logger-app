import { workouts, curDateWorkout, newWorkOutObject } from "./data";

export function createDiv(divText, divClass, divID, divInnerHTML) {
  const div = document.createElement("div");
  div.className = divClass;
  div.id = divID;
  if (divInnerHTML) {
    div.innerHTML = divInnerHTML;
  }
  if (divText) {
    div.textContent = divText;
  }
  return div;
}

export function getCurDate() {
  const date = new Date(); // Create a new Date object with the current date and time
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
}

export function getCurWorkouts(date) {
  curDateWorkout.length = 0;
  workouts.forEach((workout) => {
    if (workout.date === date) {
      curDateWorkout.push(workout);
    }
  });
}

export function addWorkout() {
  getCurWorkouts(getCurDate());
  const newWorkout = structuredClone(newWorkOutObject);
  if (curDateWorkout.length > 0) {
    let date = document.querySelector(".date").textContent;
    workouts.forEach((workout) => {
      if (workout.date === date) {
        workout.exercises.push(newWorkout[0].exercises[0]);
      }
    });
  } else {
    workouts.push(newWorkout[0]);
    // add new full object with date and type to workout array
  }
  console.log(workouts);
}
