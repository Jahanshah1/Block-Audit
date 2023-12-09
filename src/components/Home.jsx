import Img from './BG.jpg'
import Logo from './arbitrum-logo.png';
import Flogo from './full-arbitrum-logo.png'


const Home = () => {
    return(
        <div className="h-screen grid grid-rows-3 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Img})` }}>
 <div className="row-span-1"  />
      <div className="row-span-1">
        <div className="container mx-auto px-4" >
          <div className="w-full md:w-1/2" >
          <img src={Logo} alt="Logo" className="Logo" style={{width:'100px', heign:'100px'}} />
            <h1 className="text-5xl font-bold font-poppins text-left text-white mb-4">
                Assuring Quality, Ensuring Security on Arbitrum 
            </h1>
            
            <p className="text-xl text-left text-gray-400 mb-8">
            An AI based smart cotract auditing plaform for contracts on Arbitrum 
            </p>
            {/*Button*/}
            <button className='btn'> Launch App </button>
	
          </div>
        </div>
      </div>
      <div className="row-span-1" />
        </div>
    )
}

export default Home;