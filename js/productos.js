document.addEventListener("DOMContentLoaded", () => {
    // Cargar el JSON
        // --- CARGAR PRODUCTOS DESDE JSON ---
    fetch('json/productos.json')
        .then(response => response.json())
        .then(datos => {
            // Configuración de cada marca
            const marcas = {
                bang: { 
                    contenedor: '.productos-bang', 
                    clase: 'product-bang', 
                    data: 'ventana',
                    ventanaClase: 'ventana',
                    descripcionClase: 'descripcion-bang',
                    imgClase: 'bang-img',
                    descClase: 'desc-bang',
                    promo: '⚠️SPAM EN IG -2€ DE DESCUENTO⚠️'
                },
                razzbar30: { 
                    contenedor: '.productos-razzbar30', 
                    clase: 'product-razzbar30', 
                    data: 'ventana',
                    ventanaClase: 'ventana-1',
                    descripcionClase: 'descripcion-razzbar30',
                    imgClase: 'razzbar30-img',
                    descClase: 'desc-razzbar30',
                    promo: '⚠️SPAM EN IG -1€ DE DESCUENTO⚠️'
                },
                vopk: { 
                    contenedor: '.productos-vopk', 
                    clase: 'product-vopk', 
                    data: 'ventana2',
                    ventanaClase: 'ventana-2',
                    descripcionClase: 'descripcion-vopk',
                    imgClase: 'vopk-img',
                    descClase: 'desc-vopk',
                    promo: '⚠️PROMO DISPONIBLE⚠️'
                },
                waspe: { 
                    contenedor: '.productos-waspe', 
                    clase: 'product-waspe', 
                    data: 'ventana3',
                    ventanaClase: 'ventana-3',
                    descripcionClase: 'descripcion-waspe',
                    imgClase: 'waspe-img',
                    descClase: 'desc-waspe',
                    promo: '⚠️PROMO DISPONIBLE⚠️'
                }
            };

            // Cargar productos y ventanas de todas las marcas
            for (const [marca, config] of Object.entries(marcas)) {
                if (datos[marca]) {
                    cargarProductos(datos[marca], config.contenedor, config.clase, config.data);
                    crearVentanas(datos[marca], config);
                }
            }
        })
        .catch(error => console.error('Error cargando productos:', error));

    // Función para generar el HTML de los productos
    function cargarProductos(productos, selectorContenedor, claseProducto, dataAtributo) {
        const contenedor = document.querySelector(selectorContenedor);
        if (!contenedor) return;
        contenedor.innerHTML = '';
        
        productos.forEach(producto => {
            const button = document.createElement('button');
            button.className = claseProducto;
            button.dataset[dataAtributo] = producto.id;
            
            button.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <span>${producto.nombre}</span>
                <span>${producto.precio}€</span>
            `;
            
            contenedor.appendChild(button);
        });
    }

    // Función para crear las ventanas emergentes
    function crearVentanas(productos, config) {
        const contenedorVentanas = document.body;
        
        productos.forEach(producto => {
            const ventana = document.createElement('div');
            ventana.className = config.ventanaClase;
            ventana.setAttribute(`data-${config.data}`, producto.id);
            
            ventana.innerHTML = `
                <button class="cerrar-ventana">〤</button>
                <div class="ventana-fondo">
                    <div class="${config.descripcionClase}">
                        <div class="${config.imgClase}">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                        </div>
                        <div class="${config.descClase}">
                            <h2>${producto.nombre}</h2>
                            <p>${producto.descripcion}</p>
                            <p class="precio">Precio: ${producto.precio}€. <span class="precio-s">${config.promo}</span></p>
                            <p>Quedan: <span class="cant">${producto.cantidad}</span></p>
                            <button class="elegir-contacto">COMPRAR Y CONTACTAR</button>
                        </div>
                    </div>
                </div>
            `;
            
            contenedorVentanas.appendChild(ventana);
        });
    }

    // --- VENTANAS DE PRODUCTO (CON DELEGACIÓN DE EVENTOS) ---
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".product-bang, .product-razzbar30, .product-vopk, .product-waspe");
        if (!btn) return;

        let num, ventanaSelector;

        if (btn.classList.contains("product-bang")) {
            num = btn.dataset.ventana;
            ventanaSelector = `.ventana[data-ventana="${num}"]`;
            console.log("clicked (BANG) num:", num);
        } 
        else if (btn.classList.contains("product-razzbar30")) {
            num = btn.dataset.ventana;
            ventanaSelector = `.ventana-1[data-ventana="${num}"]`;
            console.log("clicked (RAZZ) num:", num);
        }
        else if (btn.classList.contains("product-vopk")) {
            num = btn.dataset.ventana2;
            ventanaSelector = `.ventana-2[data-ventana2="${num}"]`;
            console.log("clicked (VOPK) num:", num);
        }
        else if (btn.classList.contains("product-waspe")) {
            num = btn.dataset.ventana3;
            ventanaSelector = `.ventana-3[data-ventana3="${num}"]`;
            console.log("clicked (WASPE) num:", num);
        }

        const ventana = document.querySelector(ventanaSelector);
        if (!ventana) {
            console.warn("No se encontró la ventana para:", num);
            return;
        }

        ventana.classList.add("show");
        document.body.style.overflow = "hidden";
    });

    // --- CERRAR VENTANAS (CON DELEGACIÓN) ---
    document.addEventListener("click", (e) => {
        // Botón cerrar
        if (e.target.closest(".cerrar-ventana, .cerrar-ventana-con")) {
            const ventana = e.target.closest(".ventana, .ventana-1, .ventana-2, .ventana-3, .contacto-elegir");
            if (ventana) {
                ventana.classList.remove("show");
                document.body.style.overflow = "";
            }
        }

        // Click fuera de la ventana
        if (e.target.classList.contains("ventana") || 
            e.target.classList.contains("ventana-1") || 
            e.target.classList.contains("ventana-2") || 
            e.target.classList.contains("ventana-3")) {
            e.target.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    // --- VENTANA DE CONTACTO (CON DELEGACIÓN) ---
   
});