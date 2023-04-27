import { Body } from '../../containers/BodyOrganigrama/Body'
import { Header } from './../../containers/Header/Header'
import './Organigrama.css'
export const Organigrama = () => {
  return (
    <div className='organigrama-container'>
      <Header />
      <Body />
    </div>
  )
}
