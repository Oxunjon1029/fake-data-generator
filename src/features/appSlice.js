import { createSelector, createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

const initialState = {
  region: '',
  errors: 0,
  seed: '',
  currentPage: 0,
  recordsPerPage: 20,
  records: [],
  hasMore: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setSeed: (state, action) => {
      state.seed = action.payload;
    },
    generateRecords: (state) => {
      const { region, errors, seed, currentPage, recordsPerPage } = state;

      const start = currentPage * recordsPerPage;
      const end = start + recordsPerPage;

      const records = generateUserRecords(region, errors, seed, start, end);

      state.records = [...state.records, ...records];
      state.currentPage += 1;
    },
    
  },
});

const generateUserRecords = (region, errors, seed, start, end) => {
  faker.seed(parseInt(seed, 10));
  const records = [];

  for (let i = start; i < end; i++) {
    const randomIdentifier = faker.string.uuid();
    const name = faker.person.fullName(undefined, undefined, region);
    const address = faker.location.streetAddress(undefined, region);
    const phone = faker.phone.number(undefined, region);

    const record = {
      index: i + 1,
      randomIdentifier,
      name,
      address,
      phone: formatPhoneNumber(phone),
    };

    if (errors > 0) {
      const errorCount = Math.min(errors, 10);
      const errorIndexes = getRandomIndexes(errorCount, record);

      for (const index of errorIndexes) {
        record.name = introduceError(record.name, index);
        record.address = introduceError(record.address, index);
        record.phone = introduceError(record.phone, index);
      }
    }

    records.push(record);
  }

  return records;
};

const formatPhoneNumber = (phoneNumber,region) => {
  let formattedNumber = phoneNumber;

  switch (region) {
    case 'poland':
      formattedNumber = formatPolishPhoneNumber(phoneNumber);
      break;
    case 'usa':
      formattedNumber = formatUSPhoneNumber(phoneNumber);
      break;
    case 'georgia':
      formattedNumber = formatGeorgianPhoneNumber(phoneNumber);
      break;
    default:
      break;
  }

  return formattedNumber;
};
const formatPolishPhoneNumber = (phoneNumber) => {
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  const match = cleanPhoneNumber.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+48 ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phoneNumber;
};

const formatUSPhoneNumber = (phoneNumber) => {
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  const match = cleanPhoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

const formatGeorgianPhoneNumber = (phoneNumber) => {
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  const match = cleanPhoneNumber.match(/^(\d{3})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `+995 ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phoneNumber;
};

const getRandomIndexes = (count, record) => {
  const indexes = [];

  for (let i = 0; i < count; i++) {
    const index = faker.datatype.number({ min: 0, max: record.name.length - 1 });
    indexes.push(index);
  }

  return indexes;
};

const introduceError = (str, index) => {
  const errorType = faker.helpers.arrayElement(['delete', 'add', 'swap']);

  switch (errorType) {
    case 'delete':
      return str.slice(0, index) + str.slice(index + 1);
    case 'add':
      const randomChar = faker.string.alphaNumeric;
      return str.slice(0, index) + randomChar + str.slice(index);
    case 'swap':
      return (
        str.slice(0, index) +
        str[index + 1] +
        str[index] +
        str.slice(index + 2)
      );
    default:
      return str;
  }
};
const selectApp = (state) => state.app;

export const selectRecords = createSelector([selectApp], (app) => app.records);

export const selectHasMore = createSelector([selectApp], (app) => app.hasMore);
export const { setRegion, setErrors, setSeed, generateRecords, exportToCSVFormat } = appSlice.actions;

export default appSlice.reducer;


