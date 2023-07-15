import Image from 'next/image'
import Script from 'next/script'
import getData from '../api/firebase/firestore/getData'

export default function ViewNames() {


      async function spitOutAnArray(){
        const names = await getData()

       // console.log(names);
        return names;
      }
      setInterval(spitOutAnArray,10000);
      

  return (
    <main className="min-h-screen">
        <div>
            <h1>{spitOutAnArray().map(txt => <p>{txt}</p>)}</h1>
        </div>
    </main>
  )
}
