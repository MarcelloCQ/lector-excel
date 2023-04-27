import { Button, Modal } from 'react-bootstrap'
import { ImportXlsx } from '../Import/ImportXlsx'
import { FotoPerfil } from '../FotoPerfil/FotoPerfil'
import './UserModal.css'
import { useState } from 'react'

export const UserModal = ({show, handleClose, newHandleClose}) => {
  //Siempre establecemos los estados del componente al inicio de este
  const [fotoPerfil, setFotoPerfil] = useState(false);
  const [urlFotoPerfil, setUrlFotoPerfil] = useState('');

  //Cuando haya un cambio en el input tipo file, se ejecuta esta funcion que detecta la imagen y obtiene el data 64*64
  //para la previsualizacion
  const handlerFileChange = (e) => {
    if(e.target.files[0]) {
      setFotoPerfil(true)
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrlFotoPerfil(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFotoPerfil(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Foto de Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Si hay una foto cargada, mostramos la foto */}
          {
            fotoPerfil&&
              <div className='foto-perfil-container'>
                <img width={200} height={200} src={urlFotoPerfil} alt='foto de perfil que se eligió para cargar a la cuenta del trabajador' />
              </div>
          }
          {/* De lo contrario, mostramos una foto por defecto */}
          {
            fotoPerfil === false &&
              <div className='foto-perfil-container'>
                <FotoPerfil />
              </div>
          }
          <ImportXlsx text={`Selecciona una foto`} handlerFileChange={handlerFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='dark' onClick={newHandleClose}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
