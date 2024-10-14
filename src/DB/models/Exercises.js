import mongoose, {Schema} from "mongoose";
/* {
      "name": "3/4 Sit-Up",
      "force": "pull",
      "level": "beginner",
      "mechanic": "compound",
      "equipment": "body only",
      "primaryMuscles": [
        "abdominals"
      ],
      "secondaryMuscles": [],
      "instructions": [
        "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
        "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
        "Flex your hips and spine to raise your torso toward your knees.",
        "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.",
        "Repeat for the recommended amount of repetitions."
      ],
      "category": "strength",
      "id": "1",
      "photo": [
        "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/3_4_Sit-Up/images/0.jpg",
        "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/3_4_Sit-Up/images/1.jpg"
      ]
    }, */
const exercisesSchema = new Schema(
    {
        name: String,
        force: String,
        level: String,
        mechanic: String,
        equipment: String,
        primaryMuscles: [String],
        secondaryMuscles: [String],
        instructions: [String],
        category: String,
        photo: [String],
    },
    {
        timestamps: true,
    }
);

const Exercises = mongoose.models?.Exercises || mongoose.model("Exercises", exercisesSchema);

export default Exercises;
