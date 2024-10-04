import { useDispatch, useSelector } from 'react-redux';

import { deleteDVD } from '../../state/dvd/dvd.reducer';

import DVDTable from '../table/DVDTable';

const DVDTableContainer = () => {
  const dvds = useSelector(({ dvdStore }) => dvdStore.dvds);

  const dispatch = useDispatch();

  const removeDVD = (id) => {
    dispatch(deleteDVD(id));
  };

  return <DVDTable dvds={dvds} removeDVD={removeDVD} />;
};

export default DVDTableContainer;
