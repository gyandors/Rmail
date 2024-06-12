import { Link, NavLink } from 'react-router-dom';

import { XmarkIcon } from '../../assets/Icons';

export default function MobileSidebar() {
  return (
    <div
      className="hidden sm:hidden drop-shadow-lg w-64 h-full px-5 py-2 bg-blue-50 fixed z-50 animate-slideIn"
      id="hidden"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-gray-700">Rmail</h1>
        <button
          onClick={() => {
            document.getElementById('hidden').classList.toggle('hidden');
          }}
        >
          <XmarkIcon />
        </button>
      </div>
      <div className="py-10">
        <Link
          className="border-2 border-blue-600 rounded px-2 py-1 text-lg font-semibold duration-300 hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:outline-blue-600 focus:outline-offset-2"
          to="compose"
          onClick={() => {
            document.getElementById('hidden').classList.toggle('hidden');
          }}
        >
          Compose
        </Link>

        <ul className="mt-4 py-1 rounded">
          <li className="my-2">
            <NavLink
              className={({
                isActive,
              }) => `block px-2 py-1 rounded-r-2xl border-l-4
              ${
                isActive
                  ? 'bg-blue-200 font-semibold border-l-blue-700'
                  : 'hover:bg-blue-100'
              }
            `}
              to=""
              end
              onClick={() => {
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Inbox
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              className={({
                isActive,
              }) => `block px-2 py-1 rounded-r-2xl border-l-4
              ${
                isActive
                  ? 'bg-blue-200 font-semibold border-l-blue-700'
                  : 'hover:bg-blue-100'
              }
            `}
              to="sent"
              onClick={() => {
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Sent
            </NavLink>
          </li>
          <li className="my-2">
            <NavLink
              className={({
                isActive,
              }) => `block px-2 py-1 rounded-r-2xl border-l-4
              ${
                isActive
                  ? 'bg-blue-200 font-semibold border-l-blue-700'
                  : 'hover:bg-blue-100'
              }
            `}
              to="stared"
              onClick={() => {
                document.getElementById('hidden').classList.toggle('hidden');
              }}
            >
              Stared
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
