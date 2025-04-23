document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de los sliders principales
    var swiper1 = new Swiper(".mySwiper-1", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: document.querySelectorAll('.mySwiper-1 .swiper-slide').length > 1, // Deshabilitar loop si no hay suficientes diapositivas
        pagination:{
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    // Inicialización de los sliders de productos
    var swiper2 = new Swiper(".mySwiper-2", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: document.querySelectorAll('.mySwiper-2 .swiper-slide').length > 3, // Deshabilitar loop si no hay suficientes diapositivas
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            950: {
                slidesPerView: Math.min(3, document.querySelectorAll('.mySwiper-2 .swiper-slide').length), // Ajustar slidesPerView dinámicamente
            }
        }
    });

    // Lógica para cambiar entre pestañas de productos
    let tabInputs = document.querySelectorAll('.tabInput');

    tabInputs.forEach(function(input){
        input.addEventListener('change', function(){
            let id = input.value; // correcto
            let thisSwiper = document.getElementById('swiper' + id);

            if (thisSwiper) {
                if (!thisSwiper.swiper) {
                    console.log(`Inicializando Swiper para la pestaña ${id}`); // Depuración
                    new Swiper(`#swiper${id}`, {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        loop: document.querySelectorAll(`#swiper${id} .swiper-slide`).length > 3, // Deshabilitar loop si no hay suficientes diapositivas
                        loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        breakpoints: {
                            0: {
                                slidesPerView: 1,
                            },
                            520: {
                                slidesPerView: 2,
                            },
                            950: {
                                slidesPerView: Math.min(3, document.querySelectorAll(`#swiper${id} .swiper-slide`).length),
                            }
                        }
                    });
                } else {
                    console.log(`Actualizando Swiper para la pestaña ${id}`); // Depuración
                    thisSwiper.swiper.update();
                }

                // Mostrar solo el slider correspondiente
                document.querySelectorAll('.mySwiper-2').forEach(function(swiper) {
                    swiper.style.display = 'none';
                });
                thisSwiper.style.display = 'block';
            } else {
                console.error(`Swiper no encontrado para la pestaña ${id}`); // Depuración
            }
        });
    });

    // Mostrar solo el primer slider al cargar la página
    document.querySelectorAll('.mySwiper-2').forEach(function(swiper, index) {
        swiper.style.display = index === 0 ? 'block' : 'none';
    });

    // Desplazamiento suave para los enlaces del navbar
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Botón "Volver arriba" para desplazarse al inicio de la página
    const botonVolverArriba = document.createElement('button');
    botonVolverArriba.textContent = '↑';
    botonVolverArriba.id = 'volverArriba';
    botonVolverArriba.style.display = 'none';
    botonVolverArriba.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(botonVolverArriba);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            botonVolverArriba.style.display = 'block';
        } else {
            botonVolverArriba.style.display = 'none';
        }
    });

    // Lógica del carrito de compras
    const cart = [];
    const generateInvoiceButton = document.getElementById('generate-invoice');
    const modal = document.getElementById('invoice-modal');
    const closeButton = document.querySelector('.close-button');
    const invoiceItems = document.getElementById('invoice-items');
    const invoiceTotal = document.getElementById('invoice-total');

    // Abrir la ventana modal de la factura
    generateInvoiceButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Limpiar contenido previo
        invoiceItems.innerHTML = '';
        let total = 0;

        // Agregar productos al modal
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', function() {
                cart.splice(index, 1);
                updateInvoice();
            });

            listItem.appendChild(removeButton);
            invoiceItems.appendChild(listItem);
            total += item.price;
        });

        invoiceTotal.textContent = total.toFixed(2);
        modal.style.display = 'block';
    });

    // Cerrar la ventana modal
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Función para actualizar la factura
    function updateInvoice() {
        invoiceItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.classList.add('remove-item');
            removeButton.addEventListener('click', function() {
                cart.splice(index, 1);
                updateInvoice();
            });

            listItem.appendChild(removeButton);
            invoiceItems.appendChild(listItem);
            total += item.price;
        });

        invoiceTotal.textContent = total.toFixed(2);

        // Verificar si el carrito está vacío después de actualizar
        if (cart.length === 0) {
            modal.style.display = 'none';
        }
    }

    // Agregar productos al carrito con confirmación
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            const userConfirmed = confirm(`¿Quieres agregar ${productName} al carrito?`);
            if (userConfirmed) {
                cart.push({ name: productName, price: productPrice });
                alert(`${productName} ha sido agregado al carrito.`);
            } else {
                alert(`${productName} no fue agregado al carrito.`);
            }
        });
    });

    // Lógica para el botón "Finalizar Compra"
    const finalizePurchaseButton = document.getElementById('finalize-purchase');

    finalizePurchaseButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('El carrito está vacío. No puedes finalizar la compra.');
            return;
        }

        alert('Compra finalizada. Puedes pasar a la caja por tu compra o espera en tu mesa que tus productos llegarán pronto.');
        modal.style.display = 'none';
        cart.length = 0; // Vaciar el carrito después de finalizar la compra
        updateInvoice();
    });
});
