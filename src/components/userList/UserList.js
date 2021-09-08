import React, { useEffect, useState } from 'react';
import {Container} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Button, ButtonGroup} from 'react-bootstrap';
import "./UserList.css"
import {UserService} from '../../Services/user.service';
import axios from 'axios';
import Swal from 'sweetalert2';
import CONSTANTS from '../../Services/constants';

const UserList = () => {
    
    const [UserListstate, setUserListState] = useState();

    
    useEffect(() => {
    UserService.getAllUsers();
    UserService
        .getUserList()
        .subscribe(users => {
          console.log(users);
          setUserListState(users);
        });
    },[])
    
        // console.log("Users====================>");
        // console.log(UserListstate);
        const deleteUser = (user) => {
            let data = UserListstate.filter(i => i.id !== user.id)
            setUserListState(data)
            if (user.id !== null) {
              Swal.fire({
                title:'Do you want to remove this user permanently?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, remove permenently!',
                cancelButtonText: 'No,Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
              axios
                .delete(CONSTANTS.HOSTNAME + `/api/users/user/${user.id}`)
                .then((res) => {
                  console.log(res.data);
                })
                .catch(errtag => {
                 Swal.fire({
                   position: 'middle',
                   icon: 'error',
                   title: "Error when removing user",
                   text: errtag,
                   showConfirmButton: false,
                   timer: 1500
                 });
               })
              console.log(user.id)
              console.log(data)
              Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'User remove successfully',
                showConfirmButton: false,
                timer: 1500
              });
            //   window.location.reload();
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                icon: 'success',
                title:'Cancelled',
                html:'You have canceled the deletion.',
                showConfirmButton: false,
                timer: 1500
              })
          }
          })
          }
          };

    let renderingUserList;
    if (UserListstate) {
        renderingUserList = UserListstate.map((user) => {
            return (
                <div className="Container" key={user.id}>
                    <h2>{user.name}</h2><hr /><br />
                    <Link to={`/${user.id}`} className="button">View More</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                variant="secondary" onClick={() => deleteUser(user)}>Delete</Button>
                </div>
            );
        });
    }


    return (
        <Container>
            {renderingUserList}
        </Container>
    );
}

export default UserList;