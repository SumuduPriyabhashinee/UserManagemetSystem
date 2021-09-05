import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddUser.css';

const AddUser = () => {

    const [state, setstate] = useState({
        name: "",
        dob: "",
        gender: "",
        age:"",
        telno:"",
        address:"",
        userDetails:[],
        msg:""
    });

    const [startDate, setStartDate] = useState(new Date());

    const handleName = (event) => {
        setstate({
            ...state,
            name: event.target.value
        });
    }

    // const setStartDate=(date)=>{
    //     // var today = new Date();
    //     // var birthDate = new Date(date);  // create a date object directly from `dob1` argument
    //     // var age_now = today.getFullYear() - birthDate.getFullYear();
    //     // var m = today.getMonth() - birthDate.getMonth();
    //     // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    //     // {
    //     //     age_now--;
    //     // }
    //     setstate({
    //         ...state,
    //         dob: date,
    //         age:age_now
    //     });
    // }

    // const handleContent = (event) => {
    //     setstate({
    //         ...state,
    //         content: event.target.value
    //     });
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.heading === "") {
            setstate({
                ...state,
                msg: "You need to specify the Post Heading"
            });
        } else if (state.type === "") {
            setstate({
                ...state,
                msg: "You need to specify post Type"
            });
        } else if (state.content === "") {
            setstate({
                ...state,
                msg: "You need to add the content"
            });
        } else {
            // console.log(`Post Heading - ${state.heading} \nPost Type - ${state.type} \nPost Content - ${state.content} `);

            //----- unComment this section update data in the db--------------
                // postService.addPost({heading: state.heading, content: state.content});
            //----------------------------------------------------

            setstate({
                heading: "",
                type: "",
                content: "",
                msg: ""
            });
        }
        
    }

    return (
        <Form className="ContainerAddUser" onSubmit={handleSubmit}>
            <h2>Add a User</h2><hr />
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name : </Form.Label>
                <Form.Control type="text" onChange={handleName} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Date of Birth : </Form.Label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Form.Group>
            {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Post Content</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={handleContent} />
            </Form.Group> */}
            {state.msg !== "" ? <div><span className="errorMSG">{state.msg}</span><hr /></div> : ""}
            <Button
                type="submit"
                variant="secondary">Submit</Button>
        </Form>
    );
}

export default AddUser;
