document.addEventListener('DOMContentLoaded', function() {
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
});
