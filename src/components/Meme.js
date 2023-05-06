import React from "react";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

export default function Meme() {
    const [color, setColor] = useState("#aabbcc");
    const mystyle = {
      fontSize: 16,
      color: color,
    }
    const [meme, setMeme] = useState({
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemes, setAllMemes] = useState('')

    useEffect(() => {
      console.log('API call made')
      fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(memesData => setAllMemes(memesData.data.memes))
    }, [])

    function getMemeImage() {
      function randomNumberInRange(max, min) {
         return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      const URL = allMemes[randomNumberInRange(0, 100)].url;
      
      setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: URL
      }));
    }

    function handleChange(event) {
      const {name, value} = event.target
      setMeme(prevMeme => {
        return {
          ...prevMeme,
          [name]: value
        }
      })
    }
    

    return (
        <main className="meme--container">
            <div className="form">
               
                <input 
                type="text" 
                className="form--inputs" 
                placeholder="Top text"
                name='topText'
                value={meme.topText}
                onChange={handleChange }
                
                />

                <input 
                type="text" 
                className="form--inputs" 
                placeholder="Bottom text"
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}
                 />

                <button className="form--button" onClick={getMemeImage}>Générer un nouveau mème</button>
                </div>
                <div className="hero--container">
                <div className="meme--image--container">
                {meme.randomImage ? <img src={meme.randomImage} alt="meme" className="meme--image"/> : ''}
                <h2 style={mystyle} className="meme--text top">{meme.topText}</h2>
                <h2 style={mystyle} className="meme--text bottom">{meme.bottomText}</h2> 
                </div>
                </div>
                <div className="text--color">
                  <HexColorPicker color={color} onChange={setColor} />
                </div>
        </main>
    )
};





