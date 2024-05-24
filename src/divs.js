import { addWorkout, createDiv, getCurDate, getCurWorkouts } from "./functions";
import { workouts, curDateWorkout, newWorkOutObject } from "./data";

// const workoutDate = createDiv(workout.date, "workout-date", "workout-date");
const mainContainer = document.querySelector(".main-container");
const editButtonsContainer = document.querySelector(".edit-buttons-container");
const mainWorkoutContainer = document.querySelector(".main-workout-container");
let view = "all";
let isEditable = false;
let curIndex = 0;

function setEditableStatus() {
  if (view === "all") {
    isEditable = false;
  } else {
    isEditable = true;
  }
}

export function displayWorkouts(workoutArray) {
  // Clear the main container
  view = "all";
  setEditableStatus();
  mainContainer.innerHTML = "";

  // Display each workout
  workoutArray.forEach((workout, index) => {
    displaySingleWorkout(workout, index, mainContainer);
  });
}

function displaySingleWorkout(workout, index, mainContainer) {
  // Create and append date and workout type
  setEditableStatus();
  const dateContainer = createDiv(workout.date, "date", index);
  const workoutTypeContainer = createDiv(workout.type, "workout-type", index);
  mainContainer.appendChild(dateContainer);
  mainContainer.appendChild(workoutTypeContainer);

  // Create and append exercises
  workout.exercises.forEach((exercise, exerciseIndex) => {
    const workoutContainer = createDiv("", "workout-container", exerciseIndex);
    const exerciseName = createDiv(
      exercise.name,
      "workout-container-top",
      exerciseIndex,
    );

    workoutContainer.appendChild(exerciseName);

    // Create and append sets
    const setsContainer = createDiv("", "sets-container", exerciseIndex);
    exercise.sets.forEach((set, setIndex) => {
      const setContainer = createSetContainer(
        set,
        setIndex,
        exercise,
        exerciseName,
      );
      setsContainer.appendChild(setContainer);
    });

    workoutContainer.appendChild(setsContainer);
    workoutContainer.addEventListener("click", (e) => {
      console.log(e.currentTarget.id);
      displayExercise(
        curDateWorkout[0].exercises[e.currentTarget.id],
        e.currentTarget.id,
      );
    });
    mainWorkoutContainer.appendChild(workoutContainer);
    mainContainer.appendChild(mainWorkoutContainer);
  });
  editButtonsContainer.innerHTML = "";
  addEditButtons();
}

function createSetContainer(set, setIndex) {
  const setContainer = createDiv("", "set-container-bottom", setIndex);
  const curSetElement = createDiv(`Set ${setIndex + 1} `, "", setIndex);
  const curRepElement = createDiv(`Reps `, "", setIndex);
  const curRepValue = createDiv(`${set.reps}`, "", setIndex);
  const curWeightElement = createDiv("Weight ", "", setIndex);
  const curWeightValue = createDiv(`${set.weight}`, "", setIndex);

  if (isEditable) {
    curRepValue.contentEditable = "true";
    curWeightValue.contentEditable = "true";
    addEditableListeners(curRepValue, set, "reps");
    addEditableListeners(curWeightValue, set, "weight");
  }

  // Append elements to set container
  setContainer.appendChild(curSetElement);
  setContainer.appendChild(curRepElement);
  setContainer.appendChild(curRepValue);
  setContainer.appendChild(curWeightElement);
  setContainer.appendChild(curWeightValue);

  return setContainer;
}

function addEditableListeners(element, set, property) {
  element.addEventListener("input", () => {
    set[property] = element.textContent;
  });
}

export function displayExercise(exercise, currentIndex) {
  // Clear the container
  view = "single";
  setEditableStatus();

  mainContainer.innerHTML = "";
  const dateContainer = createDiv(curDateWorkout[0].date, "date", 0);
  const workoutTypeContainer = createDiv(
    curDateWorkout[0].type,
    "workout-type",
    0,
  );

  mainContainer.appendChild(dateContainer);
  mainContainer.appendChild(workoutTypeContainer);

  // Create the exercise container
  const exerciseContainer = createDiv("", "workout-container");
  const exerciseName = createDiv(exercise.name, "");
  if (isEditable) {
    exerciseName.contentEditable = "true";
    exerciseName.addEventListener("input", () => {
      exercise.name = exerciseName.textContent;
    });
  }
  // Create and append sets
  const setsContainer = createDiv("", "sets-container");
  exercise.sets.forEach((set, setIndex) => {
    const setContainer = createSetContainer(set, setIndex);
    setsContainer.appendChild(setContainer);
  });

  // Append the exercise name and sets to the exercise container
  exerciseContainer.appendChild(exerciseName);
  exerciseContainer.appendChild(setsContainer);

  // Append the exercise container to the main container
  mainContainer.appendChild(exerciseContainer);
  addEditButtons(currentIndex, exercise);
}

function addEditButtons(index, exercise) {
  if (isEditable) {
    addBackButton();
    addSetButton(index);
    deleteLastSetButton(index);
    deleteWorkoutButton(index, exercise);
  } else {
    addWorkoutButton(curDateWorkout[0].exercises.length);
  }
  mainContainer.appendChild(editButtonsContainer);
}

function addBackButton() {
  editButtonsContainer.innerHTML = "";
  const backButton = createDiv("Back", "back-button");
  backButton.addEventListener("click", () => {
    mainWorkoutContainer.innerHTML = "";
    displayWorkouts(curDateWorkout);
  });
  editButtonsContainer.appendChild(backButton);
}

function addSetButton(index) {
  const addSetButton = createDiv("Add Set", "back-button");
  addSetButton.addEventListener("click", () => {
    mainWorkoutContainer.innerHTML = "";
    const newSet = {
      reps: 0,
      weight: 0,
    };
    curDateWorkout[0].exercises[index].sets.push(newSet);
    displayExercise(curDateWorkout[0].exercises[index], index);
  });
  editButtonsContainer.appendChild(addSetButton);
}

function deleteLastSetButton(index) {
  const deleteLastSetButton = createDiv("Delete Last Set", "back-button");
  deleteLastSetButton.addEventListener("click", () => {
    mainWorkoutContainer.innerHTML = "";
    curDateWorkout[0].exercises[index].sets.pop();
    displayExercise(curDateWorkout[0].exercises[index], index);
  });
  editButtonsContainer.appendChild(deleteLastSetButton);
}

function addWorkoutButton(index) {
  const addWorkoutButton = createDiv("Add Workout", "back-button");
  addWorkoutButton.addEventListener("click", () => {
    mainWorkoutContainer.innerHTML = "";
    addWorkout();
    setEditableStatus();
    displayExercise(curDateWorkout[0].exercises[index], index);
  });
  editButtonsContainer.appendChild(addWorkoutButton);
}

function deleteWorkoutButton(index, exercise) {
  const deleteWorkoutButton = createDiv("Delete Workout", "back-button");
  deleteWorkoutButton.addEventListener("click", () => {
    mainWorkoutContainer.innerHTML = "";
    deleteWorkout(exercise);
    setEditableStatus();
    mainWorkoutContainer.innerHTML = "";
    displayWorkouts(curDateWorkout);
  });
  editButtonsContainer.appendChild(deleteWorkoutButton);
}

function deleteWorkout(exercise) {
  let date = document.querySelector(".date").textContent;
  workouts.forEach((workout) => {
    if (workout.date === date) {
      workout.exercises = workout.exercises.filter(
        (exercises) => exercises != exercise,
      );
    }
  });
}
// Usage: To display a single exercise
// Assuming you have a container element in your HTML with the class 'exercise-display'
