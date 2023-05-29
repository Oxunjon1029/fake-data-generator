import { createSlice } from '@reduxjs/toolkit';
import { fakerPL, fakerEN_US, fakerKA_GE } from '@faker-js/faker';


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
    nextPage: (state) => {
      state.currentPage += 1
    },
    setRecords: (state, action) => {
      state.records = action.payload
    },
    generateRecords: (state) => {
      const { recordsPerPage, errors, region } = state;
      switch (region) {
        case 'Poland':
          const newRecords = Array.from({ length: recordsPerPage }, (_, index) => {
            const identifier = fakerPL.string.uuid();
            const name = fakerPL.person.fullName();
            const address = fakerPL.location.streetAddress();
            const phone = formatPolishPhoneNumber(fakerPL.phone.number());

            let errorCount = Math.floor(errors);
            if (Math.random() < errors % 1) {
              errorCount += 1;
            }

            let erroneousName = name;
            for (let j = 0; j < errorCount; j++) {
              const randomIndex = Math.floor(Math.random() * erroneousName.length);
              const randomError = Math.floor(Math.random() * 3);

              switch (randomError) {
                case 0:
                  erroneousName = erroneousName.substring(0, randomIndex) + erroneousName.substring(randomIndex + 1);
                  break;
                case 1:
                  const randomCharacter = fakerEN_US.string.alphaNumeric;
                  erroneousName = erroneousName.substring(0, randomIndex) + randomCharacter + erroneousName.substring(randomIndex);
                  break;
                case 2:
                  if (randomIndex < erroneousName.length - 1) {
                    const charArray = erroneousName.split('');
                    const temp = charArray[randomIndex];
                    charArray[randomIndex] = charArray[randomIndex + 1];
                    charArray[randomIndex + 1] = temp;
                    erroneousName = charArray.join('');
                  }
                  break;
                default:
                  break;
              }
            }

            return {
              identifier,
              name: erroneousName,
              address,
              phone,
            };
          });
          state.records = [...state.records, ...newRecords];
          state.currentPage += 1;
          state.hasMore = newRecords.length === recordsPerPage;
          break
        case "USA":
          const newRecordsUS = Array.from({ length: recordsPerPage }, (_, index) => {
            const identifier = fakerEN_US.string.uuid();
            const name = fakerEN_US.person.fullName();
            const address = fakerEN_US.location.streetAddress();
            const phone = formatUSPhoneNumber(fakerEN_US.phone.number());

            let errorCount = Math.floor(errors);
            if (Math.random() < errors % 1) {
              errorCount += 1;
            }

            let erroneousName = name;
            for (let j = 0; j < errorCount; j++) {
              const randomIndex = Math.floor(Math.random() * erroneousName.length);
              const randomError = Math.floor(Math.random() * 3);

              switch (randomError) {
                case 0:
                  erroneousName = erroneousName.substring(0, randomIndex) + erroneousName.substring(randomIndex + 1);
                  break;
                case 1:
                  const randomCharacter = fakerEN_US.string.alphaNumeric;
                  erroneousName = erroneousName.substring(0, randomIndex) + randomCharacter + erroneousName.substring(randomIndex);
                  break;
                case 2:
                  if (randomIndex < erroneousName.length - 1) {
                    const charArray = erroneousName.split('');
                    const temp = charArray[randomIndex];
                    charArray[randomIndex] = charArray[randomIndex + 1];
                    charArray[randomIndex + 1] = temp;
                    erroneousName = charArray.join('');
                  }
                  break;
                default:
                  break;
              }
            }

            return {
              identifier,
              name: erroneousName,
              address,
              phone,
            };
          });
          state.records = [...state.records, ...newRecordsUS];
          state.currentPage += 1;
          state.hasMore = newRecordsUS.length === recordsPerPage;
          break
        case "Georgia":
          const newRecordsGEO = Array.from({ length: recordsPerPage }, (_, index) => {
            const identifier = fakerKA_GE.string.uuid();
            const name = fakerKA_GE.person.fullName();
            const address = fakerKA_GE.location.streetAddress();
            const phone = formatGeorgianPhoneNumber(fakerKA_GE.phone.number());

            let errorCount = Math.floor(errors);
            if (Math.random() < errors % 1) {
              errorCount += 1;
            }
            let erroneousName = name;
            for (let j = 0; j < errorCount; j++) {
              const randomIndex = Math.floor(Math.random() * erroneousName.length);
              const randomError = Math.floor(Math.random() * 3);

              switch (randomError) {
                case 0:
                  erroneousName = erroneousName.substring(0, randomIndex) + erroneousName.substring(randomIndex + 1);
                  break;
                case 1:
                  const randomCharacter = fakerKA_GE.string.alphaNumeric;
                  erroneousName = erroneousName.substring(0, randomIndex) + randomCharacter + erroneousName.substring(randomIndex);
                  break;
                case 2:
                  if (randomIndex < erroneousName.length - 1) {
                    const charArray = erroneousName.split('');
                    const temp = charArray[randomIndex];
                    charArray[randomIndex] = charArray[randomIndex + 1];
                    charArray[randomIndex + 1] = temp;
                    erroneousName = charArray.join('');
                  }
                  break;
                default:
                  break;
              }
            }
            return {
              identifier,
              name: erroneousName,
              address,
              phone,
            };
          });
          state.records = [...state.records, ...newRecordsGEO];
          state.currentPage += 1;
          state.hasMore = newRecordsGEO.length === recordsPerPage;
          break
        default:
          break

      }
    },
  },

});


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


export const { setRegion, setErrors, setSeed, nextPage, generateRecords, setRecords } = appSlice.actions;

export default appSlice.reducer;


