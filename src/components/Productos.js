import React, {Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {obtenerProductosAction} from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
    }, [dispatch]);

    const productos = useSelector (state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    return ( 
        <Fragment>
           <h2 className="text-center my-5">Listado de Productos</h2>

           { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
           
           {cargando ? <div className="text-center">
                                        <div className="spinner-border m-5" role="status">
                                        </div>
                                    </div> : null}

           <table className="table table-striped">
               <thead className="bg-info table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
               </thead>
               <tbody>
               {productos.length === 0 ? <tr><td colSpan="3"><p className=" font-weight-bold text-center mt-4">No hay productos</p></td></tr> : (
                       productos.map(producto => (
                           <Producto
                                key={producto.id}
                                producto={producto}
                           />
                       ))
                   ) }
               </tbody>
           </table>
       </Fragment>
     );
}
 
export default Productos;