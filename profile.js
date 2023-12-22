"use strict";

function init() {
  //html elements
  const usernameP = document.querySelector("#username");
  const fullNameP = document.querySelector("#fullName");
  const bioP = document.querySelector("#bio");
  const logOutButton = document.querySelector("#log-out-button");

  const showNewPostButton = document.querySelector("#show-new-post-button");
  const cancelPostButton = document.querySelector("#canel-post-button");
  const newPostTextarea = document.querySelector("#new-post-textarea");
  const createPostButton = document.querySelector("#create-post-button");

  //functions
  function getUserName() {
    let userData = getLoginData();

    return userData.username;
  }

  function getToken() {
    let userData = getLoginData();

    console.log(userData);
    return userData.token;
  }

  function getUserInfo() {
    const userName = getUserName();
    const token = getToken();

    fetch(`${apiBaseURL}/api/users/${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displayUserInfo(data);
      });
  }

  function displayUserInfo(user) {
    usernameP.innerText = user.username;
    fullNameP.innerText = user.fullName;
    bioP.innerText = user.bio;
  }

  //show posts functions
  function loadUserPosts() {
    const userName = getUserName();
    const token = getToken();

    fetch(`${apiBaseURL}/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let post of data) {
          if (userName == post.username) {
            displayPost(post);
          }
        }
      });
  }

  //create post functions
  function createPost() {

  }

  //function calls for window onload
  getUserInfo();
  loadUserPosts();

  //add event listeners
  logOutButton.addEventListener("click", logout);
  createPostButton.addEventListener("click", createPost);
}

window.onload = init;
