import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import './style.css';

const CssTextField = styled(TextField)({
  backgroundColor: 'white',
});

const App = () => {
  const [date, setdate] = useState();
  const [time, settime] = useState('');
  const [notes, setnotes] = useState('');
  const [num, setNum] = useState(0);
  let happyemoji = 'https://img.icons8.com/emoji/2x/smiling-face-with-halo.png';
  let sademoji = 'https://img.icons8.com/emoji/2x/downcast-face-with-sweat.png';
  let lovelyemoji =
    'https://img.icons8.com/emoji/2x/smiling-face-with-heart-eyes.png';
  const [emoji, setemoji] = useState('');
  console.log(emoji);

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
              emoji: map.emoji,
            })
          : {
              id: map.id,
              notes: map.notes,
              date: map.date,
              time: map.time,
              num: map.num,
              emoji: map.emoji,
            }
      );
      setarray(updatedarray);
      setEditid(0);
      setnotes('');
      return;
    }

    if (notes !== '') {
      setNum(num + 1);
      addTask(notes, date, time, num, emoji);
      setnotes('');
      setdate('');
      settime('');
      setemoji('');
    }
  };

  const addTask = (notes, date, time, num, emoji) => {
    let d = date;
    let t = time;
    let a = num + 1;
    let e = emoji;
    const newTasks = [
      {
        id: `${notes}-${Date.now()}`,
        notes,
        date: d,
        time: t,
        num: a,
        emoji: e,
      },
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
        <fieldset className="input">
          <legend>
            <h1>Diary Application</h1>
          </legend>

          <div className="text">
            <form>
              <label>Date : </label>
              <input
                type="date"
                value={date}
                // required
                onChange={(e) => setdate(e.target.value)}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  value={date}
                  onChange={(e) => {
                    setdate(e);
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <input ref={inputRef} {...inputProps} />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </LocalizationProvider> */}
              <br />
              <br />
              <label>Time : </label>
              <input
                type="time"
                value={time}
                // required
                onChange={(e) => settime(e.target.value)}
              />
              <br />
              <br />
              <CssTextField
                label="Notes"
                placeholder="Add a new task"
                multiline
                rows={5}
                value={notes}
                className="textarea"
                onChange={(e) => setnotes(e.target.value)}
              />
              <br />
              <br />
              <label>How Are You Feeeling ?</label>
              <br />
              <br />
              <div className="emoji">
                <input
                  type="image"
                  src={happyemoji}
                  width="35px"
                  value="happy"
                  onClick={(e) => {
                    e.preventDefault();
                    setemoji('😇');
                  }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="image"
                  src={sademoji}
                  width="35px"
                  value="sad"
                  onClick={(e) => {
                    e.preventDefault();
                    setemoji('😓');
                  }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="image"
                  src={lovelyemoji}
                  width="35px"
                  value="lovely"
                  onClick={(e) => {
                    e.preventDefault();
                    setemoji('😍');
                  }}
                />
                <br />
              </div>
              <br /> <br />
              <LoadingButton
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                {editid ? 'Update' : 'Add'}
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
          {array.length
            ? array.map((map, index) => (
                <>
                  <span key={index}>
                    <div style={{ fontSize: 35 }}>
                      {map.emoji}&nbsp;&nbsp; {map.notes}
                      &nbsp;&nbsp;
                      <EditSharpIcon onClick={() => handleEdit(map.id)} />
                      &nbsp;&nbsp;
                      <DeleteForeverIcon onClick={() => handleDelete(map.id)} />
                      <br />
                    </div>
                    &nbsp;&nbsp; {map.date} - {map.time}
                  </span>
                  <br />
                </>
              ))
            : 'Add Notes to show ...'}
        </fieldset>
      </div>
    </div>
  );
};
export default App;
