import Form from 'react-bootstrap/Form'
import './ImportXlsx.css'

export const ImportXlsx = ({handlerFileChange, text}) => {
  return (
    <div className='input-container'>
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Label>{text}</Form.Label>
        <Form.Control type="file" onChange={handlerFileChange} />
      </Form.Group>
    </div>
  )
}
