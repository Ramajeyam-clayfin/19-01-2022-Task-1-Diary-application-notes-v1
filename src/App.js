import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import './style.css';

const App = () => {
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [notes, setnotes] = useState('');
  const [num, setNum] = useState(1);

  const [array, setarray] = useState([]);
  const [editid, setEditid] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editid) {
      const editnotes = array.find((i) => i.id === editid);
      const updatedarray = array.map((map) =>
        map.id === editnotes.id
          ? (map = {
              id: map.id,
              notes,
              date: map.date,
              time: map.time,
              num: map.num,
            })
          : {
              id: map.id,
              notes: map.notes,
              date: map.date,
              time: map.time,
              num: map.num,
            }
      );
      setarray(updatedarray);
      setEditid(0);
      setnotes('');
      return;
    }

    if (notes !== '') {
      setNum(num + 1);
      addTask(notes, date, time, num);
      setnotes('');
      setdate('');
      settime('');
    }
  };

  const addTask = (notes, date, time, num) => {
    let d = date;
    let t = time;
    let a = num;
    const newTasks = [
      { id: `${notes}-${Date.now()}`, notes, date: d, time: t, num: a },
      ...array,
    ];
    setarray(newTasks);
  };

  const handleDelete = (id) => {
    const delnotes = array.filter((to) => to.id !== id);
    setarray([...delnotes]);
  };
  const handleEdit = (id) => {
    const editnotes = array.find((i) => i.id === id);
    setnotes(editnotes.notes);
    setEditid(id);
  };

  return (
    <div>
      <div>
        <fieldset>
          <legend>
            {' '}
            <h1>Diary Application</h1>
          </legend>
          <div className="text">
            <form onSubmit={handleSubmit}>
              <label>Date : </label>
              {/* <input
              type="text"
              value={date}
              required={true}
              // onChange={(e) => setdate(e.target.value)}
            /> */}
              <input
                type="date"
                value={date}
                required
                onChange={(e) => setdate([e.target.value])}
              />
              <br />
              <br />
              <label>Time : </label>
              <input
                type="time"
                value={time}
                required
                onChange={(e) => settime(e.target.value)}
              />
              <br />
              <br />
              <TextField
                label="Notes"
                placeholder="Add a new task"
                multiline
                rows={5}
                value={notes}
                style={{ width: 260, backgroundColor: 'white' }}
                onChange={(e) => setnotes(e.target.value)}
              />
              <br /> <br />
              <LoadingButton
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                {editid ? 'Edit' : 'Save'}
              </LoadingButton>
              <br />
              <br />
            </form>
          </div>
        </fieldset>

        <fieldset className="notes">
          <legend>
            <h3>Notes:</h3>
          </legend>
          {array.map((map) => (
            <>
              <span key={map.id}>
                <div style={{ fontSize: 35 }}>
                  {map.num}.{'  '} {map.notes}
                  {'  '}
                  <EditSharpIcon onClick={() => handleEdit(map.id)} />{' '}
                  <DeleteForeverIcon onClick={() => handleDelete(map.id)} />
                  <br />
                </div>
                {'  '} {map.date} - {map.time}
              </span>
              <br />
            </>
          ))}
        </fieldset>
      </div>
    </div>
  );
};
export default App;
