
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'



function App() {

  const[nro_doc, setnro_doc]= useState();
  const[nombre_usuario, setnombre_usuario]= useState("");
  const[contrasena, setcontrasena]= useState("");
  const[id_rol, setid_rol]= useState();


  const[editar, seteditar]= useState(false);



  const [usuarioslista,setusuarios] = useState([])

  const add= ()=>{
    Axios.post("http://localhost:3001/create",{
      nro_doc:nro_doc,
      nombre_usuario:nombre_usuario,
      contrasena:contrasena,
      id_rol:id_rol
    }).then(()=>{
      getusuarios(); 
      cancelar();
      Swal.fire({
        title: "<strong>registro exitoso!</strong>",
        html: "<i>el usuario "+ nombre_usuario+" fue registrado bien</i>",
        icon: 'success',
        timer:3000
      })
      
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const update= ()=>{
    Axios.put("http://localhost:3001/update",{
      nro_doc:nro_doc,
      nombre_usuario:nombre_usuario,
      contrasena:contrasena,
      id_rol:id_rol
    }).then(()=>{
      getusuarios(); 
      cancelar();
      Swal.fire({
        title: "<strong>actualizacion exitosa!</strong>",
        html: "<i>el usuario "+ nombre_usuario+" fue actualiazdo!</i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }


  const deleteusu = (val)=>{
    Swal.fire({
      title: 'confirmar la eliminacion?',
      html: "<i>desea eliminar a "+ val.nombre_usuario+"!</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.nro_doc}`).then(()=>{
          getusuarios(); 

          Swal.fire({
            icon: 'success',
            title: val.nombre_usuario+'fue eliminado.',
            showConfirmButton: false,
            timer: 2000
          });
          }).catch(function(error){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'no se logro eliminar el usuario!',
              footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
            })
          });
        
        
      }
    });
      cancelar();
    
  }

  const cancelar= ()=>{
    setnro_doc("");
    setnombre_usuario("");
    setcontrasena("");
    setid_rol("");
    seteditar(false);
  }

const editarusu = (val)=>{
  seteditar(true);

  setnombre_usuario(val.nombre_usuario);
  setcontrasena(val.contrasena);
  setid_rol(val.id_rol);
  setnro_doc(val.nro_doc);
}

  const getusuarios= ()=>{
    Axios.get("http://localhost:3001/usuarios").then((response)=>{
      setusuarios(response.data);
    });
  }
  

// getusuarios();
  return (
    <div className="container">
    
    <div className="card text-center">
      <div className="card-header">
        GESTION DE USUARIOS
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">numero de documemto:</span>
          <input type="number" value={nro_doc}
           onChange={(event)=>{
            setnro_doc(event.target.value);
          }}
          className="form-control" placeholder="ingrese nro_documento" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">usuario:</span>
          <input type="text" value={nombre_usuario}
           onChange={(event)=>{
            setnombre_usuario(event.target.value);
          }}
          className="form-control"  placeholder="ingrese usuario" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">contraseña:</span>
          <input type="password" value={contrasena}
           onChange={(event)=>{
            setcontrasena(event.target.value);
          }}
          className="form-control" placeholder="ingrese contraseña" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">id_rol:</span>
          <input type="number" value={id_rol}
           onChange={(event)=>{
            setid_rol(event.target.value);
          }}
          className="form-control" placeholder="ingrese cual es su rol" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
      </div>
      <div className="card-footer text-body-secondary">
        {
          editar===true? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>actualizar</button>  
          <button className='btn btn-info m-2' onClick={cancelar}>cancelar</button>
          </div>

          :
          <div>
          <button className='btn btn-success' onClick={add}>registrarse</button>
          <button className='btn btn-success' onClick={getusuarios}>listar</button> 
          </div>
        }
        
        
      </div>
    </div>
    <table className="table table-striped">
        <thead>
        <tr>
          <th scope="col">nro_doc</th>
          <th scope="col">nombre_usuario</th>
          <th scope="col">contrasena</th>
          <th scope="col">id_rol</th>
          <th scope="col">boton</th>
        </tr>
      </thead>
      <tbody>
      {
          usuarioslista.map((val,key)=>{
            return <tr key={val.nro_doc}>
                    <th>{val.nro_doc}</th>
                    <td>{val.nombre_usuario}</td>
                    <td>{val.contrasena}</td>
                    <td>{val.id_rol}</td>
                    <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={()=>{
                        editarusu(val);
                      }}
                      className="btn btn-info">editar</button>
                      <button type="button" onClick={()=>{
                        deleteusu(val);
                      }} className="btn btn-danger">eliminar</button>
                    </div>
                    </td>
                  </tr>
            
              
            
            
          })
        }
        
        
      </tbody>
    </table>
    </div>
  );
}

export default App;
