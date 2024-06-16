window.addEventListener("load", solve);

function solve() {
  const titleRef = document.getElementById('post-title');
  const categoryRef = document.getElementById('post-category');
  const contentRef = document.getElementById('post-content');

  const publishBtn = document.getElementById('publish-btn');
  const clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', onClear);

  const reviewUlRef = document.getElementById('review-list');
  const publishedUlref = document.getElementById('published-list');

  publishBtn.addEventListener('click', onPublish);

  function onPublish(e) {
    e.preventDefault();
    title = titleRef.value;
    category = categoryRef.value;
    content = contentRef.value;

    if (!title || !category || !content) {
      return;
    };

    liEl = createLi(title, category, content);
    reviewUlRef.appendChild(liEl);

    clearInput(titleRef, categoryRef, contentRef);

  }

  function createLi(title, category, content) {

    let header = document.createElement('h4');
    header.textContent = title;

    let pCategory = document.createElement('p');
    pCategory.textContent = `Category: ${category}`;

    let pContent = document.createElement('p');
    pContent.textContent = `Content: ${content}`;

    let articleEl = document.createElement('article');
    articleEl.appendChild(header);
    articleEl.appendChild(pCategory);
    articleEl.appendChild(pContent);

    let editBtn = document.createElement('button');
    editBtn.classList.add("action-btn", "edit");
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', onEdit);

    let approveBtn = document.createElement('button');
    approveBtn.classList.add("action-btn", "approve");
    approveBtn.textContent = 'Approve';
    approveBtn.addEventListener('click', onApprove);

    liEl = document.createElement('li');
    liEl.classList.add('rpost');
    liEl.appendChild(articleEl);
    liEl.appendChild(approveBtn);
    liEl.appendChild(editBtn);

    return liEl;
  };

  function clearInput(...inputs) {
    inputs.forEach(input => input.value = "");

  }

  function onEdit(e) {
    let articleRef = e.currentTarget.parentElement.querySelector('article');

    let header = articleRef.querySelector('h4').textContent;
    let paragraphs = Array.from(articleRef.querySelectorAll('p'));
    [static, categoryParagraph] = paragraphs[0].textContent.split(': ');
    [static, contentParagraph] = paragraphs[1].textContent.split(': ')

    titleRef.value = header;
    categoryRef.value = categoryParagraph;
    contentRef.value = contentParagraph;

    e.currentTarget.parentElement.remove();
  }

  function onApprove(e) {

    e.currentTarget.parentElement.remove();
    let liRef = e.currentTarget.parentElement;

    Array.from(liRef.querySelectorAll('button')).forEach(button => button.remove());
    
    publishedUlref.appendChild(liRef);
  }

  function onClear(e) {

    let postsToClear = Array.from(publishedUlref.children)
    postsToClear.forEach(p => p.remove());
  
  }

}




