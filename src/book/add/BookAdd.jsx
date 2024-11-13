import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { formatDate } from '@neslotech/ui-utils';

import handleChange from '../../util/handle-change';

import { ReactComponent as CloseIcon } from '../../asset/icon/close.svg';

import '../../stylesheet/form.scss';

const BookAdd = ({ handleBookAdd }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    duration: '',
    publishedDate: new Date()
  });

  const handleAddClick = () => {
    handleBookAdd(book);
    navigate('/book/table');
  };

  return (
    <section className="form">
      <header>
        <h1>Add&nbsp;Book</h1>
        <Link to="/book/table">
          <CloseIcon />
        </Link>
      </header>

      <form>
        <fieldset>
          <fieldset>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              id="title"
              type="text"
              value={book.title}
              onChange={(event) => handleChange(event, setBook)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="author">Author</label>
            <input
              name="author"
              id="author"
              type="text"
              value={book.author}
              onChange={(event) => handleChange(event, setBook)}
            />
          </fieldset>
        </fieldset>

        <fieldset>
          <fieldset>
            <label htmlFor="duration">Duration</label>
            <input
              name="duration"
              id="duration"
              type="number"
              value={book.duration}
              onChange={(event) => handleChange(event, setBook)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="publishedDate">Published&nbsp;Date</label>
            <input
              name="publishedDate"
              id="publishedDate"
              type="date"
              value={formatDate(book.publishedDate, 'fr-CA')}
              onChange={(event) => handleChange(event, setBook)}
            />
          </fieldset>
        </fieldset>
        <fieldset>
          <button onClick={handleAddClick}>Add</button>

          <Link to="/book/table">Cancel</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default BookAdd;
