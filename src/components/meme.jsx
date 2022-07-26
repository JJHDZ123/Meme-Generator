import React from 'react';

export default function Meme() {
    const [allMemes, setAllMemes] = React.useState({})
    const [Meme, setMeme] = React.useState({
        topText:'', 
        bottomText:'', 
        randomImage:''
    })

    React.useEffect(function() {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(inbound => setAllMemes(inbound.data.memes))
    },[])
//Changes state of meme image from button click
    function getMemeImage() {
        const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
        const memeUrl = randomMeme.url
        return setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: memeUrl
        }))
    }

//changes state of text used for meme
    function handleChange(event) {
        const {name, value} = event.target
        setMeme (oldState => {
            return {
                ...oldState,
                [name] : value
            }
        })
    }

    return(
        <div>
            <div className='form'>
                <input 
                    type='text'
                    placeholder='Top text'
                    className='form--input'
                    name='topText'
                    value= {Meme.topText}
                    onChange= {handleChange}
                />
                <input 
                    type='text'
                    placeholder='Bottom text'
                    className='form--input'
                    name='bottomText'
                    value= {Meme.bottomText}
                    onChange= {handleChange}
                />
                <button 
                    onClick={getMemeImage} 
                    className='form--button'
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className='meme--container'>
                <img className='meme--image' src={Meme.randomImage}/>
                <h2 className='meme--text top' > {Meme.topText}</h2>
                <h2 className='meme--text bottom'> {Meme.bottomText}</h2>
            </div>
        </div>
    )
}