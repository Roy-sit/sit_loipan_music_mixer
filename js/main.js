document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll('.rounded_box');
  const dropZone = document.getElementById('drop_zone');

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

   
    playAudio(audioSrc);

    // Remove the hover class after a delay
    setTimeout(() => {
      dropZone.classList.remove('hover');
    }, 100);
  }

  function playAudio(audioSrc) {
    const audioElement = new Audio(audioSrc);
    audioElement.play();
  }
});
