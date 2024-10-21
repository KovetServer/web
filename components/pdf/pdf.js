import API_URL2 from '../../apiBack.js';

export function init() {
    let pdfDocument = null;

    function mostrarSpinner() {
        document.getElementById('spinner').style.display = 'flex'; 
        document.body.style.opacity = '0.7'; 
    }
    // Función para ocultar el spinner
    function ocultarSpinner() {
        document.getElementById('spinner').style.display = 'none'; 
        document.body.style.opacity = '1'; 
    }
    // Función para buscar una orden por URL
    async function buscarOrdenPorUrl(url) {
        mostrarSpinner();
        try {
            const response = await fetch(`${API_URL2}/buscar-orden-url?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Error al buscar la orden por URL');
            }
            const data = await response.json();
            mostrarPedidos(data); 
            document.getElementById('orderUrlSearch').value = '';
        } catch (error) {
            console.error('Error al buscar la orden por URL:', error);
            alert('No se encontró la orden por URL');
        } finally {
            ocultarSpinner(); 
            resetearSubidaPDF();
        }
    }

    function getLoggedUsername() {
        const userData = JSON.parse(localStorage.getItem('userData'));
    
        if (!userData || !userData.username) {
            console.error('No se encontraron los datos del usuario');
            return '-';  // Valor por defecto si no hay usuario
        }
        const fullName = userData.username; 
        const nameParts = fullName.split(' '); // Divide el nombre en partes
        if (nameParts.length < 2) {
            return fullName.toUpperCase(); 
        }
        const initials = nameParts[0].charAt(0).toUpperCase() + '. '; // Inicial del primer nombre
        const lastName = nameParts[nameParts.length - 1].toUpperCase(); // Apellido en mayúsculas
        return `${initials}${lastName}`; // Devuelve el formato deseado
    }

    function mostrarPedidos(data) {
        const ordersContainer = document.getElementById('ordersContainer');
        ordersContainer.innerHTML = ''; 

        Object.keys(data).forEach((pedidoKey, index) => {
            const pedido = data[pedidoKey];

            const pedidoDiv = document.createElement('div');
            pedidoDiv.classList.add('pedido');
            pedidoDiv.innerHTML = `
            <h3 class="pedido-title">${pedidoKey}</h3>
            <div class="pedidoContent" id="pedidoContent-${index}">
                <table class="pedidoTable">
                    <tr>
                        <td colspan="3" >
                            <span class="blue-text">CLIENT:</span>
                            <p class="contenido" contenteditable="true">${(pedido.customer || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="2" class="item large-cell">
                            <span class="blue-text">ITEM #:</span>
                            <p class="contenido" contenteditable="true"># ${(pedido.itemNumber || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="3" class="wood small-cell">
                            <span class="blue-text">WOOD SPECIES:</span>
                            <p class="contenido" contenteditable="true">${(pedido.woodSpecies || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="2" class="date small-cell">
                            <span class="blue-text">DATE:</span>
                            <p class="contenido" contenteditable="true">${(pedido.date || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="1" rowspan="3" class="rm">
                            <p class="rm2" contenteditable="true"></p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" >
                            <span class="blue-text">PROJECT:</span>
                            <p class="contenido" contenteditable="true">${(pedido.projectName || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="3 " rowspan="2" >
                            <span class="blue-text">DESCRIPTION:</span>
                            <p class="contenido-description" contenteditable="true">${(pedido.description || '-').toUpperCase()}</p>
                        </td>
                        <td class="manager small-cell">
                            <span class="blue-text">P.MANAGER:</span>
                            <p class="contenido" contenteditable="true">${(pedido.productionManager || '-').toUpperCase()}</p>
                        </td>
                        <td class="draw small-cell">
                            <span class="blue-text">DRAW BY:</span>
                            <p class="contenido" contenteditable="true">${(pedido.drawBy || getLoggedUsername()).toUpperCase()}</p>
                        </td>
                        <td colspan="2"  class="last small-cell">
                            <span class="blue-text">LAST REVISION:</span>
                            <p class="contenido" contenteditable="true">${(pedido.lastRevision || '-').toUpperCase()}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="blue-text">W.O.:</span>
                            <p class="contenido-wo" contenteditable="true">${(pedido.salesOrderNumber || '-').toUpperCase()}</p>
                        </td>
                        <td>
                            <span class="blue-text">P.O.:</span>
                            <p class="contenido-po" contenteditable="true">${(pedido.poNumber || '-').toUpperCase()}</p>
                        </td>
                        <td >
                            <span class="blue-text">QTY.:</span>
                            <p class="contenido-qty" contenteditable="true">${(pedido.qty || '-').toUpperCase()}</p>
                        </td>
                        <td class="page small-cell">
                            <span class="blue-text">PAGE:</span>
                            <p class="contenido" contenteditable="true">${(pedido.page || '-').toUpperCase()}</p>
                        </td>
                        <td class="unit small-cell">
                            <span class="blue-text">UNIT O.M:</span>
                            <p class="contenido" contenteditable="true">INCH</p>
                        </td>
                        <td colspan="2"  class="approval small-cell">
                            <span class="blue-text">APPROVAL BY:</span>
                            <p class="contenido" contenteditable="true">${(pedido.approvalBy || '-').toUpperCase()}</p>
                        </td>
                    </tr>
                </table>
                <input type="file" class="pdfUpload" accept="application/pdf">
            </div>
            <button class="savePDFButton">Save PDF</button>
        `;
        const style = document.createElement('style');
        style.innerHTML = `
            
            .large-cell {
                width: 1450px;  
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
        

            ordersContainer.appendChild(pedidoDiv);

            // Botón para guardar PDF para cada pedido
            const savePDFButton = pedidoDiv.querySelector('.savePDFButton');
            savePDFButton.addEventListener('click', () => {
                guardarPDF(pedidoDiv.querySelector(`#pedidoContent-${index}`), pedido); 
            });

            // Input para cargar el PDF
            const pdfUpload = pedidoDiv.querySelector('.pdfUpload');
            pdfUpload.addEventListener('change', (event) => {
                subirPDF(event.target.files[0], pedidoDiv.querySelector(`#pedidoContent-${index}`));
            });
        });
    }
        
    function subirPDF(file, pedidoElement) {
        // Validar que el archivo sea un PDF
        if (file && file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                const typedArray = new Uint8Array(e.target.result);
                pdfjsLib.getDocument(typedArray).promise.then(function(pdfDoc) {
                    pdfDocument = pdfDoc; // Asignar el nuevo PDF cargado
                    const totalPages = pdfDocument.numPages;
    
                    // Lógica para actualizar el campo PAGE según el número de páginas
                    const pageFields = pedidoElement.querySelectorAll('.page .contenido');
                    pageFields.forEach((field, index) => {
                        if (index < totalPages) {
                            field.innerText = `${index + 1}-${totalPages}`; 
                        } else {
                            field.innerText = '-'; 
                        }
                    });
    
                    console.log('PDF cargado correctamente con', totalPages, 'páginas.');
                }).catch(function(error) {
                    console.error('Error al cargar el documento PDF:', error);
                });
            };
            fileReader.readAsArrayBuffer(file);
        } else {
            console.error('Por favor, selecciona un archivo PDF válido.');
            alert('Por favor, selecciona un archivo PDF válido.'); 
        }
    }
    
    // Función para resetear el estado de subida de PDF
    function resetearSubidaPDF() {
        pdfDocument = null; // Limpiar la variable del documento PDF
        const pageFields = document.querySelectorAll('.page .contenido'); // Ajusta el selector según tu estructura
        pageFields.forEach(field => {
            field.innerText = '-'; // Limpiar el contenido
        });
    }

    // Función para convertir una página del PDF en una imagen
    async function renderPageAsImage(pageNumber, scale) {
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
    
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;
        // Reducir calidad ligeramente para reducir tamaño
        return canvas.toDataURL('image/png', 3.0);  
    }
    async function guardarPDF(pedidoElement, pedido) {
        if (!pdfDocument) {
            alert('Por favor, sube un archivo PDF primero.');
            return;
        }
    
        const { PDFDocument, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const pageWidth = 792;
        const pageHeight = 612;
        const margin = 1;
        const width = pageWidth - 2 * margin;
        const availableHeight = pageHeight - 2 * margin;
    
        // Agregar la primera página del PDF convertido en imagen
        const firstPageImageData = await renderPageAsImage(1, 2.5);
        const pdfFirstPageImage = await pdfDoc.embedPng(firstPageImageData);
    
        // Escalar la imagen del PDF
        const scaleFactor = Math.min(width / pdfFirstPageImage.width, availableHeight / pdfFirstPageImage.height);
        const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
        const imageHeight = pdfFirstPageImage.height * scaleFactor;
    
        // Ajustar el margen superior en la primera página
        const topMarginAdjustment = -0.5;
        page1.drawImage(pdfFirstPageImage, {
            x: margin,
            y: pageHeight - margin - imageHeight + topMarginAdjustment,
            width: pdfFirstPageImage.width * scaleFactor,
            height: imageHeight 
        });
    
        // Generar la tabla desde los datos de la API
        const tableCanvas = await html2canvas(pedidoElement, {
            scale: 4,
            backgroundColor: null
        });
    
        const tableImage = tableCanvas.toDataURL('image/png', 3.0);
        const pdfTableImage = await pdfDoc.embedPng(tableImage);
    
        // Calcular la escala y tamaño ajustado de la tabla
        const tableScaleFactor = width / (pdfTableImage.width * 1.191);
        const adjustedWidth = pdfTableImage.width * tableScaleFactor;
        const adjustedHeight = pdfTableImage.height * tableScaleFactor;
    
        // Posicionamiento de la tabla
        const topMargin = margin + 5;
        const bottomMargin = margin + 5;
        const rightShift = 75.6;
        const verticalShift = -13.9;
    
        // Pegar la tabla en la primera página
        page1.drawImage(pdfTableImage, {
            x: margin + rightShift,
            y: topMargin - verticalShift,
            width: adjustedWidth,
            height: adjustedHeight - bottomMargin 
        });
    
        const totalPages = pdfDocument.numPages;
    
        // Agregar el resto de las páginas
        for (let i = 2; i <= totalPages; i++) {
            const pageImageData = await renderPageAsImage(i, 2.5);
            const pdfPageImage = await pdfDoc.embedPng(pageImageData);
            const page = pdfDoc.addPage([pageWidth, pageHeight]);
    
            const scaleFactor = Math.min(width / pdfPageImage.width, availableHeight / pdfPageImage.height);
            page.drawImage(pdfPageImage, {
                x: margin,
                y: pageHeight - margin - (pdfPageImage.height * scaleFactor) + topMarginAdjustment,
                width: pdfPageImage.width * scaleFactor,
                height: pdfPageImage.height * scaleFactor
            });
    
            // Pegar la tabla en todas las páginas excepto la última
            if (i !== totalPages) {
                page.drawImage(pdfTableImage, {
                    x: margin + rightShift,
                    y: topMargin - verticalShift,
                    width: adjustedWidth ,
                    height: adjustedHeight - bottomMargin
                });
            }
    
            // Agregar el texto de rango de páginas solo en las páginas intermedias (ni en la primera ni en la última)
            if (i !== 1 && i !== totalPages) {
                const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica); // Usa la fuente estándar Helvetica
                const fontSize = 7;
                const text = `${i}-${totalPages}`;
                const textWidth = font.widthOfTextAtSize(text, fontSize);
                const textHeight = font.heightAtSize(fontSize);
    
                const x = pageWidth - textWidth - margin - 337; // Ajustado hacia la izquierda
                const y = margin + textHeight + 18; // Ajustado arriba
    
                const backgroundHeight = textHeight + 4;
                const backgroundY = y - 2; // Ajustar la posición vertical del fondo
                page.drawRectangle({
                    x: x - 2,
                    y: backgroundY,
                    width: textWidth + 4, 
                    height: backgroundHeight,
                    color: rgb(1, 1, 1), // Color blanco
                });
                page.drawText(text, {
                    x: x,
                    y: y,
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0),
                    opacity: 0.75
                });
            }
            if (i === totalPages) {
                // Recortar la tabla a un poco más de la mitad, y mantener la altura original
                const originalTableWidth = tableCanvas.width;
                const originalTableHeight = tableCanvas.height;
            
                const cropArea = {
                    x: 0, // Inicia desde la parte izquierda
                    y: 0, // Inicia desde arriba
                    width: originalTableWidth * 0.5205, // Un poco más de la mitad del ancho
                    height: originalTableHeight // Mantener la altura completa para el recorte
                };
            
                // Crear un nuevo canvas recortado
                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = cropArea.width;
                croppedCanvas.height = cropArea.height;
                const ctx = croppedCanvas.getContext('2d');
                ctx.drawImage(tableCanvas, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, cropArea.width, cropArea.height);
            
                const croppedTableImage = await pdfDoc.embedPng(croppedCanvas.toDataURL('image/png'));
            
                // Pegar la tabla recortada en la última página con menos altura
                page.drawImage(croppedTableImage, {
                    x: margin + rightShift,
                    y: topMargin - verticalShift,
                    width: adjustedWidth * 0.519, // Ajustar al mismo ancho del recorte
                    height: adjustedHeight * 0.91 // Reducir la altura de la imagen recortada
                });
            }
        }
    
        // Descargar el PDF 
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pedido.itemNumber || 'pedido_modificado'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    

    // Muestra el campo de búsqueda por número de ítem al presionar el botón de búsqueda por URL
    document.getElementById('searchByUrlButton').addEventListener('click', () => {
        const url = document.getElementById('orderUrlSearch').value.trim();
        if (url) {
            buscarOrdenPorUrl(url);  
            document.getElementById('itemSearch').style.display = 'block'; 
        } else {
            alert('Por favor, ingresa una URL');
        }
    });

    function buscarPorItem(itemNumber) {
        const ordersContainer = document.getElementById('ordersContainer');
        const pedidos = ordersContainer.getElementsByClassName('pedido');
        Array.from(pedidos).forEach(pedido => {
            const itemElement = pedido.querySelector('.item .contenido').textContent;

            if (itemElement.includes(itemNumber.toUpperCase())) {
                pedido.style.display = ''; 
                pedido.classList.remove('fade-out'); 
                pedido.classList.add('fade-in');    
            } else {
                pedido.classList.remove('fade-in'); 
                pedido.classList.add('fade-out');   
                setTimeout(() => pedido.style.display = 'none', 500);
            }
        });
    }

    // Evento para buscar por número de ítem al escribir en el campo
    document.getElementById('itemSearch').addEventListener('input', () => {
        const itemNumber = document.getElementById('itemSearch').value.trim();
        buscarPorItem(itemNumber); 
    });
        // Evento para buscar una orden por URL  
        document.getElementById('searchByUrlButton').addEventListener('click', () => {
            const url = document.getElementById('orderUrlSearch').value.trim();
            if (url) {
                buscarOrdenPorUrl(url);  
            } else {
                alert('Por favor, ingresa una URL');
            }
        });
    }



//15291 fila 3

