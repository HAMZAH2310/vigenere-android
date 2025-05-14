import { ReactElement } from "react";

interface Props {
  result: string | undefined
}

function Result({result}: Props):ReactElement{

  function copyToClipboard(text:string){
    const button = document.getElementById('button-copy') as HTMLButtonElement;
    button.textContent = 'Copied';
    setTimeout(() => {
      button.textContent = 'Copy';
    },1000
  );

    //copy text to clipboard
    navigator.clipboard.writeText(text);
  }

  if(result) {
    return(
      <>
        <button 
        onClick={() => copyToClipboard(result)}
        id="button-copy"
        className='mb-2 font-medium text-blue-600 dark:text-blue-500 hover:underline !p-0 !border-transparent !bg-transparent focus:!outline-none'>
          Copy
        </button>
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="result">
            {result}
          </div>
        </div>
      </>
    )
  } else{
    return <></>
  }
}

export default Result;