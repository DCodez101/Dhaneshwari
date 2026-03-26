import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProfileForm({ user, updateProfile, signOut }) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(false);
    updateProfile({ id: user.id, name, phone });
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="rounded-2xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome back, {name}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Update your details. Email cannot be changed here.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
              {user.email}
            </p>
          </div>
          <div>
            <label
              htmlFor="profile-phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          {saved && (
            <p className="text-sm font-medium text-green-700">
              Profile saved successfully.
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-orange-600"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gray-400"
            >
              Sign out
            </button>
          </div>
        </form>

        <p className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-600">
          Need a reservation?{" "}
          <Link
            to="/reservation"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Make a reservation
          </Link>{" "}
          or{" "}
          <Link
            to="/booking"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            full booking flow
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Profile() {
  const { user, isAuthenticated, updateProfile, signOut } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: { pathname: "/profile" } }}
      />
    );
  }

  return (
    <ProfileForm
      user={user}
      updateProfile={updateProfile}
      signOut={signOut}
    />
  );
}

export default Profile;
