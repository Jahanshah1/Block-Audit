import Img from './BG.jpg'

const Home = () => {
    return(
        <div className="h-screen grid grid-rows-3 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Img})` }}>
 <div className="row-span-1" />
      <div className="row-span-1">
        <div className="container mx-auto px-4">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold font-poppins text-left text-white mb-4">
                Assuring Quality, Ensuring Security
            </h1>
            <p className="text-xl text-left text-gray-400 mb-8">
            Revolutionizing smart contract security with AI-driven precision. Your trusted partner in navigating the complexities of blockchain technology.
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