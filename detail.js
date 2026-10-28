// Captura de parámetros URL independiente
const parametrosURL = new URLSearchParams(window.location.search);
const identificadorProducto = parametrosURL.get('id');
const bloqueDetalle = document.getElementById('product-detail-card');

function obtenerDetalleEspecifico() {
    // Validación estructural distinta
    if (identificadorProducto === null || identificadorProducto === '') {
        bloqueDetalle.innerHTML = `<p style="padding: 20px; text-align: center; color: #b91c1c;">Error: Parámetro faltante.</p>`;
        return;
    }

    // Petición directa usando promesas tradicionales (.then)
    fetch('https://dummyjson.com/products/' + identificadorProducto)
        .then(res => {
            if (!res.ok) {
                throw new Error('Producto inexistente');
            }
            return res.json();
        })
        .then(informacionProducto => {
            mostrarFichaTecnica(informacionProducto);
        })
        .catch(err => {
            console.error('Detalle fallido:', err);
            bloqueDetalle.innerHTML = `<p style="padding: 40px; text-align: center; color: #b91c1c;">No se pudo procesar la solicitud del producto.</p>`;
        });
}

function mostrarFichaTecnica(datosArticulo) {
    // Manejo de textos vacíos y conversión numérica alternativa
    const marcaArticulo = datosArticulo.brand ? datosArticulo.brand : 'Sin marca registrada';
    const descuentoArticulo = Number(datosArticulo.discountPercentage).toFixed(2);
    
    bloqueDetalle.innerHTML = `
        <div class="detail-visual">
            <img src="${datosArticulo.thumbnail || ''}" alt="${datosArticulo.title}">
        </div>
        <div class="detail-content">
            <span class="detail-category">${datosArticulo.category}</span>
            <h2 class="detail-title">${datosArticulo.title}</h2>
            <div class="detail-price">$${Number(datosArticulo.price).toFixed(2)}</div>
            <p class="detail-description">${datosArticulo.description}</p>
            <div class="specs-grid">
                <div class="spec-box">
                    <span class="spec-label">Calificación</span>
                    <span class="spec-value">★ ${Number(datosArticulo.rating).toFixed(2)}</span>
                </div>
                <div class="spec-box">
                    <span class="spec-label">Stock</span>
                    <span class="spec-value">${parseInt(datosArticulo.stock)} unidades</span>
                </div>
                <div class="spec-box">
                    <span class="spec-label">Marca</span>
                    <span class="spec-value">${marcaArticulo}</span>
                </div>
                <div class="spec-box">
                    <span class="spec-label">Descuento</span>
                    <span class="spec-value">${descuentoArticulo}%</span>
                </div>
            </div>
        </div>
    `;
}

// Evento de arranque nativo diferente al anterior
document.addEventListener('DOMContentLoaded', function() {
    obtenerDetalleEspecifico();
});
