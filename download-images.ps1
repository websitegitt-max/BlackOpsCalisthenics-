# Download demo images for the gym template.
# Run this file in PowerShell from the gym-website folder.
# The URLs below come from Wikimedia Commons source pages listed in IMAGE-SOURCES.txt.

$ErrorActionPreference = "Stop"
$imgDir = Join-Path $PSScriptRoot "images"
New-Item -ItemType Directory -Force -Path $imgDir | Out-Null

$images = @{
  "hero.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/This_gym_room_showcases_various_workout_machines.jpg?width=1400"
  "gym1.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/This_gym_room_showcases_various_workout_machines.jpg?width=1400"
  "gym2.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Free_weights_in_a_gym.jpg?width=1200"
  "gym3.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Treadmills_at_gym.jpg?width=1200"
  "trainer1.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/A_coach_observes_an_athlete_performing_a_weightlifting_exercise.jpg?width=1200"
  "trainer2.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Strong_woman_lifting_weights_in_a_gym_focused_on_fitness_and_strength_training.jpg?width=1200"
  "trainer3.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Woman_lifting_dumbbells_in_a_modern_gym_during_a_workout_session_focused_on_strength_training_and_fitness.jpg?width=1200"
  "trainer4.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Participants_in_a_fitness_class_engage_in_an_energetic_session%2C_while_one_individual_observes_from_the_side._Equipment_is_set_up_for_various_workouts%2C_enhancing_the_atmosphere.jpg?width=1200"
  "program-strength.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Strong_woman_lifting_weights_in_a_gym_focused_on_fitness_and_strength_training.jpg?width=1200"
  "program-weightloss.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/A_woman_is_focused_on_starting_her_cardio_workout_on_a_treadmill_at_a_gym.jpg?width=1200"
  "program-muscle.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Fit_young_man_doing_deadlift_exercise_in_gym.jpg?width=1200"
  "program-personal.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/A_coach_observes_an_athlete_performing_a_weightlifting_exercise.jpg?width=1200"
  "program-functional.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Participants_in_a_fitness_class_engage_in_an_energetic_session%2C_while_one_individual_observes_from_the_side._Equipment_is_set_up_for_various_workouts%2C_enhancing_the_atmosphere.jpg?width=1200"
  "program-cardio.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Treadmills_at_gym.jpg?width=1200"
  "program-group.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Participants_in_a_fitness_class_engage_in_an_energetic_session%2C_while_one_individual_observes_from_the_side._Equipment_is_set_up_for_various_workouts%2C_enhancing_the_atmosphere.jpg?width=1200"
  "program-transformation.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Woman_lifting_dumbbells_in_a_modern_gym_during_a_workout_session_focused_on_strength_training_and_fitness.jpg?width=1200"
  "gallery1.jpg" = "WhatsApp Image 2026-10-03 at 9.45.02 PM.jpeg"
  "gallery2.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Dumbells_and_free_weights_in_a_gym.jpg?width=1200"
  "gallery3.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Woman_lifting_dumbbells_in_a_modern_gym_during_a_workout_session_focused_on_strength_training_and_fitness.jpg?width=1200"
  "gallery4.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/A_woman_is_focused_on_starting_her_cardio_workout_on_a_treadmill_at_a_gym.jpg?width=1200"
  "gallery5.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Participants_in_a_fitness_class_engage_in_an_energetic_session%2C_while_one_individual_observes_from_the_side._Equipment_is_set_up_for_various_workouts%2C_enhancing_the_atmosphere.jpg?width=1200"
  "cta.jpg" = "https://commons.wikimedia.org/wiki/Special:FilePath/Strong_woman_lifting_weights_in_a_gym_focused_on_fitness_and_strength_training.jpg?width=1400"
}

foreach ($item in $images.GetEnumerator()) {
  $destination = Join-Path $imgDir $item.Key
  Write-Host "Downloading $($item.Key)..."
  Invoke-WebRequest -Uri $item.Value -OutFile $destination
}

Write-Host ""
Write-Host "Done. Demo images are now in the images folder."
Write-Host "Review IMAGE-SOURCES.txt and keep the required attribution."
