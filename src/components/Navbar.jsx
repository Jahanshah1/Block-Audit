

const Navbar = () => {
    return(
        <div>
        <nav className="fixed w-full top-0 z-50 bg-opacity-0">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold font-poppins text-xl border p-1">
                BlockAudit
              </div>
              <div className="flex space-x-4">
                <a href="/" className="text-white">Home</a>
                <a href="/Application" className="text-white">Application</a>
  <div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
}

export default Navbar;
