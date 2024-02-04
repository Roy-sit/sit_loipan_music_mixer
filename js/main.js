document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll('.rounded_box');
  const dropZone = document.getElementById('drop_zone');

  boxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);
  });

  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('drop', drop);

  const activeSounds = new Set();

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

    // Play the sound when dropped
    playAudio(audioSrc);
    activeSounds.add(audioSrc);

    // Remove the dragging class after a delay
    setTimeout(() => {
      document.querySelector(`.rounded_box[data-audio="${audioSrc}"]`).classList.remove('dragging');
    }, 100);
  }

  function playAudio(audioSrc) {
    const audioElement = new Audio(audioSrc);
    audioElement.play();

    // Remove the sound from activeSounds when it finishes playing
    audioElement.addEventListener('ended', () => {
      activeSounds.delete(audioSrc);
    });
  }
});
