'use strict';

fetch('./data.json')
  .then((response) => response.json())
  .then((json) => {
    if(localStorage.user) {
      json = JSON.parse(localStorage.user);
    } 
    let container = document.querySelector('.container');
    let commentsAmount = json['comments'].forEach(function(item) {createComment(item, container, json)});
    document.querySelector('.type img').src = json.currentUser.image.webp;
    container.append(document.querySelector('.type'));
    
    
    container.addEventListener('click', event => {
      if(event.target.textContent == '+') {
        if(event.target.nextElementSibling.dataset.liked == '0') {
          event.target.nextElementSibling.textContent = `${parseInt(event.target.nextElementSibling.textContent) + 1}`;
          event.target.nextElementSibling.dataset.liked = '1';
          event.target.classList.add('clicked');
        } else if(event.target.nextElementSibling.dataset.liked == '-1') {
          event.target.nextElementSibling.textContent = `${parseInt(event.target.nextElementSibling.textContent) + 2}`;
          event.target.nextElementSibling.dataset.liked = '1';
          event.target.classList.add('clicked');
          event.target.closest('.like').lastElementChild.classList.remove('clicked');
        } else if(event.target.nextElementSibling.dataset.liked == '1') {
          event.target.nextElementSibling.textContent = `${parseInt(event.target.nextElementSibling.textContent) - 1}`;
          event.target.nextElementSibling.dataset.liked = '0';
          event.target.classList.remove('clicked');
        }

        json.comments.find(function(item) {return deepSearchScore(item)});

      } else if(event.target.textContent == '-') {
        if(event.target.previousElementSibling.dataset.liked == '0') {
          event.target.previousElementSibling.textContent = `${parseInt(event.target.previousElementSibling.textContent) - 1}`;
          event.target.previousElementSibling.dataset.liked = '-1';
          event.target.classList.add('clicked');
        } else if(event.target.previousElementSibling.dataset.liked == '1') {
          event.target.previousElementSibling.textContent = `${parseInt(event.target.previousElementSibling.textContent) - 2}`;
          event.target.previousElementSibling.dataset.liked = '-1';
          event.target.classList.add('clicked');
          event.target.closest('.like').firstElementChild.classList.remove('clicked');
        } else if(event.target.previousElementSibling.dataset.liked == '-1') {
          event.target.previousElementSibling.textContent = `${parseInt(event.target.previousElementSibling.textContent) + 1}`;
          event.target.previousElementSibling.dataset.liked = '0';
          event.target.classList.remove('clicked');
        }    
        
        json.comments.find(function(item) {return deepSearchScore(item)});
        
      } else if(event.target.textContent == 'Reply') {
        let reply = document.createElement('div');
        reply.classList.add('comment', 'type', 'answer');
        event.target.closest('.comment').after(reply);
        reply.innerHTML = document.querySelector('.type:has(button.send)').innerHTML;
        document.querySelector('.answer > button').textContent = 'REPLY'
        document.querySelector('.answer > button').classList.remove('send');
        let replyCancelWrapper = document.createElement('div');
        replyCancelWrapper.classList.add('reply-cancel');
        let cancelReply = document.createElement('button');
        cancelReply.textContent = 'CANCEL';
        let textareaLabel = document.createElement('label');
        textareaLabel.for = 'reply-label';
        textareaLabel.textContent = `@${event.target.closest('.comment').querySelector('.wrapper p').textContent} `;
        replyCancelWrapper.append(document.querySelector('.answer button'), cancelReply)
        reply.append(textareaLabel, replyCancelWrapper);
        reply.style.width = getComputedStyle(event.target.closest('.comment')).width;
        reply.style.marginLeft = getComputedStyle(event.target.closest('.comment')).marginLeft;
        document.querySelector('.answer > textarea').id = 'reply-label';
        document.querySelector('.answer > textarea').style.textIndent = parseFloat(getComputedStyle(textareaLabel).width) + 10 + 'px';
        document.querySelector('.answer > textarea').focus();


        document.querySelector('.answer > textarea').addEventListener('input', textareaInput);
        document.querySelector('.answer .reply-cancel').addEventListener('click', function replyClick(event) {
          if(event.target.textContent == 'REPLY') {
            let obj = {
              content: `${event.target.closest('.answer').querySelector('textarea').value}`,
              createdAt: 'now',
              id: 'none',
              replyingTo: `${event.target.closest('.answer').querySelector('label').textContent}`,
              score: 0,
              "user": {
                "image": { 
                  "png": "./images/avatars/image-juliusomo.png",
                  "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo",
              },
            };

            let jsonAndReplies = json.comments.concat(json.comments.reduce((acc, item) => {
              if(item.replies?.length) {
                item.replies.forEach(reply => acc.push(reply));
              } 
              return acc;
            }, []));
            let replyToDataUser = jsonAndReplies.find(item => item.user.username == event.target.closest('.answer').previousElementSibling.querySelector('.head p').textContent);
            if(!replyToDataUser.hasOwnProperty('replies')) {
              replyToDataUser.replies = [];
            }
            replyToDataUser.replies.push(obj);

            if(event.target.closest('.comment-wrapper').querySelector('.reply-container')) {
              let comment = createComment(obj, event.target.closest('.comment-wrapper').querySelector('.reply-container'), json, true);
              comment.classList.add('reply');
              let replyToUserName = document.createElement('span');
              replyToUserName.textContent = `@${event.target.closest('.answer').previousElementSibling.querySelector('.head p').textContent} `;
              comment.querySelector('.body').prepend(replyToUserName);
              event.target.closest('.comment-wrapper').querySelector('.reply-container').append(comment);
            } else {
              let replyContainer = document.createElement('div');
              replyContainer.classList.add('reply-container');
              let comment = createComment(obj, event.target.closest('.comment-wrapper'), json, true);
              comment.classList.add('reply');
              let replyToUserName = document.createElement('span');
              replyToUserName.textContent = `@${event.target.closest('.answer').previousElementSibling.querySelector('.head p').textContent} `;
              comment.querySelector('.body').prepend(replyToUserName);
              replyContainer.append(comment);
              event.target.closest('.comment-wrapper').append(replyContainer);
            }
            
            document.querySelector('.answer > textarea').removeEventListener('input', textareaInput);
            document.querySelector('.answer .reply-cancel').removeEventListener('click', replyClick);
            document.querySelector('.answer').remove();
          } else if(event.target.textContent == 'CANCEL') {
            document.querySelector('.answer > textarea').removeEventListener('input', textareaInput);
            document.querySelector('.answer .reply-cancel').removeEventListener('click', replyClick);
            document.querySelector('.answer').remove();
          } 
        })
      } else if(event.target.textContent == 'Edit') {
        let reply = document.createElement('div');
        reply.classList.add('comment', 'type', 'answer');
        event.target.closest('.comment').after(reply);
        reply.innerHTML = document.querySelector('.type:has(button.send)').innerHTML;
        document.querySelector('.answer > button').textContent = 'UPDATE'
        document.querySelector('.answer > button').classList.remove('send');
        let replyCancelWrapper = document.createElement('div');
        replyCancelWrapper.classList.add('reply-cancel');
        let cancelReply = document.createElement('button');
        cancelReply.textContent = 'CANCEL';
        let textareaLabel = document.createElement('label');
        textareaLabel.for = 'reply-label';
        textareaLabel.textContent = `${event.target.closest('.comment').querySelector('.body span')?.textContent ?? ''}`;
        replyCancelWrapper.append(document.querySelector('.answer button'), cancelReply)
        reply.append(textareaLabel, replyCancelWrapper);
        reply.style.width = getComputedStyle(event.target.closest('.comment')).width;
        reply.style.marginLeft = getComputedStyle(event.target.closest('.comment')).marginLeft;
        document.querySelector('.answer > textarea').id = 'reply-label';
        if(textareaLabel.textContent == '') {
          document.querySelector('.answer > textarea').style.textIndent = parseFloat(getComputedStyle(textareaLabel).width) + 'px';
        } else {
          document.querySelector('.answer > textarea').style.textIndent = parseFloat(getComputedStyle(textareaLabel).width) + 10 + 'px';
        }
        document.querySelector('.answer > textarea').value = `${event.target.closest('.comment').querySelector('.body').lastChild.data}`;
        event.target.closest('.comment').style.display = 'none';
        document.querySelector('.answer > textarea').focus();

        document.querySelector('.answer > textarea').addEventListener('input', textareaInput);
        document.querySelector('.answer .reply-cancel').addEventListener('click', function replyClick(event) {
          if(event.target.textContent == 'UPDATE') {   
            
            if(event.target.closest('.reply-container')) {
              let initialData = event.target.closest('.reply-container').querySelector('.comment.reply[style*="display: none"] .body').lastChild;
              json.comments.find(function(item, index, arr) {return deepSearch(item, index, arr, initialData)});
              initialData.data = document.querySelector('.answer > textarea').value;
              document.querySelector('.answer > textarea').removeEventListener('input', textareaInput);
              document.querySelector('.answer .reply-cancel').removeEventListener('click', replyClick);
              event.target.closest('.reply-container').querySelector('.comment.reply[style*="display: none"]').style.display = '';
              document.querySelector('.answer').remove();
            } else {
              let initialData = event.target.closest('.comment-wrapper').querySelector('.comment[style*="display: none"] .body').lastChild;
              json.comments.find(function(item, index, arr) {return deepSearch(item, index, arr, initialData)});
              initialData.data = document.querySelector('.answer > textarea').value;
              document.querySelector('.answer > textarea').removeEventListener('input', textareaInput);
              document.querySelector('.answer .reply-cancel').removeEventListener('click', replyClick);
              event.target.closest('.comment-wrapper').querySelector('.comment[style*="display: none"]').style.display = '';
              document.querySelector('.answer').remove();
            }
            
            
          } else if(event.target.textContent == 'CANCEL') {
            document.querySelector('.answer > textarea').removeEventListener('input', textareaInput);
            document.querySelector('.answer .reply-cancel').removeEventListener('click', replyClick);
            if(event.target.closest('.reply-container')) {
              event.target.closest('.reply-container').querySelector('.comment.reply[style*="display: none"]').style.display = '';
            } else {
              event.target.closest('.comment-wrapper').querySelector('.comment[style*="display: none"]').style.display = '';
            }
            document.querySelector('.answer').remove();
            
          } 
        })
      } else if(event.target.textContent == 'Delete') {
        let target = event.target;
        document.querySelector('.delete-message-bg').style.display = 'block';
        document.querySelector('.delete-message-bg').style.top = window.scrollY + 'px';
        document.body.classList.add('stop-scroll');

        document.querySelector('.delete-message-bg').addEventListener('click', function confirmDelete(event) {
          if(event.target.textContent == 'NO, CANCEL') {
            document.querySelector('.delete-message-bg').style.display = 'none';
            document.body.classList.remove('stop-scroll');
            document.querySelector('.delete-message-bg').removeEventListener('click', confirmDelete);
          } else if(event.target.textContent == 'YES, DELETE') {
            let initialData = target.closest('.comment').querySelector('.body').lastChild;
            json.comments.find(function(item, index, arr) {return deepSearch(item, index, arr, initialData, true)});
            if(target.closest('.comment-wrapper').children.length == 1) {
              target.closest('.comment-wrapper').remove();
            } else {
              target.closest('.comment').remove();
            }

            document.querySelector('.delete-message-bg').style.display = 'none';
            document.body.classList.remove('stop-scroll');
            document.querySelector('.delete-message-bg').removeEventListener('click', confirmDelete);
          }
        })
      } else if(event.target.textContent == 'SEND') {
        let obj = {
          content: `${event.target.closest('.comment.type').querySelector('textarea').value}`,
            createdAt: 'now',
            id: 'none',
            replyingTo: ``,
            score: 0,
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo",
            },
        }
        createComment(obj, container, json);
        container.append(event.target.closest('.comment.type'));
        event.target.closest('.comment.type').querySelector('textarea').value = '';
        json.comments.push(obj);
      }
    })

    window.addEventListener('beforeunload', function unloadPage(event) {
      window.localStorage.setItem('user', JSON.stringify(json));
      window.removeEventListener('beforeunload', unloadPage);
    })
  });


