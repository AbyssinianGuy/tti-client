import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [numImages, setNumImages] = useState(1)
  const [numTrain, setNumTrain] = useState(50)
  const [height, setHeight] = useState(512)
  const [width, setWidth] = useState(512)
  const [images, setImages] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState('Stable Diffusion 1.4')

  const negative_promps = [
    "bad anatomy",
    "bad proportions",
    "blurry",
    "cloned faces",
    "cropped",
    "deformed",
    "distracting background",
    "dehydrated",
    "disfigured",
    "duplicate",
    "error",
    "extra arms or limbs",
    "extra body parts",
    "gross proportions",
    "horrible",
    "long neck",
    "lowres",
    "missing body parts",
    "low quality",
    "poorly drawn face",
    "ugly",
    "too many fingers",
    "too many legs",
    "too many arms",
    "too many eyes",
    "too many heads",

  ]

  const models = [
    "Stable Diffusion 1.4",
    "Stable Diffusion 2.1",
  ]

  const data = {
    "prompt": prompt,
    "negativePrompt": negativePrompt,
    "numImages": numImages,
    "numTrain": numTrain,
    "height": width,
    "width": height
  }


  const generateImage = async data => {
    setLoading(true)
    setImages('')
    console.log("prompt: ", data.prompt)
    console.log("negativePrompt", data.negativePrompt)
    console.log("numImages: ", data.numImages)
    console.log("num_train: ", data.numTrain)
    console.log("width: ", data.width)
    console.log("height: ", data.height)
    const response = await axios.get(`http://127.0.0.1:8000/?prompt=${data.prompt}?negative_prompt=${data.negativePrompt}?num_images_per_prompt=${data.numImages}?num_inference_steps=${data.numTrain}?height=${data.height}?width=${data.width}`)
    if (numImages > 1) {
      // loop through the images and display them
      setImages(response.data)
      console.log(images.length)
    }
    else
      setImages(response.data)
    setLoading(false)
  }

  return (
    <div className='bg-gray-950'>
      <div className='flex flex-row items-center justify-center pt-16 mt-16 mb-4' >
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-8xl flex-1 text-center animate-glow'>Text 2 Image</h1>
          <h1 className='text-8xl flex-1 text-center animate-glow'>🤖</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          {/* an input prompt for text and a button for generating image */}
          <div className='grid grid-cols-1 gap-4 px-10 py-10'>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Prompt</label>
              <input
                className='border-2 rounded-md p-2 m-4 w-full text-black'
                type="text"
                value={prompt}
                placeholder='Enter prompt here'
                onChange={e => setPrompt(e.target.value)}
              />
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Negative Prompt</label>
              <select
                className='border-2 rounded-md p-2 m-4 w-auto text-black'
                type="text"
                value={negativePrompt}
                onChange={e => setNegativePrompt(prevValue =>
                  prevValue ? prevValue + ", " + e.target.value : e.target.value)}
              >
                {negative_promps.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
              <input
                className='border-2 rounded-md p-2 m-4 flex-grow text-black'
                type="text"
                value={negativePrompt}
                placeholder=''
                onChange={e => setNegativePrompt(e.target.value)}
              />
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Number of Images</label>
              <div className=' mx-4 flex flex-1 flex-row items-center'>
                <input
                  className='border-1 rounded-md p-0 m-4 w-full text-black'
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={numImages}
                  onChange={e => setNumImages(e.target.value)}
                />
                <input
                  className='text-2xl border-2 rounded-md p-2 m-4 w-1/4 text-black text-center'
                  type="number"
                  value={numImages}
                  placeholder='Enter text here'
                  onChange={e => setNumImages(e.target.value)}
                  max={8}
                />

              </div>
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Number of Training Images</label>
              <input
                className='border-1 rounded-md p-0 m-4 w-full text-black'
                type="range"
                min={30}
                max={150}
                step={5}
                value={numTrain}
                onChange={e => setNumTrain(e.target.value)}
              />
              <input
                className='text-2xl border-2 rounded-md p-2 m-4 w-20 text-black text-center'
                type='number'
                max={150}
                min={30}
                step={5}
                value={numTrain}
                onChange={e => setNumTrain(e.target.value)}
              />
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Height</label>
              <div className=' mx-4 flex flex-col items-center'>
                <input
                  className='border-2 rounded-md p-2 mx-4 mt-4 w-full text-black text-center'
                  type="number"
                  value={height}
                  placeholder='Enter text here'
                  onChange={e => setHeight(e.target.value)}
                />
                <input
                  className='border-1 rounded-md p-0 m-4 w-full text-black'
                  type="range"
                  min={256}
                  step={256}
                  max={1024}
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                />
              </div>
              <label className='text-2xl'>Width</label>
              <div className=' mx-4 flex flex-col items-center'>
                <input
                  className='border-2 rounded-md p-2 mx-4 mt-4 w-full text-black text-center'
                  type="number"
                  value={width}
                  placeholder='Enter text here'
                  onChange={e => setWidth(e.target.value)}
                />
                <input
                  className='border-1 rounded-md p-0 m-4 w-full text-black text-center'
                  type="range"
                  min={256}
                  step={256}
                  max={1024}
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                />
              </div>
            </div>
            {/* model selection */}
            <div className='flex flex-row items-center justify-center'>
              <label className='text-2xl'>Model</label>
              <select
                className='border-2 rounded-md p-2 m-4 w-auto text-black text-xl'
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
              >
                {models.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            className='bg-purple-700 text-white rounded-md p-2 w-1/2'
            onClick={() => generateImage(data)}
          >
            Generate Image
          </button>
          {/* a placeholder for the image generated */}
          <div className='flex flex-col items-center justify-center'>
            {loading && <h1 className='text-2xl text-purple-700'>Loading...</h1>}
            <div className='grid grid-cols-2 gap-4'>
              {images && images.map((image, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center justify-center'>
                  <Image
                    className='border-2 border-purple-700 rounded-md p-2 m-4'
                    height={250}
                    width={250}
                    src={`data:image/png;base64,${image}`}
                    alt={`Generated Image`}
                  />
                  <a
                    href={`data:image/png;base64,${image}`}
                    download={`image${index + 1}.png`}
                    className="bg-purple-700 text-white rounded-md p-2"
                  >
                    Download
                  </a>
                </div>
              ))
              }
            </div>
          </div>
        </main>
        <footer className="flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://abyssinian.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{<span className=' text-purple-700'>&nbsp;Abyssinian.AI</span>}
          </a>
        </footer>
      </div>
    </div>
  )
}
