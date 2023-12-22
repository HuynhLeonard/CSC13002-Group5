import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../Assets/animations/107043-success.json';

const Loader = () => {

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div>
      <Lottie options={animationOptions} width={300} height={300} />    
    </div>
  )
}

export default Loader;