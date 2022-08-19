import React, { useEffect, useState } from "react";
import CreateNotesModal from "./CreateNotesModal/CreateNotesModal";
import "./Notes.css";
import * as noteApi from "../../api/note";
import { ToastContainer, toast } from "react-toastify";
import ViewNote from "./ViewNote/ViewNote";
import CreateNote from "../../assets/images/Notes/CreateNote.png";

// import

const Notes = (props) => {
  const [newNotes, setNewNotes] = useState();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Function to get all notes for the team
    const newFunc = async () => {
      try {
        const res = await noteApi.getNotes(props.teamsId);
        setNotes(res.data.data);
      } catch (err) {
        console.log(err);
        toast.error(
          `${
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong."
          }`
        );
      }
    };
    newFunc();
  }, [props.teamsId]);

  useEffect(() => {
    // add new note into the notes array
    if (newNotes) setNotes((notes) => [newNotes, ...notes]);
  }, [newNotes]);

  return (
    <div className="Notes">
      <ToastContainer />
      <CreateNotesModal
        newTeamsHadler={(team) => setNewNotes(team)}
        teamsId={props.teamsId}
      />
      <div className="allNotes">
        {!notes.length == 0 ? (notes.map((note) => (
          <ViewNote note={note} />
        ))
        ) : (
          <div className="createNoteContainer">
            <div className="createNote">
              <img src={CreateNote} className="createNoteImg" />
              <div className="createNoteText">Create a new note</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
