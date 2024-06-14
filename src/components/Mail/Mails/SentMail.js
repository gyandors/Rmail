import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleSpinner } from '../../../reducers/uiSlice';
import { setSentMails } from '../../../reducers/emailSlice';

import EmptyTab from '../../UI/EmptyTab';
import Loader from '../../UI/Loader';
import MailList from './MailList';

export default function SentMail() {
  const { email } = useSelector((state) => state.authState.loggedUser);
  const sentMails = useSelector((state) => state.emailState.sentMails);
  const spinner = useSelector((state) => state.uiState.spinner);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMails() {
      dispatch(toggleSpinner(true));
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          '.',
          ''
        )}/sentMails.json`
      );

      const data = await response.json();

      const mailArray = [];
      for (const key in data) {
        //Firebase won't store the empty arrays and objects.
        // Re-creating those properties manually, after reading the data back.
        const content = data[key].content;
        if (!content.entityMap) content.entityMap = {};
        content.blocks.map((c) => {
          if (!c.data) c.data = {};
          if (!c.entityRanges) c.entityRanges = [];
          if (!c.inlineStyleRanges) c.inlineStyleRanges = [];
          return c;
        });

        //Pushing the updated data
        mailArray.push({
          id: key,
          mail: data[key],
        });
      }

      dispatch(setSentMails(mailArray));
      dispatch(toggleSpinner(false));
    }

    fetchMails();
  }, [email, dispatch]);

  let content = <EmptyTab tab="Sent" />;
  if (sentMails.length > 0) {
    content = (
      <ul>
        {sentMails.map((m) => {
          return <MailList key={m.id} id={m.id} mail={m.mail} label="To:" />;
        })}
      </ul>
    );
  }
  if (spinner) content = <Loader />;

  return (
    <div className="w-11/12 m-auto rounded overflow-hidden sm:w-auto sm:mx-2">
      {content}
    </div>
  );
}
