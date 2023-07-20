import sendCode from "./api/firebase/rtdb/sendCode";


let date = new Date().toUTCString().slice(0, 16);

export default function codeGen(){
    function TSH(s: string) {
        for (var i = 0, h = 9; i < s.length; )
          h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
        return h ^ (h >>> 9);
        //ACTUALLY COPIED
      }
      
      var codeRef = Math.abs(TSH(date) % 100);
      sendCode(codeRef);
      return codeRef;  
}
