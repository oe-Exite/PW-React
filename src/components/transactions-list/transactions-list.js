import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'username', numeric: false, disablePadding: true, label: 'Correspondent Name' },
    { id: 'date', numeric: true, label: 'Date/Time of the transaction' },
    { id: 'amount', numeric: true, label: 'Transaction amount' },
    { id: 'balance', numeric: true, label: 'Resulting balance' }
];

function TableHeader(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
            </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

export default function TransactionsTable(props) {

    const { rows, onTransactionSelect } = props;

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [selected, setSelected] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleClick = (event, transaction) => {
        if (!selected || transaction.id !== selected.id) {
            setSelected(transaction);
            onTransactionSelect(transaction);
        } else {
            setSelected(null);
            onTransactionSelect(null);
        }
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected && selected.id === id;

    return (
      <>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}/>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);

              return (
                <TableRow
                  hover
                  selected={isItemSelected}
                  key={row.id}
                  onClick={(event) => handleClick(event, row)}>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.balance}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </>
    );
}