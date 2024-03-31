import './App.css';
import { useEffect, useState } from 'react'
import { jokeContent} from './content/joke';
import Icon from './assets/Hl.png'
import Avatar from './assets/flower.png'
import Cookies from 'js-cookie'
import { apiCreateVote } from './api/vote';
import CryptoJS from 'crypto-js'


function App() {

  const [idJoke, setIdJoke] = useState(null)
  const [full, setFull] = useState(false)
  const [textJoke, setTextJoke] = useState(null)
  const isJSONString = (str) => {
    try {
        JSON.parse(str);
        return JSON.parse(str);
    } catch (error) {
      Cookies.remove('jokeCookie')
    }
  }
  const bytes = Cookies.get('jokeCookie') ? CryptoJS.AES.decrypt(Cookies.get('jokeCookie'), process.env.REACT_APP_SECRET_KEY) : undefined;
  const cookie = bytes ? isJSONString(bytes.toString(CryptoJS.enc.Utf8)) : undefined
  const currentDate = new Date();
  const expireDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 7, 0, 0);

  const nextJoke = async(boolean) => {
    const object = {
      idJoke: idJoke,
      vote: boolean
    }
    await apiCreateVote(object)
    let newArray;
    if(cookie){
      newArray = [...cookie, object];
    }else{
      newArray = [object];
    }
    Cookies.set('jokeCookie', CryptoJS.AES.encrypt(JSON.stringify(newArray), process.env.REACT_APP_SECRET_KEY).toString(),{expires: expireDate});
    check(newArray)
  }

  const check = (arrCheck) => {
    if (arrCheck.length === jokeContent.length) {
      setTextJoke(`That's all the jokes for today! Come back another day!`);
      setFull(true)
    } else {
      let random;
      do {
        random = Math.floor(Math.random() * jokeContent.length);
      } while (arrCheck.some(el => el.idJoke === random));
      setTextJoke(jokeContent[random]);
      setIdJoke(random);
    }
  };
  
  useEffect(() => {
    if(cookie){
      if(cookie.length === jokeContent.length){
        setTextJoke(`That's all the jokes for today! Come back another day!`)
        setFull(true)
      }else{
        check(cookie)
      }
    }else{
      let random = Math.floor(Math.random() * jokeContent.length)
      setTextJoke(jokeContent[random])
      setIdJoke(random)
    }
  },[])

  return (
    <div>
      <div className="h-[65px] w-full flex items-center justify-center">
        <div className='header-1'>
          <img src={Icon} alt='avatar' className='h-[45px]'/>
          <div className='flex gap-3'>
            <div className='flex flex-col items-end justify-center'>
              <span className='text-xs text-gray-500 italic'>Handicrafted by</span>
              <span className='text-xs'>Jim HLS</span>
            </div>
            <img src={Avatar} alt='avatar' className='h-[45px] rounded-full'/>
          </div>
        </div>
      </div>
      <div className="body-1">
        <span className="body-1-text-1">A joke a day keeps the doctor away</span>
        <span className="body-1-text-2">If you joke wrong way, your teeth have to pay. (Serious)</span>
      </div>
      <div className='body-2'>
        {<span className='body-text'>{textJoke}</span>}
        {(!full && textJoke) && <div className='body-2-div-1'>
          <hr className="hr"/>
          <div className='flex gap-4'>
            <div 
            onClick={() => nextJoke(true)} 
            className='button-1'>
              <button className='w-full'>This is Funny!</button>
            </div>
            <div 
            onClick={() => nextJoke(false)} 
            className='button-2'>
              <button className='w-full'>This is not funny.</button>
            </div>
          </div>
        </div>}
      </div>
      <div className='footer'>
        <span className='footer-span-1'>
        This website is created as part of Hlsolution program. The materials contained on this website are provided for general
        information only and do not constitute any form of advice. HLS assumes no responsibility for the accuracy of any particular statement and accepts no liability for any loss or damage which may arise from reliance on the information contained on this site.
        </span>
        <span className='text-xs'>Copyright 2021 HLS</span>
      </div>
    </div>
  );
}

export default App;
