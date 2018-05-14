export function upload(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'zs9a7v1r')

  return fetch(`https://api.cloudinary.com/v1_1/${'dqk9imkrf'}/upload`, {
    method: 'post',
    body: formData
  })
    .then(response => response.json())
    .then(response => response.secure_url)
  // .catch(error => console.error('Error:', error))
  // .then(response => console.log('Success:', response));
}