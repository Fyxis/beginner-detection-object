// npm install @tensorflow/tfjs
// npm install @tensorflow-models/coco-ssd
// npm install react-webcam
import * as cocoModel from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs'; //klo ga diberi ( * as ) bakal error. aneh, tapi nyata
import Webcam from 'react-webcam';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [model, setModel] = useState()
  const [nameObject, setNameObject] = useState("")
  const [scoreObject, setScoreObject] = useState("")

  async function loadModel(){
    try{
      const dataset = await cocoModel.load()
      setModel(dataset)
      console.log('Dataset is ready to use')
    }catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    tf.ready().then(() => {
      loadModel()
    })
  }, [])

  async function predict() {
    const detection = await model.detect(document.getElementById("videoSource"))
    if (detection.length > 0) {
      detection.map((result, i) => {
        setNameObject(result.class)
        setScoreObject(result.score)
      })
    }
  }

  const videoOption = {
    width: 480,
    height: 480,
    facingMode:"environment"
  }

  

  return (
    <div className="App">
      <center>
      <h1>Beginner Machine Learning Detect Object</h1>
      <button onClick={() => predict()}>Detect Object</button>
      <h3>{ nameObject ? nameObject.toString() : "" }</h3>
      <h3>{ scoreObject ? scoreObject.toString() : "" }</h3>
      <Webcam id="videoSource" audio={false} videoConstraint={videoOption}></Webcam>
      </center>
    </div>
  );

}

export default App;
