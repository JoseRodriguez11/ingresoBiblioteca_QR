const axios = require('axios');
const express = require('express');
const cors = require('cors');



const app = express();
const PORT = 3000;

app.use(cors());

async function extraerDatos(url) {
    
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
            const html = response.data;
            console.log("antes de cheerio");
            const cheerio = require('cheerio');
            console.log("despuesd de cheerio");
            const $ = cheerio.load(html);

            const nombre = $('.details-name').text().trim();
            console.log(nombre)
            const cc = $('.details-level1:contains("CC")').text().split(':')[1].trim();
            console.log(cc)
            const rh = $('.details-level1:contains("RH")').text().split(':')[1].trim();
            console.log(rh)
            const codigo = codigoElement.length ? codigoElement.text().split(':')[1].trim() : null;
            console.log(codigo)
            const carrera = $('#cardmaincontent-personaldata > div > span:nth-child(9)').text().trim();
            console.log(carrera)
            const rol = $('#cardmaincontent-personaldata > div > span:nth-child(11)').text().trim();
            console.log(rol)
            const validoHasta = $('.details-level2:contains("Válido hasta") + span').text().trim();
            console.log(validoHasta)

            const datosExtraidos = {
                "Nombre": nombre,
                "CC": cc,
                "codigo": codigo,
                "Tipo de sangre": rh,
                "Fecha de vencimiento": validoHasta,
                "Carrera": carrera,
                "Rol": rol
            };

            console.log(datosExtraidos);

            return datosExtraidos;

        } else {
            return `Error al cargar la página. Código de estado: ${response.status}`;
        }

    } catch (error) {
        return `Error al cargar la página: ${error.message}`;
    }
}


app.get('/extraer-datos', async (req, res) => {
    const url = req.query.url; // Obtén la URL desde la solicitud
    const datos = await extraerDatos(url);
    res.json(datos);
});

app.listen(PORT, () => {
    console.log(`Servidor Node.js en funcionamiento en el puerto ${PORT}`);
});