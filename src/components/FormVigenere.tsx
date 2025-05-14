import React, { Dispatch, FormEvent,ReactElement,SetStateAction,useState} from "react";
import VigenereCipher from "../lib/VigenereChip";
import showEye from '../assets/eye.svg'
import hideEye from '../assets/eye-slash.svg'

interface Props{
  setResult: Dispatch<SetStateAction<string | undefined>>;  
}

function FormVigenere(props:Props) : React.ReactElement{

  const [isValid, setIsValid] = useState<boolean>(true);
  
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const message = formData.get('messages') as string;
  const password = formData.get('password') as string;

  if(message === '' || password === ''){
     //alert ('Please fill in the form');
     setIsValid(false);
     return; 
  }
  if (!(e.nativeEvent instanceof SubmitEvent)) return;
  const submitter = e.nativeEvent.submitter;

  if (!(submitter instanceof HTMLButtonElement)) return;
  const action = submitter.value;

  const cipher = new VigenereCipher(password)

  if (action === 'encrypt') {
    props.setResult(cipher.encrypt(message));
  } else if (action === 'original') {
    props.setResult(cipher.decrypt(message));
  }
  setIsValid(true);
}

  function error(): ReactElement{
    if(isValid) return<></>

    return(
      <>
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Fill messages & password</span>
            </div>
        </div>
      </>
    )
  }

  return(
    <>
      {error()}
      <form onSubmit={handleSubmit}>
        <div className="mb4">
          <textarea 
          name="messages" 
          className='border-1 border-white p-2 w-full h-30'
          placeholder="Original of encrypted message"
          >
          </textarea>
        </div>
        <div className="mb-4">
          <input 
          type="text" 
          name="password"
          className='border-1 border-white p-2 w-full'
          placeholder="password"
          />
        </div>
        <div className="mb4 flex gap-4">
        <button
            type="submit"
            value="encrypt"

            className='w-1/2 flex items-center justify-center'
          >
            <span>Encrypt</span>
            <img src={hideEye} alt="hide eye" className="w-4 h-4" />
          </button>

          <button
            type="submit"
            value="original"
            className='w-1/2 flex items-center justify-center'
          >
            Original
            <img src={showEye} alt="show eye" className="w-4 h-4" />
          </button>

        </div>
      </form>
    </>
  );
}

export default FormVigenere;