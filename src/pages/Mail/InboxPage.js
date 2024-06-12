import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function InboxPage() {
  const { email } = useSelector((state) => state.authState.loggedUser);

  const [receivedMails, setReceivedMails] = useState([]);

  useEffect(() => {
    async function fetchSentMails() {
      const response = await fetch(
        'https://mail-box-c1237-default-rtdb.firebaseio.com/mails.json'
      );

      const data = await response.json();

      const mailArray = [];
      for (const key in data) {
        if (data[key].to === email) {
          mailArray.push({
            id: key,
            mail: data[key],
          });
        }
      }
      setReceivedMails(mailArray);
    }
    fetchSentMails();
  }, [email]);

  return (
    <div className="w-11/12 m-auto rounded overflow-hidden sm:w-auto sm:mx-2">
      <ul>
        {receivedMails.map((m) => {
          return (
            <li
              className="px-2 py-1 border-b flex justify-between gap-5"
              key={m.id}
            >
              <div className="w-52 overflow-hidden whitespace-nowrap text-ellipsis ">
                <span className="text-slate-500">From:</span>{' '}
                <span>{m.mail.from}</span>
              </div>
              <span className="w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                {m.mail.subject}
              </span>
              <div className="hidden sm:block"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
