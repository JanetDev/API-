var btnCargar = document.getElementById('cargar');

function cargarContenidoAjax(){
    //crear XMLHTTPREQUEST
    var xhr = XMLHttpRequest();

    //abrimos la conexion
    xhr.open("GET", "texto_prueba.txt", true);
    xhr.onreadystatechange = function(){
        console.log(xhr.readyState);
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log("Se envio correctamente");
            var contenido = document.getElementById('contenido');
            contenido.innerHTML = xhr.responseText;
        }
    }

    xhr.send();

}

btnCargar.addEventListener('click', cargarContenidoAjax);