function createComment(item, container, json, reply = false) {
  let arr = [];
  for(let div = 0; div < 6; div++) {
    arr.push(document.createElement('div'));
  }
  let [comment, like, head, wrapper, body, commentWrapper] = [...arr];
  commentWrapper.classList.add('comment-wrapper');
  comment.classList.add('comment');    
  like.classList.add('like');    
  head.classList.add('head');    
  wrapper.classList.add('wrapper');    
  body.classList.add('body');    
  let likeButton = document.createElement('button');
  likeButton.textContent = '+';
  let dislikeButton = document.createElement('button');
  dislikeButton.textContent = '-';
  let likeCounter = document.createElement('p');
  likeCounter.textContent = `${item.score}`;
  likeCounter.dataset.liked = '0';
  let userLogo = document.createElement('img');
  userLogo.src = item.user.image.webp;
  let userName = document.createElement('p');
  userName.textContent = item.user.username;
  let commentTime = document.createElement('span');
  commentTime.textContent = item.createdAt;
  let replyButton = document.createElement('button');  
  replyButton.textContent = 'Reply';
  body.textContent = item.content;
  comment.append(head, body, like);
  like.append(likeButton, likeCounter, dislikeButton);
  head.append(wrapper, replyButton);
  wrapper.append(userLogo, userName, commentTime);
  if(reply) {
    container.append(comment);
  } else {
    commentWrapper.append(comment);
    container.append(commentWrapper);
  }
  

  if(item.user.username == json.currentUser.username) {
    replyButton.textContent = 'Edit';
    replyButton.classList.add('edit');
    let buttonWrapper = document.createElement('div');
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    buttonWrapper.classList.add('button-wrapper');
    buttonWrapper.append(deleteButton, replyButton);
    head.append(buttonWrapper);
    let you = document.createElement('span');
    you.classList.add('you');
    you.textContent = 'you';
    wrapper.append(userLogo, userName, you, commentTime);
  }

  if(item.replies?.length) {
    let replyContainer = document.createElement('div');
    replyContainer.classList.add('reply-container');
    for(let reply of item.replies) {
      let comment = createComment(reply, replyContainer, json, true);
      comment.classList.add('reply');
      let replyToUserName = document.createElement('span');
      replyToUserName.textContent = `@${item.user.username} `;
      comment.querySelector('.body').prepend(replyToUserName);
    }
    comment.after(replyContainer);
  } 

  if(!item.liked) {
    item.liked = '0';
  } else {
    likeCounter.dataset.liked = item.liked;
    if(item.liked == '1') {
      likeButton.classList.add('clicked');
    } else if(item.liked == '-1') {
      dislikeButton.classList.add('clicked');
    }
  }

  return comment;
}

