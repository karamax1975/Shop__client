

export default async function confirmationUser(cookie) {


  const response = await fetch('/api/login', {
    method: 'POST',
    Authorization: `Bearer ${cookie}`
  })
  if (response.status === 200) {
    const rez = await response.json();
    if (rez.userID) {
      return rez.userID;
    }
    else return false
  }
  else return false
}