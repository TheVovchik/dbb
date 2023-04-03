import axios from "axios";

export const auth = () => {
  return `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_MY_REDIRECT_URI}&response_type=code&token_access_type=online`
}

export const redirect = (code: string) => {
  const tokenUri=`https://api.dropbox.com/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.NEXT_PUBLIC_MY_REDIRECT_URI}`;
  return axios({
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_APP_KEY}:${process.env.NEXT_PUBLIC_APP_SECRET}`).toString('base64'),
    },
    url: tokenUri
  })
    .then(res => res.data)
    .catch(err => err);
}