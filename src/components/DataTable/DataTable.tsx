import React, {useState} from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core';
import { CharForm } from '../CharForm/CharForm';
import { renderCellExpand } from "./renderCellExpand";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, },
    { field: 'name', headerName: 'Name', width: 150, editable: true, renderCell: renderCellExpand },
    { field: 'description', headerName: 'Description', width: 800, editable: true, renderCell: renderCellExpand },
    { field: 'comics_appeared_in', headerName: 'Comics Appeared In', width: 110, editable: true, renderCell: renderCellExpand },
    { field: 'super_power', headerName: 'Super Power', width: 500, editable: true, renderCell: renderCellExpand }
];

interface gridData{
  data:{
    id?:string;
  }
}

export const DataTable = () => {
  let { charData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<gridData>({data:{}})

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    server_calls.delete(gridData.data.id!)
    getData()
  }


  return (
      <div style={{ height: 400, width: '100%' }}>
        <h2>Characters In Inventory:</h2>
        <DataGrid rows={charData} columns={columns} pageSize={5} checkboxSelection onRowSelected = { setData } />
        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Character {gridData.data.id!}</DialogTitle>
            <DialogContent>
              <DialogContentText>Update Character</DialogContentText>
                <CharForm id={gridData.data.id!}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
              <Button onClick={handleClose} color = "primary">Done</Button> 
            </DialogActions>
          </Dialog>

      </div>
  );
}