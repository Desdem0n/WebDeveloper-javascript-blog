const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML) ,
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML) ,
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML) ,
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML) ,
  tagAuthorLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML) ,
}
const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
  },
  listOf: {
    titles: '.titles',
    tags: '.tags.list',
    authors: '.authors.list',
  },
};
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
  }

  /* [Done] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function addLinksEvent() {
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
      link.addEventListener('click', titleClickHandler);
  }
}


{
  const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

  function generateTitleLinks(customSelector = '') {
      console.log('customSelector', customSelector);
      /* remove contents of titleList */
      const titleList = document.querySelector(optTitleListSelector);
      console.log(titleList);

      function clearMessages() {
          document.getElementById('messages').innerHTML = '';
      }
      clearMessages();
      let html = '';
      /* for each article */
      const articles = document.querySelectorAll(optArticleSelector + customSelector);
      for (let article of articles) {
          //console.log('article', article);
          /* get the article id */
          const articleId = article.getAttribute('id');
          //console.log('articleId', articleId);
          /* find the title element */

          /* get the title from the title element */
          const articleTitle = article.querySelector(optTitleSelector).innerHTML;
          //console.log('articleTitle', articleTitle);
          /* create HTML of the link */
          const linkHTMLData = {id: articleId, title: articleTitle};
          const linkHTML = templates.articleLink(linkHTMLData);
          /* insert link into titleList */
          titleList.innerHTML = titleList.innerHTML + linkHTML;
          // addLinksEvent();
      }
  }
  generateTitleLinks();
} {
  const optArticleSelector = '.post',
      optArticleTagsSelector = '.post-tags .list';
      optAuthorSelector= '.post-author';
      optCloudClassCount = '7';
      optCloudClassPrefix = 'tag-size-';

  function calculateTagsParams(tags){
        const params = {min:'999999', max:'0'};
        for(let tag in tags){
        console.log(tag + ' is used ' + tags[tag] + ' times');
        
        if(tags[tag] > params.max){
          params.max = tags[tag];
        }
        if(tags[tag] < params.min){
          params.min = tags[tag];
        }
      }
        return params;
      }
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizadMax = params.max - params.min;
    const percentage = normalizedCount /normalizadMax;
    const classNumber = Math.floor( percentage *(optCloudClassCount -1) +1 );
    return optCloudClassPrefix + classNumber;
  }    
  
  function generateTags() {
      /* [NEW] create a new variable allTags with an empty object */
      let allTags = {};
      /* find all articles */
      const articles = document.querySelectorAll(optArticleSelector);
      console.log('articles', articles);
      /* START LOOP: for every article: */
      for (let article of articles) {
          /* find tags wrapper */
          const tagsWrapper = article.querySelector(optArticleTagsSelector);
          console.log('tagsWrapper', tagsWrapper);
          /* make html variable with empty string */
          let html = ''
          /* get tags from data-tags attribute */
          const articleTags = article.getAttribute('data-tags');
          console.log('articleTags', articleTags);
          /* split tags into array */
          const articleTagsArray = articleTags.split(' ');
          console.log('articleTagsArray', articleTagsArray)
          /* START LOOP: for each tag */
          for (let tag of articleTagsArray) {
              /* generate HTML of the link */
              const linkHTMLData = {id: articleTags, title: tag};
              const linkHTML = templates.tagLink(linkHTMLData);
              /* add generated code to html variable */
              html += linkHTML;
              // html = html + linkHTML;
              console.log('html', html);
               /* [NEW] check if this link is NOT already in allTags */
              if(!allTags.hasOwnProperty(tag)){
              /* [NEW] add generated code to allTags array */
              allTags[tag] = 1;
      } else{
        allTags[tag]++;
      }
              /* END LOOP: for each tag */
          }
          /* insert HTML of all the links into the tags wrapper */
          tagsWrapper.innerHTML = html;
          // article.innerHTML = article.innerHTML + html;
          addLinksEvent();
          /* END LOOP: for every article: */
      }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagParams:', tagsParams);
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    /*  [NEW] END LOOP: for each tag in alltags: */
  }
 /* [NEW] add html from allTagsHTML to tagList */
 tagList.innerHTML = templates.tagCloudLink(allTagsData);
 console.log('alltagsdata :', allTagsData);
  }
  generateTags();



