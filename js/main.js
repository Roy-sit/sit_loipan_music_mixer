document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll('.rounded_box');
  const dropZone = document.getElementById('drop_zone');
  let audioElement = null; // AudioElement variable
  let isPaused = false; // Check if audio is paused

  boxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);
  });

  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('drop', drop);

  function dragStart(e) {
    const draggedBox = e.target;
    e.dataTransfer.setData('text/plain', draggedBox.dataset.audio);
  }

  
  function dragOver(e) {
    e.preventDefault();
    dropZone.classList.add('hover');
  }

  function drop(e) {
    e.preventDefault();
    const audioSrc = e.dataTransfer.getData('text/plain');

    if (audioElement) { // Check if audio is already playing
      if (!isPaused) { // Check if audio is not paused
        audioElement.pause(); // Pause the audio when playing
      }
    }

    playAudio(audioSrc);

    // Remove the hover class after a delay
    setTimeout(() => {
      dropZone.classList.remove('hover');
    }, 100);
  }

  function playAudio(audioSrc) {
    audioElement = new Audio(audioSrc); // AudioElement variable
    audioElement.play();

    // Reset isPaused
    isPaused = false;

    // Event listener to reset isPaused flag
    audioElement.addEventListener('ended', function() {
      isPaused = true;
    });
  }

  // Function to pause the audio
  function pauseAudio() {
    if (audioElement) {
      audioElement.pause();
      isPaused = true;
    }
  }

  // Function to stop the audio
  function stopAudio() {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset audio playback to start
      isPaused = false;
    }
  }

  // Function to resume the audio
  function resumeAudio() {
    if (audioElement && isPaused) {
      audioElement.play();
      isPaused = false;
    }
  }

  // Event listener for PAUSE button
  document.getElementById('pause_btn').addEventListener('click', pauseAudio);

  // Event listener for STOP button
  document.getElementById('stop_btn').addEventListener('click', stopAudio);

  // Event listener for RESUME button
  document.getElementById('resume_btn').addEventListener('click', resumeAudio);
});
