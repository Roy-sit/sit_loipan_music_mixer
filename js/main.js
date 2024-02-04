document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll('.rounded_box');
  const dropZone = document.getElementById('drop_zone');

  boxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragend', dragEnd);
  });

  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('drop', drop);

  function dragStart(e) {
    const draggedBox = e.target;
    e.dataTransfer.setData('text/plain', draggedBox.dataset.audio);
  }

  function dragEnd(e) {
    const draggedBox = e.target;
    draggedBox.classList.remove('dragging');
  }

  function dragOver(e) {
    e.preventDefault();
    dropZone.classList.add('hover');
  }

  function drop(e) {
    e.preventDefault();
    const audioSrc = e.dataTransfer.getData('text/plain');
    playAudio(audioSrc);
    const draggedBox = document.querySelector('.rounded_box.dragging');
    draggedBox.classList.add('dropped');
    dropZone.classList.remove('hover');
    setTimeout(() => {
      draggedBox.classList.remove('dropped');
    }, 1000); // Adjust the duration based on the animation duration
  }

  function playAudio(audioSrc) {
    const audioElement = new Audio(audioSrc);
    audioElement.play();
  }
});
