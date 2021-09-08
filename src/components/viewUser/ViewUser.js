import React, {Fragment,useEffect, useState } from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import axios from "axios";
import users from "../../Sampledata";
import './ViewUser.css';
import CONSTANTS from '../../Services/constants';
import Swal from 'sweetalert2'

const UserInfo = (props) => {
    let id =props.match.params.id;

    const [state, setstate] = useState({
        id:null,
        name:null,
        dob: null,
        gender: null,
        age:null,
        telno:null,
        address:null,
        image:null,
        create_date:null,
        update_date:null
    });

    const openEditUser = () => {
        window.location.href = `/users/editUser/${state.id}`;
    }

    useEffect(()=>{
        axios.get(CONSTANTS.HOSTNAME + `/api/users/user/${id}`)
        .then(response => {
            const user = response.data.data;
            console.log(user)
            setstate(prevState => ({
                ...prevState,
                id:user.id,
                name:user.name,
                dob: user.d_o_b,
                gender: user.gender,
                telno:user.tp_no,
                address:user.address,
                image:user.image,
                create_date:user.add_date,
                update_date:user.update_date
            }));
        }).catch(err => console.log(err));
    },[props.match.params.id]);

    function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}


    


        
        return (
            <Fragment>
                <div className="ContainerPost">
                    <h2>{state.name}</h2><hr /><br />
                    {state.image !== '' ?
                                <img className="cvrimgview" src={state.image} alt="thumb" width="20%" height="auto"/>
                                : <img className="cvrimgview" src={'http://localhost:5000/images/dummy.jpg'} alt="thumb" width="100%" height="auto"/>}
                    <h3>Date of birth: {state.dob!==null?state.dob.substring(0,10):""}</h3><br />
                    <h3>Gender : {state.gender}</h3><br />
                    <h3>Age : {getAge(state.dob)}</h3><br />
                    <h3>Mobile no: {state.telno}</h3><br />
                    <h3>Address : {state.address}</h3><br />
                    
                </div>

<hr/>
<Button
                variant="secondary" onClick={openEditUser}>Edit</Button>
                
            </Fragment>

        );
}

export default UserInfo;