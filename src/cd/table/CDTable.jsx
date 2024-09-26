import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '@neslotech/ui-utils';

import { ReactComponent as ArrowIcon } from '../../asset/icon/arrow.svg';
import { ReactComponent as CloseIcon } from '../../asset/icon/close.svg';
import { ReactComponent as DeleteIcon } from '../../asset/icon/delete.svg';
import { ReactComponent as EditIcon } from '../../asset/icon/edit.svg';
import { ReactComponent as ViewIcon } from '../../asset/icon/view.svg';

import ViewCD from '../view/ViewCD';

import '../../stylesheet/styles.scss';
import '../../stylesheet/table.scss';

const CDRow = ({ id, title, artist, duration, releaseDate, setCDView, setCDToDelete }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>{artist}</td>
    <td>{duration}</td>
    <td>{releaseDate}</td>
    <td>
      <ViewIcon className="icon view-icon" onClick={setCDView} />
      <EditIcon className="icon edit-icon" />
      <DeleteIcon className="icon delete-icon" onClick={setCDToDelete} />
    </td>
    <td>
      <ArrowIcon />
    </td>
  </tr>
);

const DeleteCD = ({ cd, closeDelete }) => {
  const { title, id, artist, duration, releaseDate } = cd;

  //TODO: Implement actual hhtp delete

  return (
    <section className="modal">
      <div>
        <header>
          <h1>Are you sure you want to delete this item?</h1>
          <button onClick={closeDelete}>
            <CloseIcon />
          </button>
        </header>
        <dl>
          <dt>ID:</dt>
          <dd>{id}</dd>

          <dt>Title:</dt>
          <dd>{title}</dd>

          <dt>Artist:</dt>
          <dd>{artist}</dd>

          <dt>Duration:</dt>
          <dd>{duration}</dd>

          <dt>Release&nbsp;Date:</dt>
          <dd>{releaseDate}</dd>
        </dl>
        <fieldset>
          <button>Confirm</button>
          <button onClick={closeDelete}>Cancel</button>
        </fieldset>
      </div>
    </section>
  );
};

const mockCDs = [
  {
    id: 1,
    title: 'Nevermind',
    artist: 'Nirvana',
    duration: '48',
    releaseDate: formatDate('1991-04-24', 'fr-CA')
  },
  {
    id: 2,
    title: 'Gorillaz',
    artist: 'Gorillaz',
    duration: '61',
    releaseDate: formatDate('2001-03-26', 'fr-CA')
  }
];

const CDTable = () => {
  const [cds, setCds] = useState([]);
  const [cdToView, setCDToView] = useState(undefined);
  const [cdToDelete, setCDToDelete] = useState(undefined);

  useEffect(() => {
    // TODO: Make actual API call to initialize cds

    setCds(mockCDs);
  }, []);

  const handleViewClick = (cd) => {
    setCDToView(cd);
  };

  const closeView = () => {
    setCDToView(undefined);
  };

  const handleDeleteClick = (cd) => {
    setCDToDelete(cd);
  };

  const closeDelete = () => {
    setCDToDelete(undefined);
  };

  const tableRows = useMemo(
    () =>
      cds.map((cd) => (
        <CDRow
          key={cd.id}
          id={cd.id}
          title={cd.title}
          artist={cd.artist}
          duration={cd.duration}
          releaseDate={cd.releaseDate}
          setCDView={() => handleViewClick(cd)}
          setCDToDelete={() => handleDeleteClick(cd)}
        ></CDRow>
      )),
    [cds]
  );

  return (
    <section className="table">
      <header>
        <div>
          <h1>Media&nbsp;Catalogue</h1>
          <nav>
            <Link className="link" id="current-location" to="/">
              CD
            </Link>
            <span>|</span>
            <Link className="link" to="/dvd-table">
              DVD
            </Link>
            <span>|</span>
            <Link className="link" to="/book-table">
              Book
            </Link>
          </nav>
        </div>
        <button>Add&nbsp;CD</button>
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        {cdToDelete && <DeleteCD cd={cdToDelete} closeDelete={closeDelete} />}
        {cdToView && <ViewCD className="dialog" cd={cdToView} closeView={closeView} />}
      </section>
    </section>
  );
};

export default CDTable;
