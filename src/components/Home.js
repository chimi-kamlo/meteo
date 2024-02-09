import React, {  useState } from 'react'
import image1 from "../image1.png"
import imag2 from "../image2.png"
import axios from 'axios'
import  clouds from "../clouds.png"
import  clears from "../clears.png"
import drizzle from "../drizzle.png"
import mist from "../mist.png"
import  rain from "../rain.png"
const Home = () => {
    
    const [data,setData] = useState(

        {
            celcius:10,
            name: "london"  ,
            humidity:10,
            speed:2,
           image: clears
        }
    )
    const [name, setName] = useState("");
    const [erro,setErro] = useState("");
    
    const handleClick = ()=>{
      
        
        if(name !==" "){
            const val =` https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=036da277ac3c04032e6ea93378485d28` ;
            axios
            .get(val)
            .then((data)=>{
             
                let imagePath = " ";
                if( data.data.weather[0].main==="clouds"){
                    imagePath = clouds;
                }else if( data.data.weather[0].main==="clears"){
                    imagePath = clears;
                }
                else if(data.data.weather[0].main==="Rain"){
                    imagePath = rain;
                }else if(data.data.weather[0].main=== "Drizzle"){
                    imagePath = drizzle;
                } else if(data.data.weather[0].main=== "Mist"){
                    imagePath = mist;
                }else{
                    imagePath =clouds;
                }
                setErro("");
                setData({...data,celcius:data.data.main.temp,name:data.data.name,
                    humidity:data.data.main.humidity,speed:data.data.wind.speed,image:imagePath})
             }).catch(erro=>{
                // return console.log(erro.response.data.cod);
                if(erro.response.status === 400){
                    
                    setErro(" champ vide")
                    
                    
                } else if(erro.response.status === 404){
                    setErro("valeur invalide");
                }else{
                    setErro("");
                }
               
            }
            );

        }
    }
  return (
    <div className='container'>
    <div className='meteo_prevention'>
          <div className="searh">
          <input type='text' onChange={e => setName(e.target.value)}/>
          
          <button onClick={handleClick}>v</button>
          
          </div>
         
          <div className='caracteristique'>
          <span className='erro'>{erro}</span> 
            <span>  <img src={data.image} alt='image3'/></span>
            <span> {Math.round(data.celcius)} °C</span>
            <span>{data.name}</span>
          </div>
          <div className='description'>
            <div className='humide'>
            <div>
                <img src={imag2} alt='image2'/>
                <span> {Math.round(data.humidity)}% humidity</span>
            </div>

            </div>
            <div className='soleil'>
            <div>
                <img src={image1} alt='image1'/>
                <span> {data.speed} km/hwind</span>
            </div>


            </div>
          </div>
    </div>

    </div>
  )
}

export default Home