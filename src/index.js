import { curDateWorkout } from "./data";
import { getCurDate, getCurWorkouts, addWorkout } from "./functions";
import { getWorkouts, displayWorkouts, displayExercise } from "./divs";

getCurWorkouts(getCurDate());
// getWorkouts(curWorkout[0]);

// addWorkout();
displayWorkouts(curDateWorkout);
// displayExercise(curDateWorkout[0].exercises[0]);
console.log(curDateWorkout);
