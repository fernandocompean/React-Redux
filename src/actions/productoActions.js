import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto(producto));

        try {
            await clienteAxios.post('/productos', producto);
            dispatch(agregarProductoExito(producto));

            Swal.fire(
                'Correcto!', 
                'El producto se agregó correctamente.',
                'success'
            );

        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(error));

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Hubo un error, intenta de nuevo.'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            setTimeout(async ()=> {
                const respuesta = await clienteAxios.get('/productos');
                dispatch(descargaProductosExitosa(respuesta.data));
            }, 1000)
        } catch (error) {
            console.log(error);
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR, 
    payload: true
});
