//declare 
//let boxElement = document.getElementById('box');

// add class to the element
//boxElement.classList.add('active');

// we change the content of element
//boxElement.innerText = "This is new content of our element";





'use strict';

const titleClickHandler = function(event){
    console.log('Link was clicked!');
  
    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}
  
    /* add class 'active' to the clicked link */
    event.target.classList.add('active');
  
    /* remove class 'active' from all articles */
    const article = document.querySelectorAll('.post.active');

    for(let article of articles) {
      article.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const href = event.target.getAttribute('href');
  
    /* find the correct article using the selector (value of 'href' attribute) */
    const newArticle = document.querySelector(href);
  
    /* add class 'active' to the correct article */
  newArticle.classList.add('active');
}
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }