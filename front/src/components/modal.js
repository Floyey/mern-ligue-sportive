import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

export default function Modal({
  title,
  content,
  staticModal,
  toggleShow,
  setStaticModal,
}) {
  return (
    <>
      <MDBBtn onClick={toggleShow}>Launch static backdrop modal</MDBBtn>

      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={staticModal}
        setShow={setStaticModal}
      >
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{content}</MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
