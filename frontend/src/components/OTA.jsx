import React from 'react';

const OTASection = () => {
  // OTA platforms data with redirection links
  const platforms = [
    {
      id: 1,
      name: 'MakeMyTrip',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
        </svg>
      ),
      color: 'text-red-500',
      bgColor: 'bg-blue-50 group-hover:bg-blue-100',
      borderColor: 'border-blue-200 group-hover:border-blue-300',
      url: 'https://www.makemytrip.com/hotels/dhaneshwari_luxury_homestay-details-varanasi.html',
      rating: 4.5,
      reviews: 1240,
      features: 'Free Cancellation • Instant Confirmation'
    },
    {
      id: 2,
      name: 'Agoda',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      ),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 group-hover:bg-purple-100',
      borderColor: 'border-purple-200 group-hover:border-purple-300',
      url: 'https://www.agoda.com/en-in/dhaneshwari-luxury-homestay/hotel/varanasi-in.html?cid=-310&ds=g02IhGn7y7JHzt7q',
      rating: 4.7,
      reviews: 2150,
      features: 'VIP Access • Best Price Guarantee'
    },
    {
      id: 3,
      name: 'Airbnb.com',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
        </svg>
      ),
      color: 'text-green-700',
      bgColor: 'bg-blue-50 group-hover:bg-blue-100',
      borderColor: 'border-blue-200 group-hover:border-blue-300',
      url: 'https://www.airbnb.co.in/rooms/1445081925613736894?source_impression_id=p3_1774512782_P3cKhNGQNgKGuHYn',
      rating: 4.8,
      reviews: 3250,
      features: 'Genius Member Benefits • Free WiFi'
    }
  ];

  const handleRedirect = (url, platformName) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log(`Redirecting to ${platformName}: ${url}`);
  };

  return (
    <section className="w-full pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Book Your Stay
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find the best rates on your favorite booking platforms
          </p>
        </div>

        {/* OTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="group bg-white border-2 border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleRedirect(platform.url, platform.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleRedirect(platform.url, platform.name);
                }
              }}
              aria-label={`Book on ${platform.name}`}
            >
              <div className="p-6 text-center">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${platform.bgColor} mb-5 transition-all duration-300 group-hover:scale-110`}>
                  <div className={platform.color}>
                    {platform.icon}
                  </div>
                </div>
                
                {/* Platform Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {platform.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 font-semibold text-gray-800">{platform.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">·</span>

                </div>
                
               
                
                {/* Book Button */}
                <button
                  className={`w-full py-2.5 px-4 hover:bg-orange-500 bg-orange-400 rounded-lg border-2 text-white font-semibold font-medium hover:shadow-md transition-all duration-300`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRedirect(platform.url);
                  }}
                >
                  Visit Now →
                </button>
              </div>
            </div>
          ))}
        </div>
        
      
      </div>
    </section>
  );
};

export default OTASection;