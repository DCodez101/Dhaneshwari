import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const STORAGE_KEY = "dhaneshwari_reservations";

function Reservation() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("deluxe");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) list.push(...JSON.parse(raw));
    } catch {
      /* ignore */
    }
    list.push({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      checkIn,
      checkOut,
      guests,
      roomType,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-semibold text-gray-900">
            Request received
          </h1>
          <p className="mt-3 text-gray-600">
            We&apos;ve saved your reservation request. Our team will contact you
            shortly to confirm availability and rates.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/booking"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
            >
              Continue to booking
            </Link>
            <Link
              to="/my-reservations"
              className="rounded-md border border-orange-300 bg-orange-50 px-6 py-3 text-sm font-semibold text-orange-700 hover:border-orange-400"
            >
              View your reservations
            </Link>
            <Link
              to="/"
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gray-400"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <Helmet>
        <title>Reservation Request | Dhaneshwari Hotel</title>
        <meta
          name="description"
          content="Submit your reservation request for Dhaneshwari Hotel and our team will confirm availability."
        />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? `${window.location.origin}/reservation`
              : "https://dhaneshwari.com/reservation"
          }
        />
      </Helmet>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Reservation</h1>
        <p className="mt-2 text-gray-600">
          Send a reservation request. For instant room selection and payment, use{" "}
          <Link
            to="/booking"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Booking
          </Link>
          .
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow-md"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="res-checkin"
              className="block text-sm font-medium text-gray-700"
            >
              Check-in
            </label>
            <input
              id="res-checkin"
              type="date"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label
              htmlFor="res-checkout"
              className="block text-sm font-medium text-gray-700"
            >
              Check-out
            </label>
            <input
              id="res-checkout"
              type="date"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="res-guests"
              className="block text-sm font-medium text-gray-700"
            >
              Guests
            </label>
            <input
              id="res-guests"
              type="number"
              min={1}
              max={10}
              required
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label
              htmlFor="res-room"
              className="block text-sm font-medium text-gray-700"
            >
              Room preference
            </label>
            <select
              id="res-room"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="deluxe">Deluxe</option>
              <option value="premium">Premium</option>
              <option value="suite">Suite</option>
              <option value="any">Any available</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="res-name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name
          </label>
          <input
            id="res-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="res-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="res-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label
              htmlFor="res-phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="res-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="res-notes"
            className="block text-sm font-medium text-gray-700"
          >
            Special requests (optional)
          </label>
          <textarea
            id="res-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-orange-500 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
        >
          Submit reservation request
        </button>
      </form>
    </div>
  );
}

export default Reservation;
