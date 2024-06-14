import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleSpinner } from '../../../reducers/uiSlice';
import { setReceivedMails } from '../../../reducers/emailSlice';

import EmptyTab from '../../UI/EmptyTab';
import Loader from '../../UI/Loader';
import MailList from './MailList';

export default function ReceivedMail() {
  const { email } = useSelector((state) => state.authState.loggedUser);
  const receivedMails = useSelector((state) => state.emailState.receivedMails);
  const spinner = useSelector((state) => state.uiState.spinner);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMails() {
      dispatch(toggleSpinner(true));
      const response = await fetch(
        `https://mail-box-c1237-default-rtdb.firebaseio.com/${email.replace(
          '.',
          ''
        )}/receivedMails.json`
      );

      const data = await response.json();

      let unreadMails = 0;
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

        if (data[key].read === false) unreadMails += 1;

        //Pushing the updated data
        mailArray.push({
          id: key,
          mail: data[key],
        });
      }

      dispatch(setReceivedMails({ mailArray, unreadMails }));
      dispatch(toggleSpinner(false));
    }

    fetchMails();
  }, [email, dispatch]);

  let content = <EmptyTab tab="Inbox" />;
  if (receivedMails.length > 0) {
    content = (
      <ul>
        {receivedMails.map((m) => {
          return <MailList key={m.id} id={m.id} mail={m.mail} label="From:" />;
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
