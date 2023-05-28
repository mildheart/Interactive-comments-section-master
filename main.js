const commentObject = {
    "currentUser": {
      "image": { 
        "png": "images/avatars/image-juliusomo.png",
        "webp": "images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "images/avatars/image-amyrobson.png",
            "webp": "images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "images/avatars/image-maxblagun.png",
            "webp": "images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "images/avatars/image-ramsesmiron.png",
                "webp": "images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "images/avatars/image-juliusomo.png",
                "webp": "images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
  }

  

  let section_container = document.querySelector('.main_containter');

  function settingUp(){

    section_container.innerHTML = setOutSection();

    let comment_container = document.querySelector('.Comments');

    comment_container.innerHTML += '';
    let current_user = commentObject.currentUser.username;

    for(let i=0; i < commentObject.comments.length; i++)
    {
      temp_user = commentObject.comments[i];
      comment_container.innerHTML += individual_Comment(isCurrentUser(current_user,temp_user.user.username),temp_user.user.image.png,temp_user.score,temp_user.user.username,temp_user.createdAt,temp_user.content,"",temp_user.id);
      
      if(temp_user.replies.length > 0){

        let out_container =document.getElementById(temp_user.id);
        out_container.innerHTML += addReplyDiv(temp_user.id);
        //let getIndex = '#' + i;
      // console.log('reply'+i);
        let reply_container = document.getElementById('replyContainer'+temp_user.id);

        //console.log(reply_container);

        let formString = ''; 
        

        for(let n = 0; n < temp_user.replies.length; n++ )
        {
          let reply_temp_user = temp_user.replies[n];
          formString += individual_Comment(isCurrentUser(current_user,reply_temp_user.user.username),reply_temp_user.user.image.png,reply_temp_user.score,reply_temp_user.user.username,reply_temp_user.createdAt,reply_temp_user.content,("@"+reply_temp_user.replyingTo + " "),reply_temp_user.id);
        }

        reply_container.innerHTML += formString;

      }

    }

   
  }

  window.addEventListener('DOMContentLoaded',settingUp)

  function setOutSection(){
    return `<section class="Comments"></section>`;
  }

  function individual_Comment(isCurrentUser,profile_pic,object_score,user,period,content,username,id){

    if(isCurrentUser){
      return `
      <div class="individual_comment" id="currentUser${id}">
        <div class="inner_control">
          <button><img src="images/icon-plus.svg" alt="Plus button"></button>
          <p class= "score">${object_score}</p>
          <button><img src="images/icon-minus.svg" alt="Minus button"></button>
        </div>
        <div class="out_container">
            <div class="details">
                <div class="header">
                    <img src=${profile_pic} alt="profile picture" class="profile_pic">
                    <p class="Name">${user}</p> 
                    <p class="you_tag">you</p>
                    <p class="time_range">${period}</p>
                </div>
                <div class="reply_comment">
                   <button class="current_user_DelButton same_feature"><img src="images/icon-delete.svg" alt="Delete Button"> Delete </button>
                   <button class="current_user_EditButton same_feature"><img src="images/icon-edit.svg" alt="Edit Button"> Edit</button>
                </div>
            </div>
            <p class="main_info"><span class="Replied_user">${username}</span>${content}</p>
      </div> 
  </div>`;
    }

    return `
    <div class="out_container" id="${id}">
      <div class="individual_comment">
        <div class="inner_control">
          <button><img src="images/icon-plus.svg" alt="Plus button"></button>
          <p class= "score">${object_score}</p>
          <button><img src="images/icon-minus.svg" alt="Minus button"></button>
        </div>
        <div class="sub_container">
            <div class="details">
                <div class="header">
                    <img src=${profile_pic} alt="profile picture" class="profile_pic">
                    <p class="Name">${user}</p> 
                    <p class="time_range">${period}</p>
                </div>
                <div class="reply_comment">
                    <img src="images/icon-reply.svg" alt="">
                    <p class="reply_button" onclick="
                        replyUser(${id}, event)
                    ">
                        Reply
                    </p>
                </div>
            </div>
            <p class="main_info"><span class="Replied_user">${username}</span>${content}</p>
      </div> 
  </div>
    <div class="current_reply_div hidden">
    <img src='images/avatars/image-juliusomo.png' alt="profile picture" class="profile_pic">
    <textarea cols="50" rows="3" placeholder="reply message"  class="textarea" ></textarea>
    <button class="replyButton">REPLY</button>
  </div>
</div>`;
  }

  function addReplyDiv(id){
    return `<div class="replies" id = "replyContainer${id}" ></div>`;
  }
 
function isCurrentUser(currentUser,otherUser){
  if(currentUser === otherUser){
    return true
  }
  return false;
}


function replyUser(id, Evt){

  let getReplyButton = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  let userName = event.target.parentElement.parentElement.parentElement.querySelector('.Name');

  console.log(getReplyButton);
  let textAreaDiv = getReplyButton.querySelector('.current_reply_div');

  
  //userName.textContent
  if(!textAreaDiv.classList.contains('visibility')){
    textAreaDiv.classList.add('visibility');
    let textarea = textAreaDiv.querySelector('textarea');
    let reply_btn = textAreaDiv.querySelector('.replyButton');
    let getId = getReplyButton.getAttribute('id');

    console.log(getId);
    textarea.value = "@"+ userName.textContent;

    reply_btn.addEventListener('click', function(){
      
        if(('' + textarea.value).trim().length > ('@'+userName.textContent).length && ('' + textarea.value).includes('@'+userName.textContent)){
          
           if(getId === '1'){
           
            let content = ('' + textarea.value).substring(('@'+userName.textContent).length+1);

            let UserObject = {
              "id":incrementId(),
              "content": content,
              "createdAt": getRandomWeek(),
              "score": getRandomScore(),
              "replyingTo": userName.textContent,
              "user": {
                "image": { 
                  "png": "images/avatars/image-juliusomo.png",
                  "webp": "images/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo"
              }
            };
            
            commentObject.comments[0].replies.push(UserObject);
            textarea.value = ""; 
            textAreaDiv.classList.remove('visibility');
            populateReplyDiv(0,getReplyButton,getId)
            
           

           }
           else if(getId === '2'){
            console.log('am inside id is ' + getId);
            console.log(getRandomDay());
            let content = ('' + textarea.value).substring(('@'+userName.textContent).length+1);

            let UserObject = {
              "id":incrementId(),
              "content": content,
              "createdAt": getRandomWeek(),
              "score": getRandomScore(),
              "replyingTo": userName.textContent,
              "user": {
                "image": { 
                  "png": "images/avatars/image-juliusomo.png",
                  "webp": "images/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo"
              }
            };
            console.log(getId);
            console.log(UserObject);
            commentObject.comments[1].replies.push(UserObject);
            textarea.value = "";
            textAreaDiv.classList.remove('visibility');
            populateReplyDiv(1,getReplyButton,getId)
            console.log(commentObject);

           
           }
           else if (getId === '3'){
            console.log('am inside id is ' + getId);
            console.log(getRandomDay());
            let content = ('' + textarea.value).substring(('@'+userName.textContent).length+1);

            let UserObject = {
              "id":incrementId(),
              "content": content,
              "createdAt": getRandomWeek(),
              "score": getRandomScore(),
              "replyingTo": userName.textContent,
              "user": {
                "image": { 
                  "png": "images/avatars/image-juliusomo.png",
                  "webp": "images/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo"
              }
            };
            console.log(getId);
            console.log(UserObject);
            commentObject.comments[1].replies.push(UserObject);
            textarea.value = "";
            textAreaDiv.classList.remove('visibility');
            populateReplyDiv(1,getReplyButton,'2');
            console.log(commentObject);

           }
        }
        
    });

  }
 
  

}

function getRandomScore()
{
  return Math.floor(Math.random() * 20);
}

function incrementId(){
  let max_id = 0;

  for(let i =0; i < commentObject.comments.length; i++)
  {
    if(commentObject.comments[i].id > max_id)
        max_id = commentObject.comments[i].id;
     
    for(let n=0; n  < commentObject.comments[i].replies.length; n++){
      if(commentObject.comments[i].replies[n].id > max_id)
      max_id = commentObject.comments[i].replies[n].id;
    }    
  }
  max_id += 1;
  return max_id ;
}

function getRandomWeek(){
  let selected = Math.floor(Math.random() * 3); 
  return '' + (selected == 1 ?  selected+' week ago' : selected+ ' weeks ago');
}

function getRandomDay(){
  
  let selected = Math.floor(Math.random() * 6); 
  return '' + (selected == 1 ? selected+' day ago' : selected+' days ago');
}


function populateReplyDiv(index,current_reply_div,id){

  let current_user = commentObject.currentUser.username;
    
    if(document.getElementById(`replyContainer${id}`) == null){
      current_reply_div.innerHTML += addReplyDiv(id);
        let temp = document.getElementById(`replyContainer${id}`);
        let formString = ''; 

        for(let i = 0; i < commentObject.comments[index].replies.length; i++){
          let reply_temp_user = commentObject.comments[index].replies[i];

          formString += individual_Comment(isCurrentUser(current_user,reply_temp_user.user.username),reply_temp_user.user.image.png,reply_temp_user.score,reply_temp_user.user.username,reply_temp_user.createdAt,reply_temp_user.content,("@"+reply_temp_user.replyingTo + " "),reply_temp_user.id);
        }

        temp.innerHTML = formString;

    }else{

      let temp = document.getElementById(`replyContainer${id}`);
      let formString = ''; 

      for(let i = 0; i < commentObject.comments[index].replies.length; i++){
        let reply_temp_user = commentObject.comments[index].replies[i];

        formString += individual_Comment(isCurrentUser(current_user,reply_temp_user.user.username),reply_temp_user.user.image.png,reply_temp_user.score,reply_temp_user.user.username,reply_temp_user.createdAt,reply_temp_user.content,("@"+reply_temp_user.replyingTo + " "),reply_temp_user.id);
      }

      temp.innerHTML = formString;

    }

}


