import { useState } from 'react';
import DataTable from 'react-data-table-component'
import { paginationComponentOptions } from '../../utilities/DataTable/DataTableOptions'
import { ImportXlsx } from '../../components/Import/ImportXlsx'
import * as XLSX from 'xlsx'
import './Body.css'
import { useDispatch } from 'react-redux';
import { updateData } from '../../redux/features/datosXlsxSlice';
import { useNavigate } from 'react-router-dom';

export const Body = () => {
  //Dispatch de Redux Toolkit para enviar datos
  //de la previsualización al store
  const dispatch = useDispatch();
  //Navigate de react router dom para poder movernos entre componentes
  const navigate = useNavigate();

  //Definimos los estados de nuestro componente
  const [xlsxFile, setXlsxFile] = useState('');
  //por si detectamos un formato no admitido
  const [xlsxFileError, setXlsxFileError] = useState(false)
  //la data transformada a json, lista para mostrar en pre-visualizacion
  const [excelData, setExcelData] = useState('');

  //formamos las columnas del dataTable
  const columns = [
    {
      name: 'Mes',
      selector: row => row.Mes,
      maxWidth: '80px'
    },
    {
      name: 'Nombre',
      selector: row => `${row.Nombre}`,
      maxWidth: '110px'
    },
    {
      name: 'ID',
      selector: row => row.ID,
      maxWidth: '110px'
    },
    {
      name: 'Fecha de Ingreso',
      selector: row => `${row.FechaDeIngreso}`,
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
      selector: row => row.Area
    },
    {
      name: 'Subarea',
      selector: row => row.Subarea
    },
    {
      name: 'ID Lider',
      selector: row => row.IDLider
    },
    {
      name: 'NivelJerárquico',
      selector: row => row.NivelJerárquico
    },
    {
      name: 'NivelJerárquico',
      selector: row => row.NivelJerárquico
    },
  ];

  //Definimos los formatos admitidos
  const formatAcepted = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  
  //Al cargarse un archivo en el input tipo file, analisamos si se cargo algo
  //también analizamos si el type del formato está incluido dentro de nuestro array
  //de formatos admitidos
  const handlerFileChange = (e) => {

    let documentSelected = e.target?.files[0];

    if(documentSelected) {
      if(documentSelected&&formatAcepted.includes(documentSelected.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(documentSelected);
        reader.onload = (e) => {
          setXlsxFileError(false);
          setXlsxFile(e.target.result);
        }
      } else {
        setXlsxFileError(true)
      }
    } else {
      setXlsxFileError(true);
      setXlsxFile('')
    }
  }

  // Transformamos los datos del excel a un Json con la libreria XLSX
  // y la enviamos limpia para la previsualizacion
  const sendXlsx = () => {
    if(xlsxFile !== null) {
      const workBook = XLSX.read(xlsxFile, {type: 'buffer'});
      const workSheetName = workBook.SheetNames[0];
      const worksheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet)
      setExcelData(data);
    } else {
      setExcelData('')
    }
  };

  // Finalmente, si estamos de acuerdo con la previsualizacion, enviamos los
  // datos al stor de redux para mostrar estos datos en otra pagina, la cual será
  // el dashboard, donde tendremos otras funciones
  const postData = () => {
    dispatch(updateData(excelData));
    navigate(`/dashboard`, {replace: true});
  };

  return (
    <>
      <div className='xlsx-container'>
        <ImportXlsx handlerFileChange={handlerFileChange} text={`Selecciona un archivo tipo xls o xlsx`} />
        <button className='btn btn-dark' onClick={sendXlsx}>Previsualizar</button>
      </div>
      {
        xlsxFileError === true &&
          <span className='alert-msg'>Por favor, elija un archivo con extension .xls o xlsx</span>
      }
      {
        xlsxFileError === false &&
        <div className='datatable-container'>
          <DataTable
            columns={columns}
            data={excelData}
            pagination
            paginationComponentOptions={paginationComponentOptions}
          />
        </div>
      }
      <button onClick={() => postData()} className='btn btn-dark'>Enviar Datos</button>
    </>
  )
}
