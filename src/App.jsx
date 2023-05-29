import React, { useEffect } from 'react';
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
  nextPage,
} from './features/appSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecordRow from './components/RecordRow';

const regions = ['Poland', 'USA', 'Georgia'];

const App = () => {
  const dispatch = useDispatch();
  const { region, seed, errors, records, hasMore } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(generateRecords());
  }, [region, errors, seed, dispatch]);

  const handleRegionChange = (event) => {
    dispatch(setRegion(event.target.value));
  };

  const handleErrorsChange = (event, value) => {
    dispatch(setErrors(value));
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
    }
  };
  const handleSeedChange = (event) => {
    dispatch(setSeed(event.target.value));
  };

  const handleLoadMore = () => {
    hasMore && dispatch(nextPage());

    dispatch(generateRecords());
  };
  console.log(records);
  return (
    <div>
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
      <InfiniteScroll
        dataLength={records.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularProgress />
          </Box>
        }>
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
            {records.map((record, index) => (
              <RecordRow
                key={record.identifier}
                record={record}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
};

export default App;
