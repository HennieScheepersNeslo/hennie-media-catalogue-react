import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '@neslotech/ui-utils';

import { ReactComponent as ArrowIcon } from '../../asset/icon/arrow.svg';
import { ReactComponent as CloseIcon } from '../../asset/icon/close.svg';
import { ReactComponent as DeleteIcon } from '../../asset/icon/delete.svg';
import { ReactComponent as EditIcon } from '../../asset/icon/edit.svg';
import { ReactComponent as ViewIcon } from '../../asset/icon/view.svg';

import BookView from '../view/BookView';

const BookRow = ({ book, handleDeleteClick, handleViewClick }) => {
  const { id, title, author, duration, publishedDate } = book;

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{duration}</td>
      <td>{formatDate(publishedDate, 'fr-CA')}</td>
      <td>
        <ViewIcon className="icon view-icon" onClick={handleViewClick} />
        <Link to={`/book/edit/${id}`}>
          <EditIcon className="icon edit-icon" />
        </Link>
        <DeleteIcon className="icon delete-icon" onClick={handleDeleteClick} />
      </td>
      <td>
        <ArrowIcon />
      </td>
    </tr>
  );
};

const BookDelete = ({ book, handleDeleteClose, deleteBook }) => {
  const { id, title, author, duration, publishedDate } = book;

  const handleConfirmClick = () => {
    deleteBook(id);
    handleDeleteClose();
  };

  return (
    <section className="modal">
      <header>
        <h1>Are you sure you want to delete this item?</h1>
        <button onClick={handleDeleteClose}>
          <CloseIcon />
        </button>
      </header>
      <dl>
        <dt>ID:</dt>
        <dd>{id}</dd>

        <dt>Title:</dt>
        <dd>{title}</dd>

        <dt>Author:</dt>
        <dd>{author}</dd>

        <dt>Duration:</dt>
        <dd>{duration}</dd>

        <dt>Release&nbsp;Date:</dt>
        <dd>{formatDate(publishedDate, 'fr-CA')}</dd>
      </dl>
      <div>
        <button onClick={handleConfirmClick}>Confirm</button>
        <button onClick={handleDeleteClose}>Cancel</button>
      </div>
    </section>
  );
};

const BookTable = ({ books, deleteBook }) => {
  const [bookToView, setBookToView] = useState(undefined);
  const [bookToDelete, setBookToDelete] = useState(undefined);

  const handleViewClick = (book) => {
    setBookToView(book);
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
  };

  const handleViewClose = () => {
    setBookToView(undefined);
  };

  const handleDeleteClose = () => {
    setBookToDelete(undefined);
  };

  const bookRows = useMemo(
    () =>
      books.map((book) => (
        <BookRow
          key={book.id}
          book={book}
          handleViewClick={() => handleViewClick(book)}
          handleDeleteClick={() => handleDeleteClick(book)}
        />
      )),
    [books]
  );

  return (
    <main className="table">
      <header>
        <div>
          <h1>Media&nbsp;Catalogue</h1>
          <nav>
            <Link className="link" to="/cd/table">
              CD
            </Link>
            <span>|</span>
            <Link className="link" to="/dvd/table">
              DVD
            </Link>
            <span>|</span>
            <Link className="link" id="current-location" to="/book/table">
              Book
            </Link>
          </nav>
        </div>
        <Link to="/book/add">Add&nbsp;Book</Link>
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Duration</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{bookRows}</tbody>
        </table>
        {bookToDelete && (
          <BookDelete
            book={bookToDelete}
            handleDeleteClose={handleDeleteClose}
            deleteBook={deleteBook}
          />
        )}
        {bookToView && <BookView book={bookToView} handleViewClose={handleViewClose} />}
      </section>
    </main>
  );
};

export default BookTable;
