import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import { GridLoader } from 'react-spinners'

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
  "CompVis/stable-diffusion-v1-4",
  "stabilityai/stable-diffusion-2-1",
]

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState(negative_promps[0])
  const [numImages, setNumImages] = useState(1)
  const [numTrain, setNumTrain] = useState(50)
  const [height, setHeight] = useState(512)
  const [width, setWidth] = useState(512)
  const [images, setImages] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(models[0])

  const data = {
    "prompt": prompt,
    "negativePrompt": negativePrompt,
    "numImages": numImages,
    "numTrain": numTrain,
    "height": width,
    "width": height,
    "model": model
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
    console.log("model: ", data.model)
    const response = await axios.get(`http://127.0.0.1:8000/?prompt=${data.prompt}&negative_prompt=${data.negativePrompt}&num_images_per_prompt=${data.numImages}&num_inference_steps=${data.numTrain}&height=${data.height}&width=${data.width}&model_id=${data.model}`)
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
    <div className='bg-gray-950 ml-16'>
      <div className='flex flex-row items-center justify-center pt-16 md:pt-8 lg:mt-16 lg:mb-4 mx-auto md:flex-1'>
        <div className='flex flex-col items-center justify-center' >
          <h1 className='text-8xl md:text-9xl sm:text-9xl flex-1 text-center animate-glow'>Text 2 Image</h1>
          <h1 className='text-8xl flex-1 text-center animate-glow'>🤖</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  py-2 md:px-8 sm:px-8">
        <main className="flex flex-col items-center justify-center flex-1 lg:px-20 text-center md:px-4 sm:px-4">
          {/* an input prompt for text and a button for generating image */}
          <div className='lg:grid lg:grid-cols-1 lg:gap-4 lg:px-10 lg:py-10 sm:px-4'>
            <div className='flex flex-1 items-center'>
              <label className='text-2xl'>Prompt</label>
              <input
                className='border-2 rounded-md p-2 m-4 w-full text-black text-xl'
                type="text"
                value={prompt}
                placeholder='Enter prompt here'
                onChange={e => setPrompt(e.target.value)}
              />
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Negative Prompt</label>
              <select
                className='border-2 rounded-md p-2 m-4 md:w-auto sm:w-1/2 text-black text-xl'
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
                className='border-2 rounded-md p-2 m-4 lg:flex-grow md:w-full sm:w-full text-black text-xl'
                type="text"
                value={negativePrompt}
                placeholder=''
                onChange={e => setNegativePrompt(e.target.value)}
              />
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Number of Images</label>
              <div className=' mx-4 flex flex-1 lg:flex-row md:flex-col-reverse sm:flex-col-reverse items-center'>
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
                  className='text-2xl border-2 rounded-md p-2 m-4 w-1/4 md:w-full sm:w-full text-black text-center'
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
              <div className=' mx-4 flex flex-1 lg:flex-row md:flex-col-reverse sm:flex-col-reverse items-center'>
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
                  className='text-2xl border-2 rounded-md p-2 m-4 w-20 md:w-full sm:w-full text-black text-center'
                  type='number'
                  max={150}
                  min={30}
                  step={5}
                  value={numTrain}
                  onChange={e => setNumTrain(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-row items-center'>
              <label className='text-2xl'>Height</label>
              <div className=' mx-4 flex flex-col items-center'>
                <input
                  className='border-2 rounded-md p-2 mx-4 mt-4 w-full text-black text-center text-xl'
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
                  className='border-2 rounded-md p-2 mx-4 mt-4 w-full text-black text-center text-xl'
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
            className='bg-purple-700 text-white rounded-md p-2 w-1/2 m-10 sm:w-3/4 disabled:opacity-40'
            onClick={() => generateImage(data)}
            disabled={loading}
          >
            Generate Image
          </button>
          {/* a placeholder for the image generated */}
          <div className='flex flex-col items-center justify-center'>
            {loading ? (
              <div className='flex flex-col items-center justify-center m-10'>
                <h1 className='text-2xl text-purple-700'>Generating...</h1>
                {/* animation here */}
                <GridLoader color='#7C3AED' size={20} />
              </div>
            )
              :
              (
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
              )
            }
          </div>
        </main>
        <footer className="flex flex-auto items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://abyssinian.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='flex items-center justify-center'>
              Powered by{<span className=' text-purple-700'>&nbsp;Abyssinian.AI</span>}
            </div>
          </a>
        </footer>
      </div>
    </div>
  )
}

