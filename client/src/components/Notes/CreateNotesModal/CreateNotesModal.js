import React, { useContext, useState } from "react";
import "./CreateNotesModal.css";
import * as notesApi from "../../../api/note";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

// Create new notes
const CreateNotesModal = (props) => {
  return (
    <New
      newTeamsHadler={(team) => props.newTeamsHadler(team)}
      teamsId={props.teamsId}
    />
  );
};

//  Modal
const MyVerticallyCenteredModal = (props) => {
  const [heading, setHeading] = useState();
  const [description, setDescription] = useState();

  // Function to create notes
  const createNote = async () => {
    console.log(heading, description);
    if (!heading || !description) {
      console.log("Enter Name");
      toast("Enter all the details");
    }

    try {
      const res = await notesApi.createNotes({
        teamId: props.teamsId,
        heading,
        description,
      });
      props.newTeamsHadler(res.data.data);
      setHeading();
      setDescription();
      props.onHide();
    } catch (err) {
      console.log(err);
      toast(
        `${
          err.response && err.response.data
            ? err.response.data.message
            : "Something went wrong."
        }`
      );
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="modalCreateNotes"
      centered
    >
      <Modal.Body closeButton className="modalCreateNotesBody">
        <div className="modalCreateNotesBodyHeading">Create new note</div>
        <div>
          <div className="inputCreateNoteLabel">Note Heading</div>
          <input
            className="inputCreateNote"
            type="text"
            placeholder="Note Heading"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />
        </div>
        <div>
          <div className="inputCreateNoteLabel">Description</div>
          <textarea
            className="inputCreateNote"
            placeholder="Add some description ...."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="modalCreateNotesBodyBtns">
          <Button
            className="modalCreateNotesBodyCancelBtn"
            onClick={props.onHide}
          >
            Cancel
          </Button>
          <Button
            className="modalCreateNotesBodySubmit"
            disabled={!heading || !description}
            onClick={() => createNote()}
          >
            Create
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// Function to active and close modal
function New(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <ToastContainer />
      <Button
        className="createTeamsNotesBtn "
        onClick={() => setModalShow(true)}
      >
        Create Notes +
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        newTeamsHadler={(team) => props.newTeamsHadler(team)}
        onHide={() => setModalShow(false)}
        teamsId={props.teamsId}
      />
    </>
  );
}

export default CreateNotesModal;
