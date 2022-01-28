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
}); //style for textfield

const App = () => {
  const [date, setdate] = useState(getCurrentDate('-')); //for Date
  const [time, settime] = useState(getCurrentTime()); //for Time
  const [notes, setnotes] = useState(''); //For Tasks
  const [num, setNum] = useState(0);
  let happyemoji = 'https://img.icons8.com/emoji/2x/smiling-face-with-halo.png';
  let sademoji = 'https://img.icons8.com/emoji/2x/downcast-face-with-sweat.png';
  let lovelyemoji =
    'https://img.icons8.com/emoji/2x/smiling-face-with-heart-eyes.png';
  const [emoji, setemoji] = useState(''); ///for Emoji
  const [happycount, setHappycount] = useState(0);
  const [sadcount, setSadcount] = useState(0);
  const [lovelycount, setLovelycount] = useState(0);
  const [array, setarray] = useState([]); //Array where we push all data inside
  const [editid, setEditid] = useState(0); //used for editing the tasks

  function getCurrentDate(separator = '') {
    let myCurrentDate = new Date();
    let date = myCurrentDate.getDate();
    let month = myCurrentDate.getMonth() + 1;
    let year = myCurrentDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  } //get the cuurent Date and return in year-month-date format

  function getCurrentTime() {
    let time = new Date();
    let newtime = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    return newtime;
  } // get the cuurent time and return in hour-minute

  // handle the Add/update button
  const handleSubmit = (e) => {
    e.preventDefault(); //to stop the page getting load

    if (editid) {
      //handle edited task to update in array

      const updatedarray = array.map((obj) => {
        if (obj.id === editid) {
          obj = { ...obj, notes };
        }
        return obj;
      });

      setarray(updatedarray);
      setEditid(0);
      setnotes('');
      return;
    }

    if (notes !== '') {
      //when notes is not empty
      setNum(num + 1);
      addTask(notes, date, time, num, emoji); // function call where values are pushed into array
      setnotes(''); //empty the textarea
      setdate(getCurrentDate('-')); //again get the current date
      settime(getCurrentTime()); //get cuurent time
      setemoji('');
      if (emoji == '😇') {
        //where it update the emoji count for each emoji invidually
        return setHappycount(happycount + 1);
      } else if (emoji == '😓') {
        return setSadcount(sadcount + 1);
      } else if (emoji == '😍') {
        return setLovelycount(lovelycount + 1);
      }
    }
  };

  const addTask = (notes, date, time, num, emoji) => {
    //where values are moved to array

    const newTasks = [
      {
        id: `${notes}-${Date.now()}`, //task_value - no. of milliseconds since Jan 1, 1970.
        notes,
        date,
        time,
        num,
        emoji,
      },
      ...array, //other ojects are stored in rest
    ];
    setarray(newTasks); //using usestate inserting this newTasks into array
  };

  const handleDelete = (id) => {
    //handle delete button
    const delnotes = array.filter((to) => to.id !== id); // filtering the ojects using id
    setarray([...delnotes]); //expect the oject that matches the id other ojects are inserted inside array

    array.filter((to) => {
      // used to reduce the count of emoji when delete
      if (to.id === id) {
        if (to.emoji == '😇') {
          return setHappycount(happycount - 1);
        } else if (to.emoji == '😓') {
          return setSadcount(sadcount - 1);
        } else if (to.emoji == '😍') {
          return setLovelycount(lovelycount - 1);
        }
      }
    });
  };

  const handleEdit = (id) => {
    //handles edit
    const editnotes = array.find((i) => i.id === id); //find the object using id
    setnotes(editnotes.notes); //updating the task value so it goes to the textarea again for edit with previous value
    setEditid(id); //passing the id so while submiting it update the array
  };

  return (
    <div className="all">
      <div className="one">
        <fieldset className="input">
          <legend>
            <h1>Diary Application</h1>
          </legend>

          <div className="text">
            <form>
              <label>Date : </label>
              <input
                type="date"
                className="dateinput"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
              <br />
              <br />
              <label>Time : </label>
              <input
                type="time"
                className="timeinput"
                value={time}
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
                <abbr title="Happy">
                  <input
                    type="image"
                    className="emojiinput"
                    src={happyemoji}
                    width="35px"
                    value="happy"
                    onClick={(e) => {
                      e.preventDefault();
                      setemoji('😇');
                    }}
                  />
                </abbr>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <abbr title="Sad">
                  <input
                    type="image"
                    className="emojiinput"
                    src={sademoji}
                    width="35px"
                    value="sad"
                    onClick={(e) => {
                      e.preventDefault();
                      setemoji('😓');
                    }}
                  />
                </abbr>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <abbr title="Lovely">
                  <input
                    type="image"
                    className="emojiinput"
                    src={lovelyemoji}
                    width="35px"
                    value="lovely"
                    onClick={(e) => {
                      e.preventDefault();
                      setemoji('😍');
                    }}
                  />
                </abbr>
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
      </div>

      <div className="two">
        <fieldset className="notes">
          <legend>
            <h3>Notes:</h3>
          </legend>
          <p className="emojicount">
            {'😇'} {happycount}&nbsp;&nbsp;
            {'😓'} {sadcount}&nbsp;&nbsp;
            {'😍'} {lovelycount}&nbsp;&nbsp;
          </p>
          {array.length
            ? array.map((map, index) => (
                <div>
                  <li className="li">
                    <div style={{ fontSize: 25 }}>
                      <div className="task">
                        <div className="emojiclass"> {map.emoji}</div>
                        &nbsp;&nbsp; {map.notes}
                        &nbsp;&nbsp;
                      </div>
                      <EditSharpIcon
                        className="editbtn"
                        onClick={() => handleEdit(map.id)}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <DeleteForeverIcon
                        className="delbtn"
                        onClick={() => handleDelete(map.id)}
                      />
                    </div>
                  </li>
                  <p className="datetime">
                    {map.date} - {map.time}
                  </p>
                </div>
              ))
            : 'Add Notes to show ...'}
        </fieldset>
      </div>
    </div>
  );
};
export default App;
