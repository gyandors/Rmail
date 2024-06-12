import { useState } from 'react';

import { MenuBarIcon } from '../../assets/Icons';
import mailIcon from '../../assets/mail-icon.png';
import ProfileOverlay from './ProfileOverlay';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-12 shadow-md">
      <div className="w-full flex justify-between items-center py-2 px-5 bg-blue-50 fixed z-30">
        <h1 className="hidden sm:block font-semibold text-2xl text-gray-700">
          Rmail
        </h1>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => {
            document.getElementById('hidden').classList.toggle('hidden');
          }}
        >
          <MenuBarIcon />
        </button>
        <div>
          <img className="rounded-full w-8" src={mailIcon} alt="mail icon" />
        </div>

        <button
          className="w-8 rounded-full border-2 hover:border-blue-300 focus:outline-blue-400 focus:outline-offset-2"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img
            className="rounded-full"
            src={
              'https://media.licdn.com/dms/image/D5603AQHp6744V3xB7A/profile-displayphoto-shrink_200_200/0/1696220361749?e=2147483647&v=beta&t=CfzulK37KeKk7hwVO2Vov9BnlVuk7P-OF7drzN5FOcI'
            }
            alt=""
          />
        </button>
      </div>
      {showProfile && (
        <ProfileOverlay onCloseOverlay={() => setShowProfile(!showProfile)} />
      )}
      <Sidebar />
      <MobileSidebar />
    </header>
  );
}
