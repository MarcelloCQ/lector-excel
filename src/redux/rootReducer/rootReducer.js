import { combineReducers } from 'redux';
import datosXlsxSlice from '../features/datosXlsxSlice';

const rootReducer = combineReducers({
  datosXlsx: datosXlsxSlice,
});

export default rootReducer;