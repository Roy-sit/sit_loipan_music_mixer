document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll('.top_boxes');

  boxes.forEach(box => {
    box.addEventListener('mousedown', dragStart);
    box.addEventListener('mouseup', dragEnd);
  });

  function dragStart(e) {
    e.preventDefault();
    const draggedBox = e.target;
    draggedBox.classList.add('dragging');
    draggedBox.classList.add('rotating');

    let offsetX = e.clientX - draggedBox.getBoundingClientRect().left;
    let offsetY = e.clientY - draggedBox.getBoundingClientRect().top;

    function moveBox(e) {
      draggedBox.style.position = 'absolute';
      draggedBox.style.zIndex = '1000';
      draggedBox.style.left = e.clientX - offsetX + 'px';
      draggedBox.style.top = e.clientY - offsetY + 'px';
    }

    function dragEnd() {
      draggedBox.classList.remove('dragging');
      draggedBox.classList.remove('rotating');
      draggedBox.style.position = 'static';
      draggedBox.style.zIndex = 'auto';
      document.removeEventListener('mousemove', moveBox);
      document.removeEventListener('mouseup', dragEnd);
    }

    document.addEventListener('mousemove', moveBox);
    document.addEventListener('mouseup', dragEnd);
  }
});
