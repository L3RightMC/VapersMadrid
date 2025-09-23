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

  // --- VENTANAS DE PRODUCTO ---
  const allProducts = document.querySelectorAll(".product-bang, .product-razzbar, .product-vopk, .product-waspe");
  const cerrarBtns = document.querySelectorAll(".cerrar-ventana, .cerrar-ventana-con");

  allProducts.forEach(btn => {
  btn.addEventListener("click", () => {
    let num, ventana;

    if (btn.classList.contains("product-bang")) {
      num = btn.getAttribute("data-ventana")?.trim();
      ventana = document.querySelector(`.ventana[data-ventana="${num}"]`);
      console.log("clicked (BANG) num:", num, "ventana:", ventana);
    } 
    else if (btn.classList.contains("product-razzbar")) {
      num = btn.getAttribute("data-ventana-1")?.trim();
      ventana = document.querySelector(`.ventana-1[data-ventana-1="${num}"]`);
      console.log("clicked (RAZZ) num:", num, "ventana:", ventana);
    }
    else if (btn.classList.contains("product-vopk")) {
      num = btn.getAttribute("data-ventana-2")?.trim();
      ventana = document.querySelector(`.ventana-2[data-ventana-2="${num}"]`);
      console.log("clicked (VOPK) num:", num, "ventana:", ventana);
    }
    else if (btn.classList.contains("product-waspe")) {
      num = btn.getAttribute("data-ventana-3")?.trim();
      ventana = document.querySelector(`.ventana-3[data-ventana-3="${num}"]`);
      console.log("clicked (WASPE) num:", num, "ventana:", ventana);
    } else {
      console.log("clicked (UNKNOWN product) element:", btn);
    }

    if (!ventana) {
      console.warn("No se encontró la ventana para:", num);
      return;
    }

    ventana.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

  // --- VENTANA DE CONTACTO ---
  document.querySelectorAll(".elegir-contacto, .elegir-contacto-1").forEach(btn => {
    btn.addEventListener("click", () => {
      const ventana = btn.closest(".ventana, .ventana-1, .ventana-2, .ventana-3");
      if (!ventana) return;

      const contactoVentana = document.querySelector(".contacto-elegir, .contacto-elegir-1");
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
        // Reemplazamos el botón para eliminar posibles listeners anteriores
        btnIG.replaceWith(btnIG.cloneNode(true));
        const newBtnIG = contactoVentana.querySelector(".comprar-instagram");

        newBtnIG.addEventListener("click", () => {
          const texto = `Hola! Me interesa el producto "${h2.textContent.trim()}". Está disponible?`;

          let alertMsg = "Texto copiado al portapapeles. Pégalo en Instagram.";
          if (!(navigator.clipboard && navigator.clipboard.writeText)) {
          alertMsg = "Tu navegador no soporta copiar al portapapeles. Pega el mensaje manualmente en Instagram.";
          }

          alert(alertMsg);

          // Esperar 5 segundos antes de redirigir
          setTimeout(() => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto).catch(() => {});
            }
            window.open("https://www.instagram.com/vapersmadridd___/", "_blank");
          }, 5000);
        });
      }
    });
  });
  // --- CERRAR VENTANAS ---
  cerrarBtns.forEach(cerrar => {
    cerrar.addEventListener("click", () => {
      const ventana = cerrar.closest(".ventana") || cerrar.closest(".ventana-1") || cerrar.closest(".ventana-2") || cerrar.closest(".ventana-3") || cerrar.closest(".contacto-elegir");
      if (ventana) ventana.classList.remove("show");
      document.body.style.overflow = "";
    });
  });

  // Click fuera para cerrar ventana
  document.querySelectorAll(".ventana, .ventana-1, .ventana-2, .ventana-3").forEach(v => {
    v.addEventListener("click", e => {
      if (e.target === v) {
        v.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  });
});