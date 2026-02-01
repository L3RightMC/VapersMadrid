document.addEventListener("DOMContentLoaded", () => { 
  console.log("Chat, he cargado");

  // --- DETECCIÓN DE DISPOSITIVO ---
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let deviceInfo = { modelo: "Desconocido", sistemaOperativo: "Desconocido", navegador: "Desconocido" };

  if (/windows nt/i.test(userAgent)) deviceInfo.modelo = "PC Windows";
  else if (/macintosh|mac os x/i.test(userAgent)) deviceInfo.modelo = "Mac";
  else if (/linux/i.test(userAgent)) deviceInfo.modelo = "PC Linux";

  if (/windows nt/i.test(userAgent)) deviceInfo.sistemaOperativo = "Windows";
  else if (/macintosh|mac os x/i.test(userAgent)) deviceInfo.sistemaOperativo = "macOS";
  else if (/linux/i.test(userAgent)) deviceInfo.sistemaOperativo = "Linux";
  else if (/android/i.test(userAgent)) deviceInfo.sistemaOperativo = "Android";
  else if (/iPad|iPhone|iPod/.test(userAgent)) deviceInfo.sistemaOperativo = "iOS";

  if (/chrome|crios/i.test(userAgent)) deviceInfo.navegador = "Chrome";
  else if (/firefox|fxios/i.test(userAgent)) deviceInfo.navegador = "Firefox";
  else if (/safari/i.test(userAgent)) deviceInfo.navegador = "Safari";
  else if (/edg/i.test(userAgent)) deviceInfo.navegador = "Edge";
  else if (/opr/i.test(userAgent)) deviceInfo.navegador = "Opera";

  if (/android/i.test(userAgent)) {
    const match = userAgent.match(/Android\s+[\d.]+;\s*(.+?)\s*Build/i);
    if (match) deviceInfo.modelo = match[1];
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    const match = userAgent.match(/\((iPhone|iPad|iPod);.*?OS ([\d_]+)/i);
    if (match) deviceInfo.modelo = `${match[1]} iOS ${match[2].replace(/_/g, ".")}`;
  }

  console.log("Info del dispositivo:", deviceInfo);

  // --- VIDEO AUTOPLAY ---
  const video = document.querySelector(".video-fondo");
  if (video) {
    video.play().catch(() => {
      document.addEventListener("touchstart", () => video.play(), { once: true });
      document.addEventListener("click", () => video.play(), { once: true });
    });
  }

  // --- ALERTA PARA MÓVILES ---
  if (window.innerWidth <= 430) {
    alert("Pantalla móvil detectada! La web puede tener bugs dependiendo navegador. Se recomienda usar Chrome o Firefox. Pulsa Aceptar");
  }

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
        razzbar60: { 
          contenedor: '.productos-razzbar60', 
          clase: 'product-razzbar60', 
          data: 'ventana4',
          ventanaClase: 'ventana-4',
          descripcionClase: 'descripcion-razzbar60',
          imgClase: 'razzbar60-img',
          descClase: 'desc-razzbar60',
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
      
      const estaAgotado = producto.cantidad === 0;
      
      if (estaAgotado) {
        button.classList.add('producto-agotado');
        button.disabled = true;
      }
      
      button.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        ${estaAgotado ? '<div class="badge-agotado">AGOTADO</div>' : ''}
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
        <button class="cerrar-ventana">⛌</button>
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

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-bang, .product-razzbar30, .product-razzbar60, .product-vopk, .product-waspe");
    if (!btn) return;

    let num, ventana;

    if (btn.classList.contains("product-bang")) {
      num = btn.getAttribute("data-ventana")?.trim();
      ventana = document.querySelector(`.ventana[data-ventana="${num}"]`);
      console.log("clicked (BANG) num:", num, "ventana:", ventana);
    } 
    else if (btn.classList.contains("product-razzbar30")) {
      num = btn.getAttribute("data-ventana")?.trim();
      ventana = document.querySelector(`.ventana-1[data-ventana="${num}"]`);
      console.log("clicked (RAZZ30) num:", num, "ventana:", ventana);
    }
    else if (btn.classList.contains("product-razzbar60")) {
      num = btn.getAttribute("data-ventana4")?.trim();
      ventana = document.querySelector(`.ventana-4[data-ventana4="${num}"]`);
      console.log("clicked (RAZZ60) num:", num, "ventana:", ventana);
    }
    else if (btn.classList.contains("product-vopk")) {
      num = btn.getAttribute("data-ventana2")?.trim();
      ventana = document.querySelector(`.ventana-2[data-ventana2="${num}"]`);
      console.log("clicked (VOPK) num:", num, "ventana:", ventana);
    }
    else if (btn.classList.contains("product-waspe")) {
      num = btn.getAttribute("data-ventana3")?.trim();
      ventana = document.querySelector(`.ventana-3[data-ventana3="${num}"]`);
      console.log("clicked (WASPE) num:", num, "ventana:", ventana);
    }

    if (!ventana) {
      console.warn("No se encontró la ventana para:", num);
      return;
    }

    ventana.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  // --- VENTANA DE CONTACTO (CON DELEGACIÓN) ---
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".elegir-contacto, .elegir-contacto-1")) return;

    const btn = e.target.closest(".elegir-contacto, .elegir-contacto-1");
    const ventana = btn.closest(".ventana, .ventana-1, .ventana-2, .ventana-3, .ventana-4");
    if (!ventana) return;

    const contactoVentana = document.querySelector(".contacto-elegir, .contacto-elegir-1");
    if (!contactoVentana) return;

    contactoVentana.classList.add("show");
    document.body.style.overflow = "hidden";

    const h2 = ventana.querySelector("h2");

    // WhatsApp
    const linkWA = contactoVentana.querySelector(".comprar-whatsapp");
    if (h2 && linkWA) {
      const telefono = "34640836396";
      linkWA.onclick = () => {
        const texto = encodeURIComponent(`Hola! Me interesa el producto "${h2.textContent.trim()}". Está disponible?`);
        window.open(`https://wa.me/${telefono}?text=${texto}`, "_blank");
      };
    }

    // Instagram
    const btnIG = contactoVentana.querySelector(".comprar-instagram");
    if (h2 && btnIG) {
      btnIG.replaceWith(btnIG.cloneNode(true));
      const newBtnIG = contactoVentana.querySelector(".comprar-instagram");

      newBtnIG.addEventListener("click", () => {
        const texto = `Hola! Me interesa el producto "${h2.textContent.trim()}". Está disponible?`;
        
        let alertMsg = "Texto copiado al portapapeles. Pégalo en Instagram.";
        if (!(navigator.clipboard && navigator.clipboard.writeText)) {
          alertMsg = "Tu navegador no soporta copiar al portapapeles. Pega el mensaje manualmente en Instagram.";
        }
        
        alert(alertMsg);
        
        setTimeout(() => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).catch(() => {});
          }
          window.open("https://www.instagram.com/vapersmadridd___/", "_blank");
        }, 5000);
      });
    }
  });

  // --- CERRAR VENTANAS (CON DELEGACIÓN) ---
  document.addEventListener("click", (e) => {
    // Botón cerrar
    if (e.target.closest(".cerrar-ventana, .cerrar-ventana-con")) {
      const ventana = e.target.closest(".ventana, .ventana-1, .ventana-2, .ventana-3, .ventana-4, .contacto-elegir");
      if (ventana) {
        ventana.classList.remove("show");
        document.body.style.overflow = "";
      }
    }

    // Click fuera de la ventana
    if (e.target.classList.contains("ventana") || 
        e.target.classList.contains("ventana-1") || 
        e.target.classList.contains("ventana-2") || 
        e.target.classList.contains("ventana-3") ||
        e.target.classList.contains("ventana-4")) {
      e.target.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  document.body.classList.add('cargando');

  setTimeout(() => {
    const cargaFondo = document.querySelector('.carga-fondo');
    cargaFondo.classList.add('oculto');

    document.body.classList.remove('cargando');
  }, 2000);


});