function textareaInput(event) {
  if(document.querySelector('.answer > textarea').clientHeight == document.querySelector('.answer > textarea').scrollHeight) {
    document.querySelector('.answer > label').style.display = '';
    document.querySelector('.answer > label').style.top = '2.05rem';
  } else if(document.querySelector('.answer > textarea').clientHeight + 16 >= document.querySelector('.answer > textarea').scrollHeight) {
    document.querySelector('.answer > label').style.top = '1.55rem';
  } else {
    document.querySelector('.answer > label').style.display = 'none';
  }
};

function deepSearch(item, index, arr, initialData, deleteComment = false) {
  if(item.content == initialData.data) {
    if(deleteComment) {
      arr.splice(index, 1);
      return true;
    }
    item.content = document.querySelector('.answer > textarea').value;
    return true;
  } else {
    if(item.replies?.length) {
      for(let reply = 0; reply < item.replies.length; reply++){
        if(deleteComment) {
          let val = deepSearch(item.replies[reply], reply, item.replies, initialData, true);
          if(val) break;
        } else {
          let val = deepSearch(item.replies[reply], reply, item.replies, initialData, true);
          if(val) break;
        }   
      }
    }
  }
}

function deepSearchScore(item) {
  if(item.content == event.target.closest('.comment').querySelector('.body').lastChild.data) {
    item.score = parseInt(event.target.closest('.like').querySelector('p').textContent);
    item.liked = event.target.closest('.like').querySelector('p').dataset.liked;
    return true;
  } else {
    if(item.replies?.length) {
      for(let reply = 0; reply < item.replies.length; reply++){
        let val = deepSearchScore(item.replies[reply]);
        if(val) break;
      }
    }
  }
}