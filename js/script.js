document.addEventListener("DOMContentLoaded", () => {
  console.log("Chat, he cargado");

  const allProducts = document.querySelectorAll(".product-bang, .product-razzbar");
  const cerrarBtns = document.querySelectorAll(".cerrar-ventana");

  allProducts.forEach(btn => {
    btn.addEventListener("click", () => {
      let num, ventana;

      if (btn.classList.contains("product-bang")) {
        num = btn.getAttribute("data-ventana")?.trim(); // Normalizamos espacios
        ventana = document.querySelector(`.ventana[data-ventana="${num}"]`);
      } 
      else if (btn.classList.contains("product-razzbar")) {
        num = btn.getAttribute("data-ventana-1")?.trim(); // Normalizamos espacios
        ventana = document.querySelector(`.ventana-1[data-ventana-1="${num}"]`);
        console.log("Buscando ventana (RAZZ):", num, ventana); // debug
      }

      if (!ventana) return;

      ventana.classList.add("show");
      document.body.style.overflow = "hidden"; // bloquear scroll

      const h2 = ventana.querySelector("h2");
      const link = ventana.querySelector("a.comprar-link, a.comprar-link-1");

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
      const ventana = cerrar.closest(".ventana") || cerrar.closest(".ventana-1");
      if (ventana) ventana.classList.remove("show");
      document.body.style.overflow = ""; // restaurar scroll
    });
  });

  document.querySelectorAll(".ventana, .ventana-1").forEach(v => {
    v.addEventListener("click", e => {
      if (e.target === v) {
        v.classList.remove("show");
        document.body.style.overflow = ""; // restaurar scroll
      }
    });
  });
});
//NO FUNCIONA EL DATA-VENTANA-1 A PARTIR DEL PUTO 6