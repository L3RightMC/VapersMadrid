document.addEventListener("DOMContentLoaded", () => {
  console.log("Chat, he cargado");

  const productosBang = document.querySelectorAll(".product-bang");
  const productosRazzbar = document.querySelectorAll(".product-razzbar");
  const cerrarBtns = document.querySelectorAll(".cerrar-ventana");

  //Robar el h2 y ponerlo en whatsapp
  productosBang.forEach(btn => {
    btn.addEventListener("click", () => {
      const num = btn.dataset.ventana;
      const ventana = document.querySelector(`.ventana[data-ventana="${num}"]`);
      if (!ventana) return;
      ventana.style.display = "flex";

      const h2 = ventana.querySelector(".ventana-fondo h2");
      const link = ventana.querySelector(".ventana-fondo a.comprar-link");
      if (h2 && link) {
        const telefono = link.getAttribute("data-tel");
        const texto = encodeURIComponent(`Hola! Me interesa el producto "${h2.textContent.trim()}". Está disponible?`);
        link.href = `https://wa.me/${telefono}?text=${texto}`;
      }
    });
  });

  productosRazzbar.forEach(btn => {
    btn.addEventListener("click", () => {
      const num = btn.getAttribute('data-ventana-1');
      const ventana = document.querySelector(`.ventana-1[data-ventana-1="${num}"]`);
      if (!ventana) return;
      ventana.style.display = "flex";

      const h2 = ventana.querySelector(".ventana-fondo-1 h2"); // <--- CORRECCIÓN AQUÍ
      const link = ventana.querySelector(".ventana-fondo-1 a.comprar-link-1"); // <--- CORRECCIÓN AQUÍ
      if (h2 && link) {
        const telefono = link.getAttribute("data-tel");
        const texto = encodeURIComponent(`Hola! Me interesa el producto "${h2.textContent.trim()}". Está disponible?`);
        link.href = `https://wa.me/${telefono}?text=${texto}`;
      }
    });
  });

  cerrarBtns.forEach(cerrar => {
    cerrar.addEventListener("click", () => {
      const ventana = cerrar.closest(".ventana") || cerrar.closest(".ventana-1");
      if (ventana) ventana.style.display = "none";
    });
  });

  document.querySelectorAll(".ventana, .ventana-1").forEach(v => {
    v.addEventListener("click", e => {
      if (e.target === v) v.style.display = "none";
    });
  });
});