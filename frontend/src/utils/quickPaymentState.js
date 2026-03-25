/** Builds `location.state` for `/payment` (quick book: 1 night from today). */
export function buildQuickPaymentState({ name, image, pricePerNight }) {
  const checkIn = new Date().toISOString().split("T")[0];
  const checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + 1);
  const checkOut = checkOutDate.toISOString().split("T")[0];
  const nights = 1;
  const subtotal = pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + taxes;
  return {
    selectedRoom: { name, image },
    checkIn,
    checkOut,
    nights,
    adults: 2,
    children: 0,
    fullName: "Guest",
    email: "—",
    phone: "—",
    subtotal,
    taxes,
    total,
  };
}

export function parseRupeePrice(priceFrom) {
  const n = parseInt(String(priceFrom).replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}
