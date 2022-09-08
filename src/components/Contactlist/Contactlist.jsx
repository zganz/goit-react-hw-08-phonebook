import { useSelector } from 'react-redux';
import css from './Contact.module.css';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsApi';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export const ContactList = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  const [deleteContact, result] = useDeleteContactMutation();
  const filter = useSelector(state => state.filter);

  const contacts =
    data && filter
      ? data.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        )
      : data
      ? data
      : [];

  return (
    <>
      {error ? (
        <>Oops, Something Went Wrong</>
      ) : isLoading ? (
        <>Loading Contacts...</>
      ) : data ? (
        <ListGroup as="ol" numbered>
          {contacts.map(({ name, phone, id }) => (
            <ListGroup.Item as="li" key={id}>
              <span>{`${name}: ${phone}`}</span>
              <span>
                <Button
                  variant="warning"
                  className={css.contact}
                  disabled={result.isLoading}
                  onClick={() => deleteContact(id)}
                >
                  delete
                </Button>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </>
  );
};