function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log('elementHref', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  // console.log('elementTag', tag);
  /* find all tag links with class active */
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('tags', tags);
  /* START LOOP: for each active tag link */
  for (let tag of tags) {
      /* remove class active */
      tag.classList.remove('active');
      /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const newTag = href.replace('#tag-', '');
  // const taghrefs = href.replace('#tag-', '');
  // console.log('taghrefs', taghrefs);
  // /* START LOOP: for each found tag link */
  // for (let taghref of taghrefs) {
  //     /* add class active */
  //     console.log('taghref', taghref);
  //     taghref.classList.add('active');
  //     /* END LOOP: for each found tag link */
  // }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + newTag + '"]');
}


function addClickListenersToTags() {
  /* find all links to tags */
const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of links) {
      console.log('stała link', link)/* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
  }
}
addClickListenersToTags();
console.log('addClickListenersToTags', addClickListenersToTags);

  function generateAuthors (){
    /* [NEW] create a new variable allTags with an empty object */
    let allAuthors= {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles', articles);
    /* START LOOP: for every article: */
   let html = '';
   for (let article of articles) {
      /* find tags wrapper */
      const tagsAuthor = article.querySelector(optAuthorSelector);
      const tag = tagsAuthor.getAttribute('data-author');
      console.log('tagsAuthor', tagsAuthor);
      /* make html variable with empty string */
      const linkHTMLData = {id: allAuthors, title: tag};
      const linkHTML = templates.authorLink(linkHTMLData);
      tagsAuthor.innerHTML = linkHTML;
    
    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(tag)){
      /* [NEW] add generated code to allAuthors array */
      allAuthors[tag] = 1;
    } else {
      allAuthors[tag]++;
    }
  }
    /* [NEW] find list of author in right column */
  const authorList = document.querySelector('.authors');

  /* [NEW] add html from allAuthors to authorList */

 const allAuthorsData = {tags: []};
 for(let tag in allAuthors){
  allAuthorsData.tags.push({
    tag: tag,
    count: allAuthors[tag],
    className: calculateTagClass(allAuthors[tag], allAuthors)
  });
}
 authorList.innerHTML = templates.tagAuthorLink(allAuthorsData);
 console.log('allauthorsdata :', allAuthorsData);
  }
  generateAuthors();


  /*funkcja authorClickHandler*/

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
   console.log('href', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
 // const author = href.getAttribute('data-author')

  const author = clickedElement.parentElement.getAttribute('data-author');
  console.log('author', author);

  /* find all tag links with class active */
   const authors = document.querySelectorAll('a.active[href^="#data-author"]');
  /* START LOOP: for each active tag link */
  for (let author of authors) {
      /* remove class active */
      author.classList.remove('active');
      /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
 const selectedAuthorhref = href.replace('tag-', '');
 const authorhrefs = document.getElementsByClassName('author-name');

  /* START LOOP: for each found tag link */
  for (let authorhref of authorhrefs) {
      /* add class active */
      console.log('authorhref', authorhref.innerHTML);
      if(selectedAuthorhref != '#'+authorhref.innerHTML) { authorhref.classList.add('active');
  }
      /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
/*funkcja addclicklistenerstoAuthors; */

function addClickListenersToAuthors() {
  /* find all links to author */
const links = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for (let link of links) {
     /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

function getAuthors(){
const authors = document.getElementsByClassName('author-name');
return authors.map(function(name){
  return '#'+name.innerHTML;
})
}
}