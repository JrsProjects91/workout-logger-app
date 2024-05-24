import { getCurDate } from "./functions";
export let curDateWorkout = [];
export const newWorkOutObject = [
  {
    date: getCurDate(),
    type: "Todays Workout?",
    exercises: [
      {
        name: "Workout Name",
        description: "",
        sets: [
          {
            weight: 0,
            reps: 0,
          },
        ],
      },
    ],
  },
];

//A test to display what data a single workout will need
export let workouts = [
  {
    date: getCurDate(),
    type: "Test Workout 1",
    exercises: [
      {
        name: "Bench Press",
        description: "Flat Bench Press",
        sets: [
          {
            weight: 135,
            reps: 10,
          },
          {
            weight: 135,
            reps: 10,
          },
          {
            weight: 135,
            reps: 10,
          },
        ],
      },
      {
        name: "Chest Fly Machine Cable",
        description: "Flat Bench Press",
        sets: [
          {
            weight: 90,
            reps: 7,
          },
          {
            weight: 90,
            reps: 3,
          },
          {
            weight: 90,
            reps: 9,
          },
          {
            weight: 90,
            reps: 9,
          },
        ],
      },

      // ... other exercises for this date and type
    ],
  },
  // ... other workout days
];
