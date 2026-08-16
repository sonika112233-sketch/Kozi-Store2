function Store() {
  return (
    <main className="flex-grow">
      <div className="flex items-center justify-center min-h-fit sm:flex-col sm:justify-center xl:my-[2.5rem]">
        <div className="flex flex-col h-fit md:flex-col xl:flex-row max-w-5xl bg-white rounded-3xl overflow-hidden xl:h-[50vh]">
          {/* Left Section: Image */}
          <div className="hidden md:flex md:w-[50%] mx-auto xl:flex w-1/2 relative bg-blue-300 rounded-3xl items-center justify-center p-8">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/map-3d-icon-png-download-4051621.png"
              alt="3D illustration of a map"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Section */}
          <div className="w-full md:w-full p-10 mx-auto">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row md:space-x-8">
                  <div className="flex-1 mb-6 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                      Our Location
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      Visit our flagship store in the heart of the city.
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                      123 Main Street
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                      Springfield, IL 62704
                    </p>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Store Hours
                    </h3>
                    <ul className="text-lg text-gray-600 space-y-2 mb-6">
                      <li>
                        Monday - Friday:{" "}
                        <span className="font-semibold">9 AM - 7 PM</span>
                      </li>
                      <li>
                        Saturday:{" "}
                        <span className="font-semibold">10 AM - 6 PM</span>
                      </li>
                      <li>
                        Sunday:{" "}
                        <span className="font-semibold">11 AM - 5 PM</span>
                      </li>
                    </ul>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=123+Main+Street,+Springfield,+IL+62704"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Store;
