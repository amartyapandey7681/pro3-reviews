import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {FaChevronLeft ,FaChevronRight , FaQuoteRight} from "react-icons/fa";
import "./index.css";

let url = "https://api.github.com/users";

let a = "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic.";
let b = "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry";


function App(){

  const [all ,setAll] = useState([]);
  const [show ,setShow] = useState({});
  const [load, setLoad] = useState(true);
  const [sc , setSc] = useState(0);

  const setData = async()=>{

    let d = await fetch(url);
    if(d.status>=200 && d.status<=299){

      let data = await d.json();

      let r = [];

      for(let x=0;x<5;x++){

        let obj ={

          name : data[x].login,
          image: data[x].avatar_url,
          title: x%2===0?"The boss":"The intern",
          msg : x%2===0?a:b
        };
        r.push(obj);
      }


      setAll(r);
      setLoad(false);
      setShow(r[0]);

    }else{
      console.log("error");
    }
  }

  useEffect(()=>{

    setData()
  },[])


  if(load){

    return <h2>Loading ...</h2>
  }

  function leftscroll(){

    if(sc === 0)
      setSc(4);
    else
      setSc(sc - 1);
      
    setShow(all[sc]);

  }

  function rightscroll(){

    if(sc === 4)
      setSc(0);
    else
      setSc(sc + 1);
      
    setShow(all[sc]);

  }

  function surprise(){

    let k = Math.floor(Math.random()*5)

    setSc(k);
    setShow(all[k])
  }

  return(<>
  
  <div className='item'>
  <h2 className='heading'>Our Reviews</h2>
  <div>
    <div className='container'>
      <img src={show.image} alt="showing"/>
    </div>
    <div className='name'>{show.name}</div>
    <div className='title'>{show.title}</div>
    <p className='msg'>{show.msg}</p>
  </div>
    <button type="button" className= "btn" onClick={()=>leftscroll()}><FaChevronLeft /></button>
    <button type="button"  className= "btn" onClick={()=>rightscroll()}><FaChevronRight /></button>
    <div>
    <button type="button"   class ="b1" onClick={()=>surprise()}>surprise me</button>
    </div>
  </div>
  </>)

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
