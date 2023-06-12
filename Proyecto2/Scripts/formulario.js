//Alerta formulario al enviar datos
document.querySelector('form')
.addEventListener('submit', e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )

    alert("Tus datos han sido enviados")
})
document.addEventListener('DOMContentLoaded', function(){
    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function() {
      formulario.reset();
    });
  });