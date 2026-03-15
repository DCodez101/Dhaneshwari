// BookingPage.jsx
import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Star, X, User, Baby, Edit2 } from "lucide-react";

// Import images
import room1 from "../assets/Dhaneshwari Photoshoot/roomwithTV.jpeg";
import room2 from "../assets/Dhaneshwari Photoshoot/astheticRoom.jpeg";
import room3 from "../assets/Dhaneshwari Photoshoot/boubleBedRoom.jpeg";
import room4 from "../assets/Dhaneshwari Photoshoot/room5.jpeg";

function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      price: 2499,
      originalPrice: 3999,
      discount: 38,
      image: room1,
      size: "320 sq ft",
      beds: "1 King Bed",
      maxAdults: 2,
      maxChildren: 1,
      amenities: ["WiFi", "Breakfast", "TV", "AC"],
      available: 3
    },
    {
      id: 2,
      name: "Executive Suite",
      price: 3999,
      originalPrice: 5999,
      discount: 33,
      image: room2,
      size: "450 sq ft",
      beds: "1 King Bed + Sofa",
      maxAdults: 3,
      maxChildren: 2,
      amenities: ["WiFi", "Breakfast", "Mini Bar", "Jacuzzi"],
      available: 2
    },
    {
      id: 3,
      name: "Premium Room",
      price: 3299,
      originalPrice: 4999,
      discount: 34,
      image: room3,
      size: "380 sq ft",
      beds: "2 Queen Beds",
      maxAdults: 4,
      maxChildren: 2,
      amenities: ["WiFi", "Breakfast", "TV", "Balcony"],
      available: 4
    },
    {
      id: 4,
      name: "Family Suite",
      price: 5499,
      originalPrice: 7999,
      discount: 31,
      image: room4,
      size: "600 sq ft",
      beds: "2 King Beds",
      maxAdults: 5,
      maxChildren: 3,
      amenities: ["WiFi", "Kitchen", "Living Room", "2 TVs"],
      available: 1
    }
  ];

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setStep(2);
  };

  const handleDateSelect = () => {
    if (checkIn && checkOut) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleEditRoom = () => setStep(1);
  const handleEditDates = () => setStep(2);

  const nights = (!checkIn || !checkOut) ? 1 : 
    Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

  const total = selectedRoom ? (selectedRoom.price * nights * 1.15) : 0;

  return (
    <div className="min-h-screen bg-amber-50/30">
      {/* Progress Bar with Text */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-8xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              {step > 1 && (
                <button onClick={handleBack} className="text-amber-700 hover:text-amber-900 mr-2">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              
              {/* Step 1 */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>1</div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  step === 1 ? 'text-black font-semibold' : 'text-gray-500'
                }`}>Select Room</span>
              </div>
              
              <ChevronRight className="h-4 w-4 text-gray-400" />
              
              {/* Step 2 */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>2</div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  step === 2 ? 'text-amber-700' : 'text-gray-500'
                }`}>Select Dates</span>
              </div>
              
              <ChevronRight className="h-4 w-4 text-gray-400" />
              
              {/* Step 3 */}
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>3</div>
                <span className={`ml-2 text-sm font-medium hidden sm:block ${
                  step === 3 ? 'text-amber-700' : 'text-gray-500'
                }`}>Your Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Step 1: Room Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Select Room</h2>
                
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleRoomSelect(room)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border-2 border-transparent hover:border-amber-500 cursor-pointer"
                  >
                    <div className="flex flex-col">
                       <div className="relative h-48 md:h-60 w-full overflow-hidden rounded-lg">
    <img
      src={room.image}
      alt={room.name}
      className="w-full h-full object-cover"
    />

    {room.discount > 0 && (
      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        -{room.discount}%
      </div>
    )}
  </div>
<div>
                      <div className=" p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{room.name}</h3>
                          <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="text-sm font-semibold">4.5</span>
                          </div>
                        </div>

                        <div className="flex gap-3 mb-3 text-sm text-gray-600">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>{room.beds}</span>
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-6 w-6 text-orange-500 font-bold" />
                            <span>{room.maxAdults}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Baby className="h-6 w-6 text-orange-500 font-bold" />
                            <span>{room.maxChildren}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-around mt-auto pt-4 border-t border-gray-200">
                          <div>
                            <span className="text-2xl font-bold">₹{room.price}</span>
                            <span className="text-sm text-gray-500">/night</span>
                          </div>
                          <button className="bg-amber-600/80 hover:bg-amber-600 text-white px-6 py-2 rounded-lg">
                            Select
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Date Selection */}
            {step === 2 && selectedRoom && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Select Dates</h2>
                  <button onClick={handleEditRoom} className="text-amber-600 hover:text-amber-800">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl mb-6">
                  <img src={selectedRoom.image} alt={selectedRoom.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold">{selectedRoom.name}</h3>
                    <p className="text-sm text-gray-600">₹{selectedRoom.price}/night</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in</label>
                    <div className="relative">
                      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border rounded-lg px-4 py-3 focus:border-amber-500 outline-none" />
                      {checkIn && (
                        <button onClick={() => setCheckIn("")} className="absolute right-3 top-3 text-gray-400">
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out</label>
                    <div className="relative">
                      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn} disabled={!checkIn}
                        className="w-full border rounded-lg px-4 py-3 focus:border-amber-500 outline-none disabled:bg-gray-100" />
                      {checkOut && (
                        <button onClick={() => setCheckOut("")} className="absolute right-3 top-3 text-gray-400">
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <p className="font-medium">
                      {new Date(checkIn).toLocaleDateString()} → {new Date(checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{nights} nights</p>
                  </div>
                )}

                <button onClick={handleDateSelect} disabled={!checkIn || !checkOut}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    checkIn && checkOut ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 3: Guest Details */}
            {step === 3 && selectedRoom && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Your Details</h2>
                  <div className="flex gap-2">
                    <button onClick={handleEditRoom} className="text-amber-600"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={handleEditDates} className="text-amber-600"><Edit2 className="h-4 w-4" /></button>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg mb-6 flex items-center gap-4">
                  <img src={selectedRoom.image} alt={selectedRoom.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold">{selectedRoom.name}</p>
                    <p className="text-sm text-gray-600">{new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Adults</label>
                    <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full border rounded-lg px-4 py-2 focus:border-amber-500 outline-none">
                      {[...Array(selectedRoom.maxAdults)].map((_, i) => (
                        <option key={i} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Children</label>
                    <select value={children} onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full border rounded-lg px-4 py-2 focus:border-amber-500 outline-none">
                      {[...Array(selectedRoom.maxChildren + 1)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 mb-4 focus:border-amber-500 outline-none" />

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 mb-4 focus:border-amber-500 outline-none" />

                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 mb-6 focus:border-amber-500 outline-none" />

                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-semibold">
                    Back
                  </button>
                  <button onClick={() => alert("Booking Confirmed!")} 
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Price Details</h3>
              
              {selectedRoom ? (
                <>
                  <div className="flex items-center gap-3 pb-4 border-b mb-4">
                    <img src={selectedRoom.image} alt={selectedRoom.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold">{selectedRoom.name}</p>
                      <p className="text-sm text-gray-500">₹{selectedRoom.price}/night</p>
                    </div>
                  </div>

                  {checkIn && checkOut && (
                    <div className="pb-4 border-b mb-4">
                      <p className="text-sm text-gray-600">{nights} nights</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-amber-600">₹{Math.round(total)}</span>
                  </div>

                  {step === 3 && (
                    <button onClick={() => alert("Booking Confirmed!")} 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg">
                      Confirm Booking
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-center py-4">Select a room</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;