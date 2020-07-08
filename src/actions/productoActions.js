import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';



// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(agregarProducto(producto))

        try {
            dispatch(agregarProductoExito(producto))
        } catch (error) {
            dispatch(agregarProductoError(error))
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
