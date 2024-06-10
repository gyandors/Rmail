import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MailEditor from './MailEditor';

export default function ComposeMail() {
  const { email } = useSelector((state) => state.authState.loggedUser);

  const toMailRef = useRef();
  const subjectRef = useRef();

  const navigate = useNavigate();

  let mailBody;
  function handleDoneEditing(mailContent) {
    mailBody = mailContent;
  }

  function handleSendEmail() {
    const mailDetails = {
      from: email,
      to: toMailRef.current.value,
      subject: subjectRef.current.value,
      body: mailBody,
    };

    async function sendMail() {
      const response = await fetch(
        'https://mail-box-c1237-default-rtdb.firebaseio.com/mails.json',
        {
          method: 'POST',
          body: JSON.stringify(mailDetails),
        }
      );

      const data = await response.json();
      console.log(response);
      console.log(data);
    }

    sendMail();
  }

  return (
    <div className="w-11/12 m-auto rounded overflow-hidden sm:w-auto sm:mx-2">
      <div className="p-1 bg-violet-600 text-white">
        <span>New Message</span>
        <button className="float-end mr-2" onClick={() => navigate('/home')}>
          ✕
        </button>
      </div>
      <div className="min-h-96 p-1 flex flex-col border rounded-b">
        <div className="border-b p-1 flex items-center">
          <label
            className="text-sm font-semibold text-slate-600"
            htmlFor="subject"
          >
            From:
          </label>
          <input
            className="px-2 flex-1 focus:outline-none"
            type="text"
            id="subject"
            defaultValue={email}
            readOnly
          />
        </div>
        <div className="border-b flex p-1 items-center">
          <label
            className="font-semibold text-sm text-slate-600"
            htmlFor="email"
          >
            To:
          </label>
          <input
            className="flex-1 px-2 focus:outline-none"
            type="email"
            id="email"
            ref={toMailRef}
          />
          <div className="text-slate-400 text-sm">
            <span className="mr-1">Cc</span>
            <span>Bcc</span>
          </div>
        </div>

        <div className="border-b p-1 flex items-center">
          <label
            className="text-sm font-semibold text-slate-600"
            htmlFor="subject"
          >
            Subject:
          </label>
          <input
            className="px-2 flex-1 focus:outline-none"
            type="text"
            id="subject"
            ref={subjectRef}
          />
        </div>
        <MailEditor onDoneEditing={handleDoneEditing} />
        <div className="p-1">
          <button
            className="rounded px-2 py-1 font-semibold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-violet-700 focus:outline-offset-2"
            onClick={handleSendEmail}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
