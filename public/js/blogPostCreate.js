const newFormHandler = async (event) => {
  event.preventDefault();
//FIXME: change all to create post
  const title = document.querySelector('#blogPost-title').value.trim();
  const post_content = document.querySelector('#blogPost-content').value.trim();

  if (title && post_content) {
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({ title, post_content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/blogPost');
    } else {
      alert('Failed to create blogPost');
    }
  }
};


document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

