const newFormHandler = async (event) => {
  event.preventDefault();

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/blogPost');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

document
  .querySelector('.new-blogPost-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blogPost-list')
  .addEventListener('click', delButtonHandler);
