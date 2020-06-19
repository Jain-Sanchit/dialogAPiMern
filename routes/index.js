const express = require("express");
const router = express.Router();
 const dialogflow = require("dialogflow");


router.get("/list", (req, res) => {
    console.log("HIIII");
    
 

  const cred1 = require("../credentials.json");
  const cred2 = require("../credentials2.json");
  var cred = cred1,
    projectId = "street-smarts-smnxba";
//   if (req.user.name === "Sanchit") {
//     cred = cred1;
//     projectId = "street-smarts-smnxba";
//   } else {
//     cred = cred2;
//     projectId = "chaty-1-olru";
//   }
  // console.log("hii");
  // console.log(projectId);
  
  
// cred=cred1;
// projectId = "street-smarts-smnxba";
  const entitiesClient = new dialogflow.EntityTypesClient({
    credentials: cred,
  });
  // console.log(cred);

  const agentPath = entitiesClient.projectAgentPath(projectId);

  entitiesClient.listEntityTypes({ parent: agentPath }).then((responses) => {
    const resources = responses[0];
    var ans = [];
    // var ress=JSON.stringify(resources.entities)
    for (let i = 0; i < resources.length; i++) {
      var entt=[];
      for (let j = 0; j < resources[i].entities.length; j++) {
        // console.log("Hpi");
        entt=[...entt,resources[i].entities[j]]
        //console.log(entt);
        
      }
      //console.log(entt);
      
      var li = {
        display: resources[i].displayName,
        entities: entt
      };
      //console.log("EE");
      
      //console.log(resources[i]);
      
      ans = [...ans, li];
    }
   
    //console.log(ans);
    
    res.status(200).json(ans);
  });
});

router.post('/add',(req,res)=>{
  console.log("DHSHSJ");
  
  console.log(req.body);
  
    const {name , kind,value,synonyms}=req.body;
  //   //console.log(value);
  //  // console.log(synonyms);

    // const dialogflow = require("dialogflow");

    const cred1 = require("../credentials.json");
    const cred2 = require("../credentials2.json");
    var cred, projectId;
  //   //console.log(req.user);
    
  //   if(req.user.name === "Sanchit" ){
  //       cred=cred1;
  //       projectId = "street-smarts-smnxba";
  //   }
  //   else{
  //       cred=cred2;
  //        projectId = "chaty-1-olru";
  //   }
  cred=cred1;
  projectId="street-smarts-smnxba";
    const entitiesClient = new dialogflow.EntityTypesClient({ 
      credentials: cred,
    });
  //  // console.log(cred);      
    
    const agentPath = entitiesClient.projectAgentPath(projectId);

    var entt=[];
    var synn=synonyms.split(",");
    //console.log(synn);
    
    for (let i = 0; i <1; i++) {
      
      
        var syn = synn
        //console.log(syn);
        var enttt={
            value: value,
            synonyms: syn
        }
        //console.log(enttt)
        entt=[...entt , enttt]
    }
    //console.log(entt)
    // var syn=synonyms.split(",");
    // console.log(syn);

    

    let Enty = name + "EntityType";
    let reqs=name+"Request"
     Enty = {
      displayName: name,
      kind: kind,
      entities:entt,
    };
   reqs = {
      parent: agentPath,
      entityType: Enty,
    };
    
    entitiesClient
      .createEntityType(reqs)
      .then((response) => {
        console.log("Created new entity: ", JSON.stringify(response[0]));
        res.status(200).setHeader('Content-Type', 'text/plain')
      })
      .catch((err) => {
        console.error("Error creating entity : ", err);
        
      });

      // res.status(422).json("error")
})

router.post('/update',(req,res)=>{
  console.log("DHSHSJ");

  console.log(req.body);

  const { name, kind, value, synonyms } = req.body;
  //   //console.log(value);
  //  // console.log(synonyms);

  // const dialogflow = require("dialogflow");

  const cred1 = require("../credentials.json");
  const cred2 = require("../credentials2.json");
  var cred, projectId;
  //   //console.log(req.user);

  //   if(req.user.name === "Sanchit" ){
  //       cred=cred1;
  //       projectId = "street-smarts-smnxba";
  //   }
  //   else{
  //       cred=cred2;
  //        projectId = "chaty-1-olru";
  //   }
  cred = cred1;
  projectId = "street-smarts-smnxba";
  const entitiesClient = new dialogflow.EntityTypesClient({
    credentials: cred,
  });
  //  // console.log(cred);      

  const agentPath = entitiesClient.projectAgentPath(projectId);

  var entt = [];
  var synn = synonyms.split(",");
  entitiesClient
    .listEntityTypes({ parent: agentPath })
    .then(responses => {
      const resources = responses[0]
      for (let i = 0; i < resources.length; i++) {
        const entity = resources[i];
        if (entity.displayName === name) {
          return entity;
        }

      }
      throw new EntityNotFoundError();
    }).then(entity => {
      console.log('Found entity : ', JSON.stringify(entity));
      const updateEntityList = [
        { value: value, synonyms: synn }
      ]
      entity.entities = updateEntityList;
      const request = {
        entityType: entity,
        updateMask: {
          paths: ['entities']
        }
      }
      return entitiesClient.updateEntityType(request)
      res.status(200)
    })
    .then(res => {
      console.log('Updates Entity type :', JSON.stringify(res[0]));

    })
    .catch(err => {
      if (err instanceof EntityNotFoundError) {
        console.error('Could not find entity named such')
        return;
      }
      console.error('Error Updating ', err)
    })

})


router.post('/delete',(req,res)=>{
  console.log("DHSHSJ");

  console.log(req.body);

  const { name } = req.body;
  //   //console.log(value);
  //  // console.log(synonyms);

  // const dialogflow = require("dialogflow");

  const cred1 = require("../credentials.json");
  const cred2 = require("../credentials2.json");
  var cred, projectId;
  //   //console.log(req.user);

  //   if(req.user.name === "Sanchit" ){
  //       cred=cred1;
  //       projectId = "street-smarts-smnxba";
  //   }
  //   else{
  //       cred=cred2;
  //        projectId = "chaty-1-olru";
  //   }
  cred = cred1;
  projectId = "street-smarts-smnxba";
  const entitiesClient = new dialogflow.EntityTypesClient({
    credentials: cred,
  });
  //  // console.log(cred);      

  const agentPath = entitiesClient.projectAgentPath(projectId);
  class EntityNotFoundError extends Error { };
  entitiesClient
  .listEntityTypes({ parent: agentPath })
    .then(responses => {
      const resources = responses[0]
      for (let i = 0; i < resources.length; i++) {
        const entity = resources[i];
        if (entity.displayName === name) {
          return entity;
        }

      }
      
      throw new EntityNotFoundError();
    })
    .then(entity => {
      console.log('Found entity : ', JSON.stringify(entity));
      
      const request={
        name: name
      }
      
      return entitiesClient.deleteEntityType(entity);
      res.status(200).json("Deleted")
    })
    .catch(err => {
      if (err instanceof EntityNotFoundError) {
        console.error('Could not find entity named such')
        res.json("Could not find entity named such")
        return;
      }
      console.error('Error Updating ', err)
      res.json("Try Again !")
    })
})

module.exports = router;