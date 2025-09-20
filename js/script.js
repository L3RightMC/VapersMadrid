document.addEventListener("DOMContentLoaded", () => {
  console.log("Chat, he cargado");
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let deviceInfo = {
    modelo: "Desconocido",
    sistemaOperativo: "Desconocido",
    navegador: "Desconocido"
  };

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

  if (window.innerWidth <= 430) {
    alert("Pantalla móvil detectada! Puede haber bugs por diferencia de pantallas con la web. Pulsa Aceptar");
  }


  const allProducts = document.querySelectorAll(".product-bang, .product-razzbar, .product-vopk");
  const cerrarBtns = document.querySelectorAll(".cerrar-ventana");

  allProducts.forEach(btn => {
    btn.addEventListener("click", () => {
      let num, ventana;

      if (btn.classList.contains("product-bang")) {
        num = btn.getAttribute("data-ventana")?.trim();
        ventana = document.querySelector(`.ventana[data-ventana="${num}"]`);
      } 
      else if (btn.classList.contains("product-razzbar")) {
        num = btn.getAttribute("data-ventana-1")?.trim();
        ventana = document.querySelector(`.ventana-1[data-ventana-1="${num}"]`);
        console.log("Buscando ventana (RAZZ):", num, ventana);
      }
      else if (btn.classList.contains("product-vopk")) {
        num = btn.getAttribute("data-ventana-2")?.trim();
        ventana = document.querySelector(`.ventana-2[data-ventana-2="${num}"]`);
        console.log("Buscando ventana (VOPK):", num, ventana);
      }

      if (!ventana) return;

      ventana.classList.add("show");
      document.body.style.overflow = "hidden";

      const h2 = ventana.querySelector("h2");
      const link = ventana.querySelector("a.comprar-link, a.comprar-link-1, a.comprar-link-2");

      if (h2 && link) {
        const telefono = link.getAttribute("data-tel");
        const texto = encodeURIComponent(
          `Hola! Me interesa el producto "${h2.textContent.trim()}". Está disponible?`
        );
        link.href = `https://wa.me/${telefono}?text=${texto}`;
      }
    });
  });

  cerrarBtns.forEach(cerrar => {
    cerrar.addEventListener("click", () => {
      const ventana = cerrar.closest(".ventana") || cerrar.closest(".ventana-1") || cerrar.closest(".ventana-2");
      if (ventana) ventana.classList.remove("show");
      document.body.style.overflow = "";
    });
  });

  document.querySelectorAll(".ventana, .ventana-1, .ventana-2").forEach(v => {
    v.addEventListener("click", e => {
      if (e.target === v) {
        v.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  });
});