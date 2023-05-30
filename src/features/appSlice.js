import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fakerPL, fakerEN_US, fakerKA_GE } from '@faker-js/faker';


const initialState = {
  region: '',
  errors: 0,
  seed: '',
  currentPage: 0,
  recordsPerPage: 20,
  moreRecordsPerPage: 10,
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

    setHasMore: (state, action) => {
      state.hasMore = action.payload
    },
    generateRecords: (state) => {
      let newRecords = []
      for (let i = 0; i < 20; i++) {
        let record = generateUserData(state)
        newRecords.push(record)
      }
      state.records = newRecords
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoreRecords.pending, (state) => {
      state.hasMore = true
    }).addCase(fetchMoreRecords.fulfilled, (state, action) => {
      state.records = [...state.records, ...action.payload]
    })
  }
});

const generateUserData = (state) => {
  const { errors, region } = state;
  switch (region) {
    case 'Poland':
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

    case "USA":

      const identifierUs = fakerEN_US.string.uuid();
      const nameUs = fakerEN_US.person.fullName();
      const addressUs = fakerEN_US.location.streetAddress();
      const phoneUs = formatUSPhoneNumber(fakerEN_US.phone.number());

      let errorCountUs = Math.floor(errors);
      if (Math.random() < errors % 1) {
        errorCountUs += 1;
      }

      let erroneousNameUs = nameUs;
      for (let j = 0; j < errorCountUs; j++) {
        const randomIndex = Math.floor(Math.random() * erroneousNameUs.length);
        const randomError = Math.floor(Math.random() * 3);

        switch (randomError) {
          case 0:
            erroneousNameUs = erroneousNameUs.substring(0, randomIndex) + erroneousNameUs.substring(randomIndex + 1);
            break;
          case 1:
            const randomCharacter = fakerEN_US.string.alphaNumeric;
            erroneousNameUs = erroneousNameUs.substring(0, randomIndex) + randomCharacter + erroneousNameUs.substring(randomIndex);
            break;
          case 2:
            if (randomIndex < erroneousNameUs.length - 1) {
              const charArray = erroneousNameUs.split('');
              const temp = charArray[randomIndex];
              charArray[randomIndex] = charArray[randomIndex + 1];
              charArray[randomIndex + 1] = temp;
              erroneousNameUs = charArray.join('');
            }
            break;
          default:
            break;
        }
      }

      return {
        identifier: identifierUs,
        name: erroneousNameUs,
        address: addressUs,
        phone: phoneUs,
      };
    // });
    // state.records = newRecordsUS
    // state.hasMore = false;
    // break
    case "Georgia":
      // Array.from({ length: recordsPerPage }, (_, index) => {
      const identifierGE = fakerKA_GE.string.uuid();
      const nameGE = fakerKA_GE.person.fullName();
      const addressGE = fakerKA_GE.location.streetAddress();
      const phoneGE = formatGeorgianPhoneNumber(fakerKA_GE.phone.number());

      let errorCountGE = Math.floor(errors);
      if (Math.random() < errors % 1) {
        errorCountGE += 1;
      }
      let erroneousNameGE = nameGE;
      for (let j = 0; j < errorCountGE; j++) {
        const randomIndex = Math.floor(Math.random() * erroneousNameGE.length);
        const randomError = Math.floor(Math.random() * 3);

        switch (randomError) {
          case 0:
            erroneousNameGE = erroneousNameGE.substring(0, randomIndex) + erroneousNameGE.substring(randomIndex + 1);
            break;
          case 1:
            const randomCharacter = fakerKA_GE.string.alphaNumeric;
            erroneousNameGE = erroneousNameGE.substring(0, randomIndex) + randomCharacter + erroneousNameGE.substring(randomIndex);
            break;
          case 2:
            if (randomIndex < erroneousNameGE.length - 1) {
              const charArray = erroneousNameGE.split('');
              const temp = charArray[randomIndex];
              charArray[randomIndex] = charArray[randomIndex + 1];
              charArray[randomIndex + 1] = temp;
              erroneousNameGE = charArray.join('');
            }
            break;
          default:
            break;
        }
      }
      return {
        identifier: identifierGE,
        name: erroneousNameGE,
        address: addressGE,
        phone: phoneGE,
      };
    // });
    // state.records = newRecordsGEO
    // state.hasMore = false;
    // break
    default:
      break

  }
}
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
export const fetchMoreRecords = createAsyncThunk(
  'app/fetchMoreRecords',
  async (page, { getState, rejectWithValue }) => {
    try {
      const state = getState().app

      let newRecords = [];
      for (let i = 0; i < 10; i++) {
        const record = generateUserData(state);
        newRecords.push(record)
      }
      console.log(newRecords);
      return newRecords;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const { setRegion, setErrors, setSeed, nextPage, generateRecords, setHasMore } = appSlice.actions;

export default appSlice.reducer;


