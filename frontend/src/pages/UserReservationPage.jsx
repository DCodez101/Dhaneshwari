import React, { useState, useEffect } from 'react';
import SuperiorLuxuryBedroom from '../assets/Dhaneshwari Photoshoot/Superior Luxury Bedroom.jpeg';
import PremiumLuxuryDoubleBedroom from '../assets/Dhaneshwari Photoshoot/Premium Luxury Double Bedroom.jpg';
import SuperiorDeluxeDoubleBedroom from '../assets/Dhaneshwari Photoshoot/Superior Deluxe Double Bedroom.jpg';
import PremiumLuxuryFamilyRoom from '../assets/Dhaneshwari Photoshoot/Premium Luxury Family Room.jpeg';
const DhaneshwariReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, price, guests
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call with enhanced data
    setTimeout(() => {
      const data =[
  {
    id: 'BOOK-101',
    roomType: 'Superior Luxury Bedroom',
    roomNumber: '401',
    guests: 2,
    pricePerNight: 3999,
    totalAmount: 7998,
    checkIn: '2026-04-01',
    checkOut: '2026-04-03',
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    status: 'upcoming',
    payment: 'paid',
    paymentMethod: 'Credit Card',
    image: SuperiorLuxuryBedroom,
    amenities: [
      'Daily Housekeeping', 'Wi-Fi', 'Air Conditioning', 'Heater', 'TV',
      'Work Desk', 'Seating Area', 'Kettle', 'Hairdryer', 'Hot & Cold Water'
    ],
    specialRequests: 'Extra pillows, late check-in',
    bookingDate: '2025-12-15',
    nights: 2,
    cancellationPolicy: 'Free cancellation until 3 days before check-in',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'BOOK-102',
    roomType: 'Premium Luxury Double Bedroom',
    roomNumber: '512',
    guests: 3,
    pricePerNight: 5999,
    totalAmount: 17997,
    checkIn: '2025-12-10',
    checkOut: '2025-12-13',
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    status: 'completed',
    payment: 'paid',
    paymentMethod: 'PayPal',
    image: PremiumLuxuryDoubleBedroom,
    amenities: [
      'Daily Housekeeping', 'Wi-Fi', 'Air Conditioning', 'Heater', 'TV',
      'Work Desk', 'Seating Area', 'Kettle', 'Hairdryer', 'Hot & Cold Water',
      'Sofa', 'Pillow Menu'
    ],
    specialRequests: 'Flower decoration, cake',
    bookingDate: '2025-10-20',
    nights: 3,
    cancellationPolicy: 'Non-refundable',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'BOOK-103',
    roomType: 'Superior Deluxe Double Bedroom',
    roomNumber: '305',
    guests: 2,
    pricePerNight: 2999,
    totalAmount: 2999,
    checkIn: '2026-05-15',
    checkOut: '2026-05-16',
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    status: 'upcoming',
    payment: 'partial',
    paymentMethod: 'Wallet',
    image: SuperiorDeluxeDoubleBedroom,
    amenities: [
      'Daily Housekeeping', 'Wi-Fi', 'Air Conditioning', 'TV',
      'Work Desk', 'Kettle', 'Hot & Cold Water', 'Ceiling Fan'
    ],
    specialRequests: 'Quiet room, high floor',
    bookingDate: '2026-01-10',
    nights: 1,
    cancellationPolicy: 'Free cancellation',
    rating: 4.7,
    reviews: 203
  },
  {
    id: 'BOOK-104',
    roomType: 'Premium Luxury Family Room',
    roomNumber: '201',
    guests: 4,
    pricePerNight: 7999,
    totalAmount: 23997,
    checkIn: '2025-11-20',
    checkOut: '2025-11-23',
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    status: 'completed',
    payment: 'paid',
    paymentMethod: 'Bank Transfer',
    image: PremiumLuxuryFamilyRoom,
    amenities: [
      'Daily Housekeeping', 'Wi-Fi', 'Air Conditioning', 'Heater', 'TV',
      'Work Desk', 'Seating Area', 'Sofa', 'Kettle', 'Hairdryer',
      'Hot & Cold Water', 'Childcare', 'Power backup'
    ],
    specialRequests: 'Baby cot, extra bedding',
    bookingDate: '2025-09-05',
    nights: 3,
    cancellationPolicy: 'Free cancellation',
    rating: 4.6,
    reviews: 67
  }
];
      setReservations(data);
      setIsLoading(false);
    }, 800);
  }, []);

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amt) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentBadge = (payment) => {
    const badges = {
      paid: 'bg-emerald-100 text-emerald-800',
      partial: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-orange-100 text-orange-800'
    };
    return badges[payment] || 'bg-gray-100 text-gray-800';
  };

  // Filter and sort reservations
  const getFilteredAndSortedReservations = () => {
    let filtered = reservations.filter(r => {
      // Status filter
      if (filter !== 'all' && r.status !== filter) return false;
      // Search filter
      if (searchTerm && !r.roomType.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !r.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.checkIn) - new Date(a.checkIn)
          : new Date(a.checkIn) - new Date(b.checkIn);
      } else if (sortBy === 'price') {
        return sortOrder === 'desc' 
          ? b.totalAmount - a.totalAmount
          : a.totalAmount - b.totalAmount;
      } else if (sortBy === 'guests') {
        return sortOrder === 'desc' 
          ? b.guests - a.guests
          : a.guests - b.guests;
      }
      return 0;
    });

    return filtered;
  };

  const filteredReservations = getFilteredAndSortedReservations();

  // Statistics
  const stats = {
    total: reservations.length,
    upcoming: reservations.filter(r => r.status === 'upcoming').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    totalSpent: reservations.reduce((sum, r) => sum + r.totalAmount, 0)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
    My Reservations
  </h1>
  <p className="text-gray-600">
    Manage and view all your bookings
  </p>
</div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">Upcoming</p>
            <p className="text-2xl font-bold text-gray-800">{stats.upcoming}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <p className="text-gray-500 text-sm">Total Spent</p>
            <p className="text-2xl font-bold text-green-800">{formatCurrency(stats.totalSpent)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {['all', 'upcoming', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    filter === f 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'All Bookings' : f}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filter
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by room or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

         
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border rounded-lg text-sm"
                >
                  <option value="date">Date</option>
                  <option value="price">Price</option>
                  <option value="guests">Guests</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-50"
                >
                  {sortOrder === 'desc' ? '↓ Newest' : '↑ Oldest'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reservations Grid */}
        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No reservations found</p>
            <p className="text-gray-400 mt-2">Try changing your filters or search term</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReservations.map(res => (
              <div key={res.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img 
                      src={res.image} 
                      alt={res.roomType}
                      className="h-56 md:h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(res.status)}`}>
                        {res.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentBadge(res.payment)}`}>
                        {res.payment}
                      </span>
                    </div>
                   
                  </div>

                  {/* Content Section */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{res.roomType}</h2>
                        <p className="text-gray-500 text-sm">Room {res.roomNumber}</p>
                      </div>
                      <p className="text-gray-500 text-sm font-mono bg-gray-100 px-3 py-1 rounded-md">
                        {res.id}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase">Check-in</p>
                        <p className="font-semibold text-gray-700">{formatDate(res.checkIn)}</p>
                        <p className="text-xs text-gray-500">{res.checkInTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase">Check-out</p>
                        <p className="font-semibold text-gray-700">{formatDate(res.checkOut)}</p>
                        <p className="text-xs text-gray-500">{res.checkOutTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase">Guests</p>
                        <p className="font-semibold text-gray-700">{res.guests} Guests</p>
                        <p className="text-xs text-gray-500">{res.nights} Nights</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase">Total</p>
                        <p className="font-semibold text-orange-600 text-lg">{formatCurrency(res.totalAmount)}</p>
                        <p className="text-xs text-gray-500">{formatCurrency(res.pricePerNight)}/night</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {res.amenities.slice(0, 4).map((a, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {a}
                        </span>
                      ))}
                      {res.amenities.length > 4 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                          +{res.amenities.length - 4}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelected(res)}
                      className="mt-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2 group/btn"
                    >
                      View Details
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{selected.roomType}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {/* Booking Details */}
              <div className="mb-6 pb-4 border-b">
                <h3 className="font-semibold text-gray-700 mb-3">Booking Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p><span className="text-gray-500">Booking ID:</span> <span className="font-mono">{selected.id}</span></p>
                  <p><span className="text-gray-500">Booking Date:</span> {formatDate(selected.bookingDate)}</p>
                  <p><span className="text-gray-500">Room Number:</span> {selected.roomNumber}</p>
                  <p><span className="text-gray-500">Guests:</span> {selected.guests}</p>
                  <p><span className="text-gray-500">Check-in:</span> {formatDate(selected.checkIn)} at {selected.checkInTime}</p>
                  <p><span className="text-gray-500">Check-out:</span> {formatDate(selected.checkOut)} at {selected.checkOutTime}</p>
                  <p><span className="text-gray-500">Nights:</span> {selected.nights}</p>
                  <p><span className="text-gray-500">Payment Method:</span> {selected.paymentMethod}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mb-6 pb-4 border-b">
                <h3 className="font-semibold text-gray-700 mb-3">Price Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{formatCurrency(selected.pricePerNight)} x {selected.nights} nights</span>
                    <span>{formatCurrency(selected.pricePerNight * selected.nights)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total Amount</span>
                    <span className="text-orange-600 text-lg">{formatCurrency(selected.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6 pb-4 border-b">
                <h3 className="font-semibold text-gray-700 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.amenities.map((a, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              {selected.specialRequests && (
                <div className="mb-6 pb-4 border-b">
                  <h3 className="font-semibold text-gray-700 mb-2">Special Requests</h3>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{selected.specialRequests}</p>
                </div>
              )}

              {/* Cancellation Policy */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Cancellation Policy</h3>
                <p className="text-gray-500 text-sm">{selected.cancellationPolicy}</p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              {selected.status === 'upcoming' && (
                <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DhaneshwariReservations;