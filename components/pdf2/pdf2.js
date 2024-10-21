export function init() {
    let pdfDocument = null;

    function mostrarSpinner() {
        document.getElementById('spinner').style.display = 'flex'; // Mostrar el spinner
        document.body.style.opacity = '0.7'; // Reducir la opacidad del contenido
    }
    
    // Función para ocultar el spinner
    function ocultarSpinner() {
        document.getElementById('spinner').style.display = 'none'; // Ocultar el spinner
        document.body.style.opacity = '1'; // Restaurar la opacidad del contenido
    }

    // Función para buscar una orden por número
    async function buscarOrden(orderNumber) {
        mostrarSpinner(); // Mostrar el spinner al comenzar la búsqueda
        try {
            const response = await fetch(`http://192.168.30.208:3000/buscar-orden/${orderNumber}`);
            if (!response.ok) {
                throw new Error('Error al buscar la orden');
            }
            const data = await response.json();
            mostrarPedidos(data); // Mostrar los pedidos en la tabla con los datos de la API
            document.getElementById('orderSearch').value = '';
        } catch (error) {
            console.error('Error al buscar la orden:', error);
            alert('No se encontró la orden');
        } finally {
            ocultarSpinner(); // Ocultar el spinner al finalizar la búsqueda
        }
    }

    // Función para buscar una orden por URL
    async function buscarOrdenPorUrl(url) {
        mostrarSpinner(); // Mostrar el spinner al comenzar la búsqueda
        try {
            const response = await fetch(`http://192.168.30.208:3000/buscar-orden-url?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Error al buscar la orden por URL');
            }
            const data = await response.json();
            mostrarPedidos(data); // Mostrar los pedidos en la tabla con los datos de la API
            document.getElementById('orderUrlSearch').value = '';
        } catch (error) {
            console.error('Error al buscar la orden por URL:', error);
            alert('No se encontró la orden por URL');
        } finally {
            ocultarSpinner(); // Ocultar el spinner al finalizar la búsqueda
        }
    }

    // Función para mostrar pedidos en la tabla usando datos de la API
    function mostrarPedidos(data) {
        const ordersContainer = document.getElementById('ordersContainer');
        ordersContainer.innerHTML = ''; // Limpiar contenido previo

        // Iterar sobre los datos y crear una tabla para cada pedido
        Object.keys(data).forEach((pedidoKey, index) => {
            const pedido = data[pedidoKey];

            const pedidoDiv = document.createElement('div');
            pedidoDiv.classList.add('pedido');
            pedidoDiv.innerHTML = `<h3 style="font-size: 20px;">${pedidoKey}</h3>
            <div class="pedidoContent" id="pedidoContent-${index}" style="position: relative; ">
                <table class="pedidoTable" style="width: 94.3%; height: 150px; text-align: center; border-collapse: collapse; margin-left: 0;">
                    <tr>
                        <td rowspan="3" style="text-align: center;">
                            <img src="/assents/remedy.png" alt="Imagen de Kovet" class="kovetimage" style="width: 288px; height: 190px; margin-top: 7px;  text-align: center; ">
                        </td>
                        <td colspan="3" class="titulo" style="font-size: 17px;">
                            <span class="blue-text">CLIENT:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.customer || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="3" class="titulo" style="font-size: 17px;">
                            <span class="blue-text">ITEM #:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.itemNumber || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="2" class="titulo" style="font-size: 17px;">
                            <span class="blue-text">WOOD SPECIES:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.woodSpecies || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="2" class="titulo" style="font-size: 17px;">
                            <span class="blue-text">DATE:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.date || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="2" rowspan="3">
                            <p class="rm" contenteditable="true" style="font-size: 14px;">${'ING 005-A 22 REV I'}</p>
                        </td>
                        <td rowspan="3" class="reducido" style="text-align: justify;">
                            <p style="color: black; font-size: 9px; text-align:justify;  ">
                                ${'THESE MATERIALS ARE THE PROPERTY OF KOVET HOSPITALITY, INC (K.H.) AND SHALL NOT BE USED WITHOUT THE PRIOR WRITTEN OR AUTHORIZED CONSENT OF K.H., THE UNAUTHORIZED USE OF THESE MATERIALS WILL CONSTITUTE AN UNLAWFUL INTERFERENCE WITH THE PROPERTY RIGHTS OF K.H. ANY UNAUTHORIZED USE OF THESE MATERIALS MAY BE SUBJECT TO LEGAL ACTION ON BEHALF OF KOVET HOSPITALITY, INC (K.H.).'}
                            </p>
                            <p class="textobajo" contenteditable="true" style="color: black; font-size: 12px;">ING 005-A 22 REV I</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="titulo" style="font-size: 17px;">
                            <span class="blue-text">PROJECT:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.projectName || '-').toUpperCase()}</p>
                        </td>
                        <td colspan="3" rowspan="2" class="titulo" style="font-size: 17px;">
                            <span class="blue-text">DESCRIPTION:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.description || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">P.MANAGER:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.productionManager || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">DRAW BY:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.drawBy || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">LAST REVISION:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.lastRevision || '-').toUpperCase()}</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">W.O.:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.salesOrderNumber || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">P.O.:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.poNumber || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">QTY.:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.qty || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">PAGE:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.page || '-').toUpperCase()}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">UNIT O.M:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${'INCH'}</p>
                        </td>
                        <td class="titulo" style="font-size: 17px;">
                            <span class="blue-text">APPROVAL BY:</span>
                            <p class="contenido" contenteditable="true" style="font-size: 16px;">${(pedido.approvalBy || '-').toUpperCase()}</p>
                        </td>
                    </tr>
                </table>
                <input type="file" class="pdfUpload" accept="application/pdf" style="position: absolute; top: -50px; right: 10px;">
            </div>
            <button class="savePDFButton" style="margin-top: 20px; font-size: 14px;">Guardar PDF</button>
            `;            

            ordersContainer.appendChild(pedidoDiv);

            // Botón para guardar PDF para cada pedido
            const savePDFButton = pedidoDiv.querySelector('.savePDFButton');
            savePDFButton.addEventListener('click', () => {
                guardarPDF(pedidoDiv.querySelector(`#pedidoContent-${index}`), pedido); // Pasar el pedido como parámetro
            });

            // Input para cargar el PDF
            const pdfUpload = pedidoDiv.querySelector('.pdfUpload');
            pdfUpload.addEventListener('change', (event) => {
                subirPDF(event.target.files[0], pedidoDiv.querySelector(`#pedidoContent-${index}`));
            });
        });
    }

    // Función para cargar y leer el archivo PDF
    function subirPDF(file, pedidoElement) {
        if (file && file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                const typedArray = new Uint8Array(e.target.result);
                pdfjsLib.getDocument(typedArray).promise.then(function(pdfDoc) {
                    pdfDocument = pdfDoc;
                    console.log('PDF Cargado correctamente');
                });
            };
            fileReader.readAsArrayBuffer(file);
        }
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

        return canvas.toDataURL('image/png', 0.75);  // Reducir calidad a 75%
    }

    // Función para generar y guardar el PDF combinando datos de la API y el PDF subido
    async function guardarPDF(pedidoElement, pedido) {
        if (!pdfDocument) {
            alert('Por favor, sube un archivo PDF primero.');
            return;
        }

        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const pageWidth = 792;
        const pageHeight = 612;
        const margin = 20;
        const width = pageWidth - 2 * margin;

        // Agregar la primera página del PDF convertido en imagen
        const firstPageImageData = await renderPageAsImage(1, 2);  // Escala reducida para menor tamaño
        const pdfFirstPageImage = await pdfDoc.embedPng(firstPageImageData);

        // Escalar la imagen del PDF
        const availableHeight = pageHeight - (margin * 2);
        const scaleFactor = Math.min(width / pdfFirstPageImage.width, availableHeight / pdfFirstPageImage.height);

        const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
        const imageHeight = pdfFirstPageImage.height * scaleFactor;

        page1.drawImage(pdfFirstPageImage, {
            x: margin,
            y: pageHeight - margin - imageHeight,  // Ajustar altura de la imagen
            width: pdfFirstPageImage.width * scaleFactor,  // Escalar ancho
            height: imageHeight  // Escalar altura
        });

        // Agregar la tabla generada desde los datos de la API
        const tableCanvas = await html2canvas(pedidoElement, { scale: 5, backgroundColor: null });  // Reducir escala para menor tamaño
        const tableImage = tableCanvas.toDataURL('image/png', 0.75);  // Reducir calidad a 75%
        const pdfTableImage = await pdfDoc.embedPng(tableImage);

        // Calcular la altura restante para la tabla
        const remainingHeightForTable = pageHeight - margin - imageHeight - margin;
        const tableScaleFactor = width / pdfTableImage.width;  // Ajustar para que la tabla abarque todo el ancho

        // Dibujar la tabla en el espacio disponible
        page1.drawImage(pdfTableImage, {
            x: margin + 7.3,
            y: margin,
            width: pdfTableImage.width * tableScaleFactor + 20,
            height: pdfTableImage.height * tableScaleFactor             
        });

        // Agregar las páginas restantes del PDF original
        const totalPages = pdfDocument.numPages;
        for (let i = 2; i <= totalPages; i++) {
            const nextPageImageData = await renderPageAsImage(i, 2);  // Escala reducida para menor tamaño
            const pdfNextPageImage = await pdfDoc.embedPng(nextPageImageData);
            const nextPage = pdfDoc.addPage([pageWidth, pageHeight]);

            nextPage.drawImage(pdfNextPageImage, {
                x: margin,
                y: margin,
                width: width,
                height: pdfNextPageImage.height * (width / pdfNextPageImage.width)
            });
        }

        // Descargar el PDF final
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

    // Evento para buscar una orden por número
    document.getElementById('searchButton').addEventListener('click', () => {
        const orderNumber = document.getElementById('orderSearch').value.trim();
        if (orderNumber) {
            buscarOrden(orderNumber);  // Buscar orden en la API y mostrar en la tabla
        } else {
            alert('Por favor, ingresa un número de orden');
        }
    });

    // Evento para buscar una orden por URL
    document.getElementById('searchByUrlButton').addEventListener('click', () => {
        const url = document.getElementById('orderUrlSearch').value.trim();
        if (url) {
            buscarOrdenPorUrl(url);  // Buscar orden por URL
        } else {
            alert('Por favor, ingresa una URL');
        }
    });
}