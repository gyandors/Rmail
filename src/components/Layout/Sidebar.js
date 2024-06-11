import { Link, NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="hidden sm:block w-64 h-full px-5 py-10 bg-slate-100 fixed">
      <div>
        <Link
          className="border-2 border-violet-600 rounded px-2 py-1 text-lg font-semibold hover:bg-violet-600 hover:text-white active:bg-violet-700 focus:outline-violet-600 focus:outline-offset-2"
          to="compose"
        >
          Compose
        </Link>
      </div>
      <div className="list-none mt-4 py-1 rounded">
        <li className="my-2">
          <NavLink
            className={({
              isActive,
            }) => `block px-2 py-1 rounded-r-2xl border-l-4
              ${
                isActive
                  ? 'bg-slate-300 font-semibold border-l-violet-700'
                  : 'hover:bg-slate-200'
              }
            `}
            to="inbox"
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
                  ? 'bg-slate-300 font-semibold border-l-violet-700'
                  : 'hover:bg-slate-200'
              }
            `}
            to="sent"
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
                  ? 'bg-slate-300 font-semibold border-l-violet-700'
                  : 'hover:bg-slate-200'
              }
            `}
            to="stared"
          >
            Stared
          </NavLink>
        </li>
      </div>
    </div>
  );
}
