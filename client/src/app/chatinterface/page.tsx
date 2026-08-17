// "use client"
import FreeTextToSpeech from "./Component/Texttospeech";
// import { useEffect, useState } from "react";

// function Chatpage() {
//     type User={
//         role:string;
//         content: string;
 
//     }
//     const [msges, setmsges] = useState<User[]>([]);
//     const [inpt, setinpt] = useState<string>("");
//     const [err,seterr]=useState<string>("");
//     function add() {
         
        
//     }

//     useEffect(()=>{
// getmsges();
//     },[]);


//     async function callapi(){
//             seterr("");
//         if(inpt===""){
//             seterr("first enter somethign ");
//         return;
//         }
//         if(msges.length>0&&msges[msges.length-1].content==="loading..."){
//              seterr("wait until first msg loading... will  finihed ");
//               return;
//         }
               
//         let newmsg=[...msges,{role:"user",content:inpt}];
//         setmsges(newmsg);
//         setmsges([...newmsg,{role:"model",content:"loading..."}]);

//           const  res=await fetch("http://localhost:5000/response",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 msgobj:{role:"user",content:inpt}
//             })
//           });
//           const data=await res.json();
//           newmsg=[...newmsg,{role:"model",content:data.res}];
//           setmsges(newmsg);
//           console.log(data.res);
//     }

//     async function getmsges(){
//         const response=await fetch("http://localhost:5000/messege")
//         const data=await response.json();
//        setmsges(data.msgarr);
        
//     }
//     return <>
//         <div className="bg-[#2b2929]  text-white text-md flex justify-center " >
            
//             <div className="bg-[#000000] w-120 h-screen  flex flex-col mx-2" >
//                  <div className="text-red-600 text-center" >{err}</div>
//               <div className="overflow-auto mx-4">

                   
//          {
//             msges.map((el)=>{
//                 return  <>
                    
//                           <div className="flex flex-col mb-7 gap-1">
//                         {
//                         (el.role==="user")?
//                         <div className="sender flex gap-2 ml-auto">
//                          <div>me:</div> {el?.content}
//                         </div>
//                         :
//                         <div className= "receiver flex gap-2">
//                            <div>ai:</div>   {el?.content}
//                         </div>
//                         }
//                     </div>
                    
//                 </>
//             })
//          }
         
//               </div>
 
//             <div className="mt-auto mb-10 w-full px-2 " >
//                 <div className="flex w-full gap-1" >
//                     <input type="text" className="  py-2 flex-1 border rounded-md px-3 py-2" value={inpt} onChange={(e) => { setinpt(e.target.value) }} />
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>{add();
//                             callapi();
//                             console.log(msges);
//                         }} >send</button>
//                 </div>
//             </div>

//             </div>

//         </div>
//     </>
// }
// export default Chatpage;

function Chatpage() {
 return <><FreeTextToSpeech text={"hello my name is shivang meena "}/></>   
}
export default Chatpage;

