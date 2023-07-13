const path = Runtime.getFunctions()['response-header'].path
const response = require(path).response()

exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient()
 
  let itemList = [];



      try{

        itemList = await client.sync.v1.services(context.TWILIO_SYNC_SERVICE_SID)
      .syncMaps(context.TWILIO_PARKED_INTERACTIONS_SYNC_MAP)
      .syncMapItems
      .list({limit: 100})
      
    
   
      }catch(e){
        console.error(e);
      }


      response.setBody(itemList);

    callback(null, response)
  
}
