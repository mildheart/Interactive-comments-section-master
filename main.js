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
      comment_container.innerHTML += individual_Comment(isCurrentUser(current_user,temp_user.user.username),temp_user.user.image.png,temp_user.score,temp_user.user.username,temp_user.createdAt,temp_user.content,"");
      
      if(temp_user.replies.length > 0){

        comment_container.innerHTML += addReplyDiv();

        let reply_container = document.querySelector('.replies');

        let formString = ''; 
        

        for(let i = 0; i < temp_user.replies.length; i++ )
        {
          let reply_temp_user = temp_user.replies[i];
          formString += individual_Comment(isCurrentUser(current_user,reply_temp_user.user.username),reply_temp_user.user.image.png,reply_temp_user.score,reply_temp_user.user.username,reply_temp_user.createdAt,reply_temp_user.content,("@"+reply_temp_user.replyingTo + " "));
        }

        reply_container.innerHTML = formString;

      }

    }

  }

  window.addEventListener('DOMContentLoaded',function(){
    settingUp();
  })

  function setOutSection(){
    return `<section class="Comments"></section>`;
  }

  function individual_Comment(isCurrentUser,profile_pic,object_score,user,period,content,username){

    if(isCurrentUser){
      return `
      <div class="individual_comment">
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
    <div class="individual_comment">
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
                  <p class="time_range">${period}</p>
              </div>
              <div class="reply_comment">
                  <img src="images/icon-reply.svg" alt="">
                  <p class="reply_button" onclick="
                    
                  ">
                      Reply
                  </p>
              </div>
          </div>
          <p class="main_info"><span class="Replied_user">${username}</span>${content}</p>
    </div> 
</div>`;
  }

  function addReplyDiv(){
    return `<div class="replies"></div>`;
  }
 
function isCurrentUser(currentUser,otherUser){
  if(currentUser === otherUser){
    return true
  }
  return false;
}

