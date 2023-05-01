document.getElementById('your-image').addEventListener('click', function() {
  
    var modal = document.createElement('div');
    modal.innerHTML = '<img src="your-image.jpg" alt="Your image description">';
  
    // add CSS styles to the modal
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '9999';
  
    // append the modal to the document body
    document.body.appendChild(modal);
  });


