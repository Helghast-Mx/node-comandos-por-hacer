//importamos los paquetes para poder escribir en un archivo
const fs = require('fs');

// almacenaremos todo en este arreglo
let listadoPorHacer = [];

const guardarDB = () => { // No recibe ningun parametro porque trabajaremos                                sobre el arreglo 
    return new Promise((resolve, reject) => {

        let data = JSON.stringify(listadoPorHacer);
        fs.writeFile(`db/data.json`, data, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(`Grabado en el archivo data.json`.green)
            }

        });
    });
}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion, // en EMC6 decir descripcion : descripcion es redundante
        completado: false
    };

    listadoPorHacer.push(porHacer); // el arreglo vacio recibira el porHacer
    guardarDB();
    return porHacer; // tenemos que hacer un return para que el listadoPorHacer tenga el valor 
}


let getListado = () => {

    cargarDB();

    return listadoPorHacer;

}

const actualizar = (descripcion, completado) => {

    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => {
            return tarea.descripcion === descripcion;
        }) //esto regresa un numero, si no lo encontro será igual a -0

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        console.log('Tarea no encontrada');
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    // el filter es una funcion de los arreglos
    // permite quitar o filtrar un elemento en particular
    // y la funcion regresa un nuevo arreglo
    let nuevoListado = listadoPorHacer.filter((tareaBorrar) => {
        // regresamos cada uno de los elementos que no cohincidan con la condicion
        return tareaBorrar.descripcion !== descripcion;
    })

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;

    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}