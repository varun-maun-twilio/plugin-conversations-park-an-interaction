import { MessagingCanvas } from "@twilio/flex-ui";
import { useEffect, useState } from "react";
import './styles.css'


export function ParkedInteractionsView(props) {
  

    const [localList,setLocalList] = useState(null);
    const [messageHistoryRef,setMessageHistoryRef] = useState(null);

    useEffect(()=>{

        getParkedInteractions();

    },[]);

    useEffect(()=>{},[messageHistoryRef])


    const unparkInteraction = async (convId)=>{
        await fetch(`${process.env.FLEX_APP_URL_UNPARK_AN_INTERACTION}?ConversationSid=${convId}`);
    }


    const getParkedInteractions = async ()=>{

        try{
        const interactionList = await fetch(process.env.FLEX_APP_URL_FETCH_PARKED_INTERACTIONS).then(d=>d.json());

        setLocalList( [...interactionList]);


        }catch(e){
            console.error(e);
        }
    }


    if(localList==null){
        return <h2>Loading...</h2>
    }


    return (

    <div className="parkedConversations">
        <h2>Parked Conversations:</h2>

<table>
    <tr>
        <td>

        <ul>
         {
             localList.map((x,xIter)=>(
                 <li key={"parkeditem-"+xIter}>
                      {x.key} <button onClick={()=>unparkInteraction(x.key)}>Reopen</button>  <button onClick={()=>setMessageHistoryRef(x.key)}>Read Transcript</button>
                 </li>
             ))
         }

        
     </ul>
        </td>

        <td>

         {messageHistoryRef!=null && 
         <div style={{height:600,display:'flex'}}>
        <MessagingCanvas  autoInitConversation={true} sid={messageHistoryRef}   >
    </MessagingCanvas>
    </div>
}
        </td>
    </tr>
    </table>



    



     </div>
    );
  }
  