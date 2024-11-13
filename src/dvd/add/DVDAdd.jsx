import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '@neslotech/ui-utils';

import handleChange from '../../util/handle-change';

import { ReactComponent as CloseIcon } from '../../asset/icon/close.svg';

import '../../stylesheet/form.scss';

const DVDAdd = ({ handleDVDAdd }) => {
  const navigate = useNavigate();

  const [dvd, setDVD] = useState({
    title: '',
    director: '',
    duration: 0,
    leadActress: '',
    leadActor: '',
    releaseDate: new Date()
  });

  const handleSaveClick = () => {
    handleDVDAdd(dvd);
    navigate('/dvd/table');
  };

  return (
    <section className="form">
      <header>
        <h1>Add&nbsp;DVD</h1>
        <Link to="/dvd/table">
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
              value={dvd.title}
              onChange={(event) => handleChange(event, setDVD)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="director">Director</label>
            <input
              name="director"
              id="director"
              type="text"
              value={dvd.director}
              onChange={(event) => handleChange(event, setDVD)}
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
              value={dvd.duration}
              onChange={(event) => handleChange(event, setDVD)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="leadActress">Lead&nbsp;Actress</label>
            <input
              name="leadActress"
              id="leadActress"
              type="text"
              value={dvd.leadActress}
              onChange={(event) => handleChange(event, setDVD)}
            />
          </fieldset>
        </fieldset>
        <fieldset>
          <fieldset>
            <label htmlFor="leadActor">Lead&nbsp;Actor</label>
            <input
              name="leadActor"
              id="leadActor"
              type="text"
              value={dvd.leadActor}
              onChange={(event) => handleChange(event, setDVD)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="releaseDate">Release&nbsp;Date</label>
            <input
              name="releaseDate"
              id="releaseDate"
              type="date"
              value={formatDate(dvd.releaseDate, 'fr-CA')}
              onChange={(event) => handleChange(event, setDVD)}
            />
          </fieldset>
        </fieldset>
        <fieldset>
          <button onClick={handleSaveClick}>Save</button>
          <Link to="/dvd/table">Cancel</Link>
        </fieldset>
      </form>
    </section>
  );
};

export default DVDAdd;
