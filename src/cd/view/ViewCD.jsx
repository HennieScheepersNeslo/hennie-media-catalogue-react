import React from 'react';

import { ReactComponent as CloseIcon } from '../../asset/icon/close.svg';

import '../../stylesheet/modal.scss';
import '../../stylesheet/styles.scss';

const ViewCD = ({ cd, closeView }) => {
  const { title, id, artist, duration, releaseDate } = cd;

  return (
    <section className="modal">
      <div>
        <header>
          <h1>{title}</h1>
          <button onClick={closeView}>
            <CloseIcon />
          </button>
        </header>
        <dl>
          <dt>ID: </dt>
          <dd>{id}</dd>

          <dt>Artist: </dt>
          <dd>{artist}</dd>

          <dt>Duration: </dt>
          <dd>{duration}</dd>

          <dt>Release&nbsp;Date: </dt>
          <dd>{releaseDate}</dd>
        </dl>
      </div>
    </section>
  );
};

export default ViewCD;
