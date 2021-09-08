import React, { Fragment, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import users from "../../Sampledata";
import './EditUser.css';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import CONSTANTS from '../../Services/constants';

const UserEdit = (props) => {
    let id = props.match.params.id;

    const [state, setstate] = useState({
        id: null,
        name: null,
        dob: null,
        newdob: null,
        gender: null,
        age: null,
        telno: null,
        address: null,
        image: null,
        imagefile: null,
        create_date: null,
        update_date: null
    });

    const [startDate, setStartDate] = useState(new Date());
    let now = new Date();

    const handleName = (event) => {
        setstate({
            ...state,
            name: event.target.value
        });
    }

    const onChangeImage = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        setstate({
            ...state,
            imagefile: file,
            image: URL.createObjectURL(e.target.files[0])
        });

    }

    const setDOB = (date) => {
        setStartDate(date);
        setstate({
            ...state,
            dob:null,
            newdob:JSON.stringify(date)
        });
    }

    const onValueChange = (e) => {
        setstate({
            ...state,
            gender: e.target.value
        });
        console.log(state.gender);
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

    useEffect(() => {
        axios.get(CONSTANTS.HOSTNAME + `/api/users/user/${id}`)
            .then(response => {
                const user = response.data.data;
                console.log(user)
                setstate(prevState => ({
                    ...prevState,
                    id: user.id,
                    name: user.name,
                    dob: user.d_o_b,
                    gender: user.gender,
                    telno: user.tp_no,
                    address: user.address,
                    image: user.image,
                    create_date: user.add_date,
                    update_date: user.update_date
                }));
            }).catch(err => console.log(err));
    }, [props.match.params.id]);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const updateuser=()=>{
        const userdetails = {
            id:state.id,
            name: state.name,
            d_o_b: (state.dob!==null?state.dob:startDate),
            gender: state.gender,
            tp_no: state.telno,
            address: state.address,
            image: "",
            imagePreviewUrl:state.image,
            update_date: now
        }
        axios.put(CONSTANTS.HOSTNAME + `/api/users/user/${state.id}`, userdetails)
          .then(resp => {
            console.log(resp);
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title:'Your changes has been saved',
                text: resp.data.msg,
                showConfirmButton: false,
                timer: 2000
              });
            if (state.imagefile!==null) {
                console.log("avatar image SAVING")
              const formData = new FormData();
              formData.append("image", state.imagefile);
    
              // ---------- avatar image updating --------------
              axios
                .post(CONSTANTS.HOSTNAME + `/api/users/user/avatar/${state.id}`, formData, {})
                .then((res) => {
    
                  console.log(res);
                })
                // ---------- avatar image updating END--------------
    
                .catch(err => {
                  Swal.fire({
                    position: 'middle',
                    icon: 'error',
                    title: "Error when updating avatar image",
                    text: err,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  console.log(err)
                })
                console.log("cover image SAVING end")
            }
          })
          .catch(err => {
            Swal.fire({
              position: 'middle',
              icon: 'error',
              title: "Error when updating the user",
              text: err,
              showConfirmButton: false,
              timer: 1500
            });
          })
        console.log(userdetails)
        
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
        } else if (state.dob === "") {
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
                        updateuser();
                    }
                })
            } else
            updateuser();
        }
    }

    return (
        <Fragment>
            <div className="ContainerPost">
                <h2>{state.name}</h2>
                <Form.Control type="text" defaultValue={state.name} onChange={handleName} />
                <hr /><br />
                {state.image !== '' ?
                    <img className="cvrimgview" src={state.image} alt="thumb" width="20%" height="auto" />
                    : <img className="cvrimgview" src={'http://localhost:5000/images/dummy.jpg'} alt="thumb" width="100%" height="auto" />}
                <br /><br />
                <input
                    type="file"
                    onChange={(event) => onChangeImage(event)}
                /><br /><br />

                <h3>Date of birth: {state.dob!==null?state.dob.substring(0,10):(state.newdob!==null?state.newdob.substring(1,11):"")}</h3>
                <DatePicker selected={startDate} onChange={(date) => setDOB(date)} /><br /><br />

                <h3>Gender : {state.gender}</h3>

                <div className="radio">
                    <label>
                        <input type="radio" value="Male" name="gender" checked={state.gender === "Male"} onChange={onValueChange} /> Male
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="Female" name="gender" checked={state.gender === "Female"} onChange={onValueChange} /> Female
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio" value="Other" name="gender" checked={state.gender === "Other"} onChange={onValueChange} /> Other
                    </label>
                </div>



                <h3>Age : {getAge(state.dob)}</h3><br />

                <h3>Mobile no: {state.telno}</h3>
                <Form.Control type="text" defaultValue={state.telno} onChange={handleTpno} /><br />

                <h3>Address : {state.address}</h3>
                <Form.Control type="text" defaultValue={state.address} onChange={handleAddress} /><br />

            </div>

            <hr />
            <Button
                variant="secondary" onClick={handleSubmit} >Save</Button>
        </Fragment>

    );
}

export default UserEdit;