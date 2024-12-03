"use client";

import { useState } from "react";

const Page = () => {
      const [token, setToken] = useState();
       const password = "Credentials648045"
    const username = "648045API"
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const apiUrl = 'https://apibeta.parcelpro.com/v2.0/auth'; // replace with your API URL
        const data = {
          username,
          grant_type: "password",
          password,
        };
      
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'bearer {token}'
          },

          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => setToken(data))
          .catch(error => console.error(error));
          // console.log(token?.access_token);
          // add the token to headers
          {/**  headers: {
            'Content-Type': 'application/json',
            Authorization: 'bearer {token}'
          }, */}
    }
    return(
        <>
             <form onSubmit={handleSubmit} className='mt-44 bg-black text-white flex flex-col justify-center items-center'>
                <input type='text' placeholder='Country' />
                <input type='text' placeholder='City' />
                <input type='text' placeholder='Street' />
                <input type='text' placeholder='ZipCode' />
                <button className='cursor-pointer' type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Page