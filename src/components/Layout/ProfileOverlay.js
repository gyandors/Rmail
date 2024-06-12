import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from '../../slices/authSlice';

import { LogoutIcon } from '../../assets/Icons';

export default function ProfileOverlay(props) {
  const { email } = useSelector((state) => state.authState.loggedUser);
  const dispatch = useDispatch();

  return (
    <div id="overlay">
      <div
        className="w-full h-full fixed z-40"
        onClick={() => props.onCloseOverlay()}
      ></div>
      <div className="fixed z-50 top-14 right-6 rounded-xl bg-blue-50 drop-shadow-lg w-80 h-56 p-3 flex flex-col items-center justify-around">
        <h1 className="text-sm font-semibold">{email}</h1>
        <div className="flex flex-col items-center">
          <div>
            <img
              className="w-16 rounded-full"
              src={
                'https://media.licdn.com/dms/image/D5603AQHp6744V3xB7A/profile-displayphoto-shrink_200_200/0/1696220361749?e=2147483647&v=beta&t=CfzulK37KeKk7hwVO2Vov9BnlVuk7P-OF7drzN5FOcI'
              }
              alt=""
            />
          </div>
          <h1 className="text-xl">Sachin Gyandor</h1>
        </div>
        <div>
          <button
            className="flex items-center gap-1 bg-white rounded-3xl p-3 hover:bg-slate-200 focus:outline-slate-200"
            onClick={() => dispatch(onLogout())}
          >
            <LogoutIcon />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
