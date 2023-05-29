import React from 'react';
import { TableRow, TableCell } from '@mui/material';

const RecordRow = ({ record, index }) => {
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{record.identifier}</TableCell>
      <TableCell>{record.name}</TableCell>
      <TableCell>{record.address}</TableCell>
      <TableCell>{record.phone}</TableCell>
    </TableRow>
  );
};

export default RecordRow;
