import { formatDate } from '@neslotech/ui-utils';

import { addItem, deleteItem, findItemIndex, updateItem } from './state-util';

describe('State Util', () => {
  const book2 = {
    id: 2,
    title: 'Book 2',
    author: 'A. Person',
    duration: 123,
    publishedDate: formatDate(new Date(), 'fr-CA')
  };

  test('finds item index', () => {
    const array = [
      {
        id: 1,
        title: 'Book 1',
        author: 'A. Person',
        duration: 123,
        publishedDate: formatDate(new Date(), 'fr-CA')
      }
    ];

    const actualIndex = findItemIndex(array, 1);

    expect(actualIndex).toBeGreaterThan(-1);
    expect(actualIndex).toEqual(0);
  });

  test('adds item', () => {
    const array = [
      {
        id: 1,
        title: 'Book 1',
        author: 'A. Person',
        duration: 123,
        publishedDate: formatDate(new Date(), 'fr-CA')
      }
    ];

    const expectedArray = [...array, { ...book2 }];

    addItem(array, book2);

    expect(expectedArray).toStrictEqual(array);
  });

  test('updates item', () => {
    const array = [
      {
        id: 1,
        title: 'Book 1',
        author: 'A. Person',
        duration: 123,
        publishedDate: formatDate(new Date(), 'fr-CA')
      }
    ];

    const updatedBook = { ...book2, duration: 321 };

    const expectedArray = [...array, { ...updatedBook }];

    addItem(array, book2);

    updateItem(array, updatedBook);

    expect(array.length).toEqual(expectedArray.length);

    expect(array).toStrictEqual(expectedArray);
  });

  test('deletes item', () => {
    const array = [
      {
        id: 1,
        title: 'Book 1',
        author: 'A. Person',
        duration: 123,
        publishedDate: formatDate(new Date(), 'fr-CA')
      }
    ];

    const expectedArray = [];

    deleteItem(array, 1);

    expect(array).toStrictEqual(expectedArray);
  });
});
