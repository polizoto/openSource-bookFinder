export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

//

export const getMySavedBooks = () => {
  const savedBookInfo = localStorage.getItem('my_saved_books')
    ? JSON.parse(localStorage.getItem('my_saved_books'))
    : [];

  return savedBookInfo;
};

//

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const myBookInfo = (bookInfoArr) => {
  console.log("Hello")
    localStorage.setItem('my_saved_books', JSON.stringify(bookInfoArr));
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};

export const removeMyBookInfo = (bookInfo) => {
  const savedBookInfo = localStorage.getItem('my_saved_books')
    ? JSON.parse(localStorage.getItem('my_saved_books'))
    : null;

  if (!savedBookInfo) {
    return false;
  }
  const updatedSavedBookInfo = savedBookInfo?.filter((savedBookInfo) => savedBookInfo.bookId !== bookInfo);

  localStorage.setItem('my_saved_books', JSON.stringify(updatedSavedBookInfo));
  console.log(updatedSavedBookInfo)
  return true;
};
