import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from '../MailEditor.module.css';

import { BackArrow } from '../../../assets/Icons';

export default function MailBody() {
  const { mailId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const sentMails = useSelector((state) => state.emailState.sentMails);
  const receivedMails = useSelector((state) => state.emailState.receivedMails);

  const allMails = [...sentMails, ...receivedMails];
  const { mail } = allMails.find((m) => m.id === mailId);

  return (
    <div className="w-11/12 m-auto rounded overflow-hidden sm:w-auto sm:mx-2">
      <header className="rounded p-1">
        <button
          className="rounded-full border border-blue-100 p-1 hover:bg-blue-50 active:bg-blue-100"
          onClick={() => navigate(-1)}
        >
          <BackArrow />
        </button>
      </header>
      <section className="p-2">
        <div className="mb-5">
          <h1 className="text-xl font-medium">{mail.subject}</h1>
          <p className="text-sm text-slate-700">
            {location.pathname.includes('inbox')
              ? `<${mail.from}>`
              : `<${mail.to}>`}
          </p>
        </div>
        <Editor
          editorClassName={styles.editor}
          initialContentState={mail.content}
          readOnly
          toolbarHidden
        />
      </section>
    </div>
  );
}
