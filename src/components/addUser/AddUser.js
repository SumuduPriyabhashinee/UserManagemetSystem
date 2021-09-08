import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import Swal from 'sweetalert2';
import './AddUser.css';
import CONSTANTS from '../../Services/constants';

const AddUser = () => {

    const [state, setstate] = useState({
        name: "",
        gender: "",
        telno: "",
        address: "",
        image: "",
        imagePreviewUrl: "",
        userDetails: [],
    });

    const [startDate, setStartDate] = useState(new Date());
    let now = startDate;

    const handleName = (event) => {
        setstate({
            ...state,
            name: event.target.value
        });
    }

    const setDOB = (date) => {
        setStartDate(date);
    }

    const handleTpno = (event) => {
        setstate({
            ...state,
            telno: event.target.value
        });
    }

    const handleAddress = (event) => {
        setstate({
            ...state,
            address: event.target.value
        });
    }

    const onValueChange=(e)=>{
        setstate({
            ...state,
        gender:e.target.value});
        console.log(state.gender);
      }

    const onChangeImage = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        setstate({
            ...state,
            image: file,
            imagePreviewUrl: URL.createObjectURL(e.target.files[0])
        });

    }

    const adduser = () => {

        const userdetails = {
            name: state.name,
            d_o_b: startDate,
            gender: state.gender,
            tp_no: state.telno,
            address: state.address,
            image: "",
            imagePreviewUrl:state.imagePreviewUrl,
            add_date: now,
            update_date: now
        }

        // ---------- UESER main detail saving saving --------------
        axios.post(CONSTANTS.HOSTNAME + '/api/users/', userdetails)
            .then(res => {

                  if(state.imagePreviewUrl !== null){
                    const formData = new FormData();
                    formData.append("image", state.image);

                    // ---------- avatar image saving --------------

                      axios.post(CONSTANTS.HOSTNAME + `/api/users/user/avatar/${res.data.data.addedId}`, formData, {})
                      .then((res) => {
                        console.log(res);
                      })

                    // ---------- avatar image saving END--------------

                      .catch(err=>{
                        console.log(err)
                      })
                  } 

                console.log(res);
                console.log(userdetails);
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: 'User details has been saved',
                    text: res.data.msg,
                    showConfirmButton: false,
                    timer: 2000
                });

                window.location.href = `/${res.data.data.addedId}`;
            })
            .catch(err => {
                Swal.fire({
                    position: 'middle',
                    icon: 'error',
                    title: "Error when saving the user details",
                    text: err,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }
    const handleSubmit = () => {
        if (state.name === "") {
            setstate({
                ...state,
                error: Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: 'You need to add your name',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        } else if (startDate === "") {
            setstate({
                ...state,
                error: Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: 'You need to add your birthday',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        } else if (state.address === "") {
            setstate({
                ...state,
                error: Swal.fire({
                    position: 'middle',
                    icon: 'warning',
                    title: 'You need to add your address',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        } else {

            if (state.image === null) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Are you sure you don't want to add your photo?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No,I want to add it.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        adduser();
                    }
                })
            } else
                adduser();
        }
    }


    return (
        <Form className="ContainerAddUser">
            <h2>Add a User</h2><hr />
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label><h4>Name : </h4></Form.Label>
                <Form.Control type="text" onChange={handleName} />
            </Form.Group><br />
            <Form.Group>
                <Form.Label><h4>Your photo : </h4></Form.Label><br />
                <img className="imgview"
                    src={state.imagePreviewUrl} alt="" /><br /><br />
                <input
                    type="file"
                    onChange={(event) => onChangeImage(event)}
                />
            </Form.Group><br />
            {/* <Form.Group controlId="exampleForm.ControlSelect1"> */}
            <Form.Label><h4>Date of Birth : </h4></Form.Label>
            <DatePicker selected={startDate} onChange={(date) => setDOB(date)} />
            {/* </Form.Group>*/}<br />
            <Form.Label><h4>Gender : </h4></Form.Label>
            <div className="radio">
          <label>
            <input type="radio" value="Male" name="gender" checked={state.gender === "Male"} onChange={onValueChange}/> Male
          </label>
        </div>
        <div className="radio">
          <label>
          <input type="radio" value="Female" name="gender" checked={state.gender === "Female"} onChange={onValueChange}/> Female
          </label>
        </div>
        <div className="radio">
          <label>
          <input type="radio" value="Other" name="gender" checked={state.gender === "Other"} onChange={onValueChange}/> Other
          </label>
        </div><br/>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label><h4>Mobile No : </h4></Form.Label>
                <Form.Control type="text" onChange={handleTpno} />
            </Form.Group><br />
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label><h4>Address : </h4></Form.Label>
                <Form.Control type="text" onChange={handleAddress} />
            </Form.Group><br /><br />
            
            <Button
                variant="secondary" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}

export default AddUser;
