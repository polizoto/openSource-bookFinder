import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeMyBookInfo, removeBookId } from '../utils/localStorage';

const SavedBooks =  () => {

    const { loading, data } = useQuery(QUERY_ME);

    const userData = data?.me || [];

    const refreshPage = ()=>{
      window.location.reload();
   }

    const [deletedBook] = useMutation(DELETE_BOOK, {
      update(cache, {data: {deletedBook}}) {
        try {
          // could potentially not exist yet, so wrap in a try...catch
          const { me } = cache.readQuery({ query: QUERY_ME });
          console.log(me)
          console.log(deletedBook)
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, SavedBooks: [...me.savedBooks.filter(currentBook => currentBook.BookId !== deletedBook )]} }
          });
          console.log(me)
        } catch (e) {
          console.error(e);
        }
      }
      });

    const handleDeleteBook = async (removedBook) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deletedBook({
        variables: { bookId: removedBook },

      });

      removeBookId(removedBook);
      removeMyBookInfo(removedBook);
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
    refreshPage()

  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
      <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
        {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
