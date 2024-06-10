import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="hidden sm:block w-64 h-full px-5 py-10 bg-slate-100 fixed">
      <div>
        <button
          className="rounded px-2 py-1 w-full font-semibold bg-slate-200 hover:drop-shadow-md active:bg-slate-300 focus:outline-slate-300 focus:outline-offset-2"
          onClick={() => navigate('compose')}
        >
          Compose
        </button>
      </div>
    </div>
  );
}
