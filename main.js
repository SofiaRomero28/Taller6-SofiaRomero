// Nomenclatura alternativa y carga de elementos para Sofía
const contenedorProductos = document.getElementById('products-grid');
const barraBusqueda = document.getElementById('search-input');
let catalogoCompleto = [];

function cargarCatalogoDesdeAPI() {
    // Usamos promesas tradicionales (.then) en lugar de async/await
    fetch('https://dummyjson.com/products/')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Respuesta incorrecta del servidor');
            }
            return respuesta.json();
        })
        .then(datosRecibidos => {
            catalogoCompleto = datosRecibidos.products || [];
            dibujarTarjetas(catalogoCompleto);
        })
        .catch(errorServidor => {
            console.error('Fallo en la carga:', errorServidor);
            contenedorProductos.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; width: 100%;">
                    <p style="color: #b91c1c; font-weight: bold;">Catálogo no disponible temporalmente.</p>
                </div>
            `;
        });
}

function dibujarTarjetas(listaDeArticulos) {
    contenedorProductos.innerHTML = '';
    
    if (listaDeArticulos.length === 0) {
        contenedorProductos.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #4b5563;">No hay coincidencias para su búsqueda.</p>`;
        return;
    }

    // Recorrido por mapeo de arrays alternativo
    listaDeArticulos.map(item => {
        const elementoTarjeta = document.createElement('article');
        elementoTarjeta.className = 'product-card';

        // Lógica de valores por defecto e inserción de variables limpia
        const fotoThumbnail = item.thumbnail ? item.thumbnail : '';
        const precioFormateado = Number(item.price).toFixed(2);
        const ratingFormateado = Number(item.rating).toFixed(2);
        const stockEntero = parseInt(item.stock);

        elementoTarjeta.innerHTML = `
            <div class="image-container">
                <img src="${fotoThumbnail}" alt="${item.title}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${item.category}</span>
                <h3 class="product-name">${item.title}</h3>
                <div class="product-meta">
                    <span class="product-price">$${precioFormateado}</span>
                    <span class="product-rating">★ ${ratingFormateado}</span>
                </div>
                <p class="product-stock">Stock: ${stockEntero}</p>
                <a href="producto.html?id=${item.id}" class="view-btn">Ver producto</a>
            </div>
        `;
        contenedorProductos.appendChild(elementoTarjeta);
    });
}

// Filtro con una estructura sintáctica diferente
barraBusqueda.addEventListener('keyup', function(evento) {
    const textoUsuario = evento.target.value.toLowerCase().trim();
    
    const productosFiltrados = catalogoCompleto.filter(function(elemento) {
        const buscarEnNombre = elemento.title.toLowerCase().indexOf(textoUsuario) !== -1;
        const buscarEnCategoria = elemento.category.toLowerCase().indexOf(textoUsuario) !== -1;
        return buscarEnNombre || buscarEnCategoria;
    });
    
    dibujarTarjetas(productosFiltrados);
});

// Inicialización de la aplicación
window.onload = cargarCatalogoDesdeAPI;
