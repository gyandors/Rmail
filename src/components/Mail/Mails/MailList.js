import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MailList(props) {
  const { id, mail, label } = props;

  const { email } = useSelector((state) => state.authState.loggedUser);

  async function handleMailClick() {
    if (mail.read === false) {
      await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          '.',
          ''
        )}/receivedMails/${props.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({ ...mail, read: true }),
        }
      );
    }
  }

  return (
    <Link
      className={mail.read === false ? 'font-semibold' : 'font-normal'}
      to={`${id}`}
      onClick={handleMailClick}
    >
      <li className="px-2 py-3 border-b flex justify-between items-center gap-3 sm:gap-36 hover:bg-blue-50">
        <div className="basis-32 sm:basis-52 overflow-hidden whitespace-nowrap text-ellipsis">
          {mail.read === false && (
            <div className="inline-block mr-2 h-2.5 w-2.5 rounded-full bg-blue-700"></div>
          )}
          <span className="text-slate-500 text-sm">{label}</span>{' '}
          <span>{label === 'To:' ? mail.to : mail.from}</span>
        </div>
        <span className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
          {mail.subject}
        </span>
      </li>
    </Link>
  );
}
