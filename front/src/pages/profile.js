import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import Modal from "../components/modal";
import { toast } from "react-toastify";
import axios from "axios";
import { getErrorFromBackend } from "../utils";
import { useNavigate } from "react-router-dom";

export default function Profile({ setTest }) {
  const [staticModal, setStaticModal] = useState(false);
  const toggleShow = () => setStaticModal(!staticModal);
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  // console.log(userInfo.data);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [user]);

  const [formValue, setFormValue] = useState({
    name: user.data.name,
    firstname: user.data.firstname,
    mail: user.data.mail,
    phone_number: user.data.phone_number,
    password: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const update = async (e) => {
    if (formValue.mail === "") {
      toast.error(`email is required`);
    } else {
      const id = user.data._id;
      try {
        const data = await axios.put(
          `http://localhost:5000/api/user/${id}`,
          formValue,
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
            },
          }
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        setTest(localStorage.getItem("userInfo"));
        toggleShow();
        navigate("/");
      } catch (error) {
        toast.error(getErrorFromBackend(error));
      }
    }
  };

  return (
    <>
      <section className="vh-100" /*style={{ backgroundColor: "#f4f5f7" }}*/>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">{user.data.name}</MDBTypography>
                    <MDBTypography tag="h5">
                      {user.data.firstname}
                    </MDBTypography>
                    <MDBIcon
                      far
                      icon="edit mb-5"
                      className="modify"
                      onClick={toggleShow}
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.data.mail}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            {user.data.phone_number}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      {staticModal && (
        <Modal
          title="Edit your profile"
          content={
            <MDBValidation className="row g-3">
              <MDBValidationItem className="col-md-4">
                <MDBInput
                  value={formValue.name}
                  name="name"
                  onChange={onChange}
                  id="validationCustom01"
                  required
                  label="Name"
                />
              </MDBValidationItem>
              <MDBValidationItem className="col-md-4">
                <MDBInput
                  value={formValue.firstname}
                  name="firstname"
                  onChange={onChange}
                  id="validationCustom02"
                  required
                  label="Firstname"
                />
              </MDBValidationItem>
              <MDBValidationItem
                feedback="Please enter your email."
                invalid
                className="col-md-4"
              >
                <MDBInputGroup textBefore="@">
                  <input
                    value={formValue.mail}
                    type="email"
                    className="form-control"
                    id="validationCustomUsername"
                    placeholder="Email"
                    required
                  />
                </MDBInputGroup>
              </MDBValidationItem>

              <MDBValidationItem
                className="col-md-6"
                feedback="Please provide a phone number."
                invalid
              >
                <MDBInput
                  value={formValue.phone_number}
                  name="phone_number"
                  onChange={onChange}
                  id="validationCustom05"
                  required
                  label="Phone number"
                />
              </MDBValidationItem>

              <MDBValidationItem
                className="col-md-6"
                feedback="Please provide your new password."
                invalid
              >
                <MDBInput
                  value={formValue.password}
                  name="password"
                  onChange={onChange}
                  id="validationCustom05"
                  required
                  label="password"
                />
              </MDBValidationItem>

              <div className="col-12">
                <MDBBtn type="submit" onClick={update}>
                  Submit form
                </MDBBtn>
              </div>
            </MDBValidation>
          }
          staticModal={staticModal}
          toggleShow={toggleShow}
          setStaticModal={setStaticModal}
        />
      )}
    </>
  );
}
