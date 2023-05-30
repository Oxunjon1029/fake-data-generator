import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  setRegion,
  setErrors,
  setSeed,
  generateRecords,
  fetchMoreRecords,
  setHasMore,
} from './features/appSlice';
import RecordRow from './components/RecordRow';

const regions = ['Poland', 'USA', 'Georgia'];

const App = () => {
  const dispatch = useDispatch();
  const { region, seed, errors, records, hasMore } = useSelector(
    (state) => state.app
  );

  const handleRegionChange = (event) => {
    dispatch(setRegion(event.target.value));
    dispatch(generateRecords());
  };
  console.log(records);

  const handleErrorsChange = (event, value) => {
    dispatch(setErrors(value));
    dispatch(generateRecords());
  };
  const handleTextInputChange = (event) => {
    let value = event.target.value;
    if (value === '') {
      value = 0;
    }
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      if (numericValue > 10) {
        value = 10;
      }
      dispatch(setErrors(numericValue));
      dispatch(generateRecords());
    }
  };
  const handleSeedChange = (event) => {
    dispatch(setSeed(event.target.value));
    dispatch(generateRecords());
    dispatch(setHasMore(false));
    console.log(records);
  };

  const handleScroll = useCallback(() => {
    let wrappedEl = document.getElementById('app');
    if (
      hasMore &&
      wrappedEl.scrollHeight - wrappedEl.scrollTop === wrappedEl.clientHeight
    ) {
      dispatch(setHasMore(true));
      dispatch(fetchMoreRecords());
    }
  }, [dispatch, hasMore]);

  useEffect(() => {
    if (hasMore) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, hasMore]);
  return (
    <div id='app'>
      <h1 style={{ textAlign: 'center' }}>Fake User Data Generator</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id='region-label'>Region:</InputLabel>
          <Select id='region' value={region} onChange={handleRegionChange}>
            {regions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <InputLabel id='errors-label'>Errors per Record:</InputLabel>
          <Slider
            value={errors}
            step={0.5}
            marks
            min={0}
            max={10}
            sx={{ width: '300px' }}
            onChange={handleErrorsChange}
          />
        </div>
        <div>
          <TextField
            type='number'
            value={errors}
            sx={{ marginRight: '10px' }}
            onChange={handleTextInputChange}
            InputProps={{ inputProps: { min: 0, max: 1000, step: 0.5 } }}
          />
          <TextField
            id='seed'
            label='Seed'
            value={seed}
            onChange={handleSeedChange}
          />
        </div>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Identifier</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records?.map((record, index) => (
            <RecordRow key={record?.identifier} record={record} index={index} />
          ))}
        </TableBody>
      </Table>
      {hasMore && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default App;
