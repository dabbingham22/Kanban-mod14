import { UserLogin } from "../interfaces/UserLogin";
import Auth from '../utils/auth';
const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
try {
  //response fetches login info and stringifies body containing the userInfo in JSON 
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`

    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();
//Response is not ok due to no user info
  if (!response.ok) {
    throw new Error('User info not available. Check network tab!');
  }

  return data;
  //error when trying to get user login import
} catch (err) {
  console.log('Error from user login: ', err);
  return Promise.reject('Could not fetch the user info');
}
};

export { login };
