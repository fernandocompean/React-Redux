import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto(producto));

        try {
            await clienteAxios.post('/s', producto);
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
    type: AGREGAR_PRODUCTO
})

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})
