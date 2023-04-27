import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { paginationComponentOptions } from '../../utilities/DataTable/DataTableOptions'
import { useDispatch, useSelector } from 'react-redux'
import './BodyDashboard.css'
import { useState } from 'react'
import { Printer, UploadCloud } from 'react-feather'
import { UserModal } from '../../components/UserModal/UserModal'
import { updateData } from '../../redux/features/datosXlsxSlice'

export const BodyDashboard = () => {
  const dispatch = useDispatch();
  //Boton para volver al organigrama
  const goOrganigrama = () => {
    dispatch(updateData(''));
    navigate(`/organigrama`, {replace: true});
  };

  //Definimos todos los estados que usará el componente
  const [newData, setNewData] = useState('');
  const [filtro, setFiltro] = useState('');
  const [valueFiltro, setValueFiltro] = useState('');
  const [show, setShow] = useState(false);
  
  //Navigate de react router dom para poder movernos entre componentes
  const navigate = useNavigate();

  //Obtenemos los datos del excel del store de redux
  const excelData = useSelector((state) => state?.datosXlsx?.data?.payload);
  
  //copiamos el array original para trabajar con la copia y no modificar el original
  let data = excelData ? [...excelData] : [];
  
  const sumar = (newData) => {
    let valorFinal = 0;
    const arrayImportes = newData.map(element => element.SueldoBruto);
    for(let i = 0; i < arrayImportes.length; i++) {
      valorFinal = valorFinal + arrayImportes[i];
    }
    return valorFinal;
  };
  
  //establecemos las columnas al igual que en la tabla anterior, pero agregaremos más
  //funciones
  const columns = [
    {
      name: 'Mes',
      selector: row => row.Mes,
      maxWidth: '80px'
    },
    {
      name: 'Nombre',
      selector: row => `${row.Nombre}`,
      maxWidth: '160px'
    },
    {
      name: 'ID',
      selector: row => row.ID,
      maxWidth: '160px'
    },
    {
      name: 'Fecha de Ingreso',
      selector: row => `${row.FechaDeIngreso}`,
      maxWidth: '160px'
    },
    {
      name: 'Sueldo Bruto',
      selector: row => row.SueldoBruto,
      maxWidth: '110px'
    },
    {
      name: 'Division',
      selector: row => row.División,
      maxWidth: '110px'
    },
    {
      name: 'Area',
      selector: row => row.Area,
      maxWidth: '110px'
    },
    {
      name: 'Subarea',
      selector: row => row.Subarea,
      maxWidth: '110px'
    },
    {
      name: 'ID Lider',
      selector: row => row.IDLider,
      maxWidth: '160px'
    },
    {
      name: 'Nivel Jerárquico',
      selector: row => row.NivelJerárquico,
      maxWidth: '160px'
    },
    {
      name: 'Actualizar Foto',
      cell: row => (
        <button className='button'>
          <UploadCloud size={25} onClick={() => updateProfile()}></UploadCloud>
        </button>
      ),
      maxWidth: '160px'
    },
  ];

  //Estas son las columnas cuando se muestre la tabla con los filtros aplicados
  const newColumns = [
    {
      name: 'Mes',
      selector: row => row.Mes,
      maxWidth: '80px'
    },
    {
      name: 'Nombre',
      selector: row => row.Nombre,
      maxWidth: '160px'
    },
    {
      name: 'ID',
      selector: row => row.ID,
      maxWidth: '160px'
    },
    {
      name: 'Fecha de Ingreso',
      selector: row => row.FechaDeIngreso,
      maxWidth: '160px'
    },
    {
      name: 'Sueldo Bruto',
      selector: row => row.SueldoBruto,
      maxWidth: '110px'
    },
    {
      name: 'Division',
      selector: row => row.División,
      maxWidth: '110px'
    },
    {
      name: 'Area',
      selector: row => row.Area,
      maxWidth: '110px'
    },
    {
      name: 'Subarea',
      selector: row => row.Subarea,
      maxWidth: '110px'
    },
    {
      name: 'ID Lider',
      selector: row => row.IDLider,
      maxWidth: '160px'
    },
    {
      name: 'Nivel Jerárquico',
      selector: row => row.NivelJerárquico,
      maxWidth: '160px'
    },
    {
      name: '',
      cell: row => (
        <>{filtroTrabajadorNuevo(row.Mes, row.FechaDeIngreso) ? 'Trabajador contratado este mes' : ''}</>
      )
    },
    {
      name: 'Actualizar Foto',
      cell: row => (
        <button className='button'>
          <UploadCloud size={25} onClick={() => updateProfile()}>{row.FechaDeIngreso}</UploadCloud>
        </button>
      ),
      maxWidth: '160px'
    },
  ];

  //establecemos el valor del filtro segun el option del select
  const handlerChangeFiltro = (e) => {
    setFiltro(e.target.value);
  };
  //el valor del input por el cual se filtrará lo agregamos al state
  const valueOnChange = (e) => {
    setValueFiltro(e.target.value);
  };

  //funcion para filtrar datos
  const filtrarDatos = (value, datos) => {
    const datosFiltrados = datos.filter(element => element.Mes[0] === value)
    setNewData(datosFiltrados);
  };

  
  const resetearFiltros = () => {
    setNewData('');
    setValueFiltro('');
  };

  //manejador para abrir modal en el cual se carga la foto del trabajador seleccionado
  const updateProfile = () => {
    setShow(true);
  };

  //manejador para cerar modal
  const handleClose = () => {
    setShow(false);
  };

  //Manejador para guardar la foto y cerrar el modal
  const newHandleClose = () => {
    alert('Los cambios fueron guardados');
    setShow(false);
  };

  //Con este metodo vamos a comparar la fecha elegida para el reporte y la fecha de ingreso del trabajador
  //Si coinciden, entonces mostraremos el mensaje de que el trabajador fue contratado este mes
  const filtroTrabajadorNuevo = (fechaFiltro, fechaIngreso) => {
    const fechIngreso = fechaIngreso;
    const partesFecha = fechIngreso.split('/');
    const mes = partesFecha[1];
    const anio = partesFecha[2];
    const fechaFormateada = `${mes}-${anio}`;
    const mesFiltro = formatMonthYear(fechaFiltro);
    const esNuevo = (fechaFormateada === mesFiltro);
    return esNuevo;
  };

  //funcion para formatear la fecha y poder hacer la comparacion en filtroTrabajadorNuevo()
  const formatMonthYear = (dateStr) => {
    const [month, year] = dateStr.split('-');
    return `${month.padStart(2, '0')}-${year}`;
  };

  return (
    <>
      <div className='dashboard-container'>
        <div className='top-dashboard-container'>
          <div className='filtros-container'>
            <span className='span-filtro'>filtrar por:</span>
            <select onChange={handlerChangeFiltro} className='form-select' name='filtros-select' id='filtros-select'>
              <option key='' value=''>---Elija una opcion---</option>
              <option key='mes' value='mes'>Mes</option>
            </select>
            <input type='text' className='form-control' placeholder='ejemplo: enero = 1, febrero = 2' onChange={valueOnChange} />
            <button className='btn btn-dark' onClick={() => filtrarDatos(valueFiltro, data)}>Aplicar Filtro</button>
            <button className='btn btn-dark' onClick={() => resetearFiltros()}>Quitar Filtro</button>
          </div>
          <div className='print-container'>
            <Printer size={50} padding={70} onClick={() => window.print()} />
          </div>
          <div className='button-container'>
            <button className='btn btn-dark' onClick={goOrganigrama}>Volver al Organigrama</button>
          </div>
        </div>
        {/*Si se aplica el filtro, mostramos este datatable*/}
        {
          newData !== '' &&
          <>
            <DataTable
              columns={newColumns}
              data={newData}
              pagination
              paginationComponentOptions={paginationComponentOptions}
            />
            <div className='importe-container'>
              <span>{`Pago total en nómina del mes ${newData[0]?.Mes}:`}</span>
              <span className='span-filtro-importe'>{sumar(newData)} $</span>
            </div>
          </>
        }
        {/*De lo contrario, mostramos los datos en bruto*/}
        {
          newData === '' ? data.length > 0&&
          <>
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationComponentOptions={paginationComponentOptions}
            />
          </>
          :
          <></>
        }
        <UserModal show={show} handleClose={handleClose} newHandleClose={newHandleClose} />
      </div>
    </>
  )
}
