import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Lock,
  CheckCircle2,
  User,
  Mail,
  Phone,
} from "lucide-react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!booking?.selectedRoom || !booking?.total) {
      navigate("/booking", { replace: true });
    }
  }, [booking, navigate]);

  if (!booking?.selectedRoom) {
    return null;
  }

  const { selectedRoom, checkIn, checkOut, nights, fullName, email, phone, subtotal, taxes, total } =
    booking;

  const handlePay = (e) => {
    e.preventDefault();
    setError("");
    if (method === "upi") {
      if (!upiId.trim() || !upiId.includes("@")) {
        setError("Enter a valid UPI ID (e.g. name@upi).");
        return;
      }
    } else {
      const digits = cardNumber.replace(/\s/g, "");
      if (digits.length < 12 || !cardName.trim() || cardExpiry.length < 4 || cardCvv.length < 3) {
        setError("Please complete all card fields.");
        return;
      }
    }
    setSuccess(true);
  };

  const formatCard = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  return (
    <div className="pb-16">
      <section className="border-b border-gray-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Link
            to="/booking"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to booking
          </Link>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Complete payment
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Secure checkout — review your stay and pay with UPI or card. This is a demo flow; no
            real charges are made.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {success ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-gray-900">Thank you</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your reservation request has been recorded. We&apos;ll confirm by email shortly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Back to home
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Contact us
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-serif text-xl font-semibold text-gray-900">Payment method</h2>
                <p className="mt-1 text-sm text-gray-600">Choose how you&apos;d like to pay.</p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMethod("upi")}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${
                      method === "upi"
                        ? "border-orange-500 bg-orange-50/60"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <Smartphone className="h-6 w-6 shrink-0 text-orange-500" />
                    <div>
                      <p className="font-semibold text-gray-900">UPI</p>
                      <p className="text-xs text-gray-600">Google Pay, PhonePe, Paytm…</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition ${
                      method === "card"
                        ? "border-orange-500 bg-orange-50/60"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 shrink-0 text-orange-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Card</p>
                      <p className="text-xs text-gray-600">Debit or credit</p>
                    </div>
                  </button>
                </div>

                <form onSubmit={handlePay} className="mt-8 space-y-4">
                  {method === "upi" ? (
                    <div>
                      <label htmlFor="upi" className="block text-sm font-medium text-gray-700">
                        UPI ID
                      </label>
                      <input
                        id="upi"
                        type="text"
                        autoComplete="off"
                        placeholder="you@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none ring-orange-500/30 transition focus:border-orange-500 focus:ring-2"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cname" className="block text-sm font-medium text-gray-700">
                          Name on card
                        </label>
                        <input
                          id="cname"
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none ring-orange-500/30 transition focus:border-orange-500 focus:ring-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="cnum" className="block text-sm font-medium text-gray-700">
                          Card number
                        </label>
                        <input
                          id="cnum"
                          type="text"
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCard(e.target.value))}
                          className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 font-mono text-gray-900 outline-none ring-orange-500/30 transition focus:border-orange-500 focus:ring-2"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="exp" className="block text-sm font-medium text-gray-700">
                            Expiry (MM/YY)
                          </label>
                          <input
                            id="exp"
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none ring-orange-500/30 transition focus:border-orange-500 focus:ring-2"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none ring-orange-500/30 transition focus:border-orange-500 focus:ring-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {error ? (
                    <p className="text-sm font-medium text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    <Lock className="h-4 w-4" />
                    Pay ₹{total.toLocaleString("en-IN")}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative h-40 w-full sm:h-44">
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-3 left-4 font-serif text-lg font-semibold text-white">
                      {selectedRoom.name}
                    </p>
                  </div>
                  <div className="space-y-3 p-5 sm:p-6">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Check-in</span>
                      <span className="font-medium text-gray-900">
                        {new Date(checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Check-out</span>
                      <span className="font-medium text-gray-900">
                        {new Date(checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Nights</span>
                      <span className="font-medium text-gray-900">{nights}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span className="font-medium text-gray-900">{fullName}</span>
                      </div>
                      <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span>{email}</span>
                      </div>
                      <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        <span>{phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                  <h3 className="font-serif text-lg font-semibold text-gray-900">Bill summary</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <dt>Room × {nights} night{nights !== 1 ? "s" : ""}</dt>
                      <dd className="font-medium text-gray-900">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </dd>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <dt>Taxes & fees (15%)</dt>
                      <dd className="font-medium text-gray-900">
                        ₹{taxes.toLocaleString("en-IN")}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
                      <dt>Total</dt>
                      <dd className="text-orange-600">₹{total.toLocaleString("en-IN")}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
