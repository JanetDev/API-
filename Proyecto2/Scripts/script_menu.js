//Estado del carrito 
var carritoVisible = false;

//Espera a qie la página cargue para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}
//Iniciacion de variables para las funciones para cada boton esencial
function ready() {

    //Programación del boton eliminar
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //Boton de sumar, suma la cantidad de los productos, o del producto que aumente su cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //Boton para restar
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agregar productos al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton_1');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Boton de pagar
    document.getElementsByClassName('boton-2')[0].addEventListener('click', pagarClicked)
}

//Se obtienen los elementos de nombre, precio e imagen del producto seleccionado a partir de su class name 
function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-i')[0].innerText;
    var precio = item.getElementsByClassName('precio-p')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    //Se restringe que un producto este mas de una vez en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("Este producto ya se encuentra en el carrito de compras (๑˘︶˘๑) ¡Elige otro!");
            return;
        }
    }

    //Formato del diseño de como se van poniendo los productos en el carrito
    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Se llama a la funcion para poder eliminar el producto
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Se le da funcionalidad al boton de restar y se llama a su funcion
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    //Se le da funcionalidad al boton de sumar y se llama a su función
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    //Se actualiza el total
    actualizarTotalCarrito();
}

//Funcion para sumar cantidades, se toma el elemento del precio de cantidad, se suma y se actualiza el total
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Funcion para sumar cantidades, se toma el elemento del precio de cantidad, se resta y se actualiza el total, solo si el numero de producto es igual o mayor a uno 

function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Funcion para eliminar producto
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Se actualiza
    actualizarTotalCarrito();

    //Se llama a esta funcion para que si está vacio el carrito, que este oculto
    ocultarCarrito();
}

//Función que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualización del carrito
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //Se recorre en cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //se reemplaza el valor y se imprime el nuevo valor con un nuevo formato
        var precio = parseFloat(precioElemento.innerText.replace('$', ''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        //se imprime en la consola el precio
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad); //se calcula el precio, sumando el total que se lleva más
                                            //el prrecio del producto multiplicado por su cantidad o las veces
                                            //que aparece en el carrito
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('totaltotal')[0].innerText = '$' + total.toLocaleString("es") + ",00";

}

//Al pagar, la pagina manda una alerta de que ya esta lista la compra y el carrito se vacia
function pagarClicked() {
    alert("¡Tu orden está lista! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
    //Elimino todos los elmentos del carrito, se actualiza el carrito a 0 y se oculta
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}






