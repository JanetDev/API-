const form = document.getElementById('myForm');
const submitBtn = form.querySelector('.submitBtn');

submitBtn.addEventListener('click', function(event) {
  event.preventDefault(); // evita que el formulario se envíe automáticamente

  // Validar los datos del formulario aquí
  if (form.checkValidity()) {
    form.submit(); // envía el formulario si es válido
  } else {
    // Si el formulario no es válido, muestra un mensaje de error o realiza alguna otra acción
    alert('Por favor, ingrese información válida en todos los campos.');
  }
});
