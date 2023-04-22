import { useState } from 'react'
import './WelcomeForm.css'

export default function WelcomeForm() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  function editInput(){
    setStatus('typing');
  }

  if (status === 'success'){
    return(
      <div className='welcome'>
      <div className='welcome welcome-title'>
        <div className='title-1'>Welcome </div> 
        <div className='title-2'><div className='boxed welcome-name'>{fname} {lname}</div>.</div>
      </div>
      <button 
        className='btn edit'
        onClick={editInput}>
        Edit
      </button>
      </div>
    )
  }

  async function handleSubmit(e){
    e.preventDefault();
    setStatus('submitting');
    try {
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleFNameChange(e){
    setFName(e.target.value);
  }
  function handleLNameChange(e){
    setLName(e.target.value);
  }

  return(
    <div className='nameForm'>
      <div className='title'>
      Enter Your
      <div className="boxed">Name</div>
      </div>

      <form onSubmit={handleSubmit}>

      <div className='textfields'>
      <input
        type="text"
        required="required"
        value={fname}
        onChange={handleFNameChange}
        disabled={status === 'submitting'}
      />
      <span>First Name</span>
      </div>
      <div className='textfields'>
      <br/>
      <input
        type="text"
        required="required"
        value={lname}
        onChange={handleLNameChange}
        disabled={status === 'submitting'}
      />
      <span>Last Name</span>
      </div>
      
      <button 
        className='btn submit'
        disabled={
        (fname.length === 0 && lname.length === 0) || status === 'submitting'
      }>
        Submit
      </button>

      {error != null &&
        <p className="Error">
          {error.message}
        </p>
      }

      </form>
    </div>
  )
}