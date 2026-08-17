import Mainparent from "./Component/Mainparent"
type propsparam={
    params:{inid:string}
}
async function Chat({params}:propsparam) {
     const {inid}=await params;
    return <>
    <Mainparent inid={inid}/>
    </>
}
export default Chat;