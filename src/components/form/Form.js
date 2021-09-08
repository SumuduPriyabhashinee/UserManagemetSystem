import React from 'react';
import { Route } from 'react-router-dom';

import UserList from '../userList/UserList';
import UserInfo from '../viewUser/ViewUser';
import UserEdit from '../editUser/EditUser';
import AddUser from '../addUser/AddUser';
import './Form.css';

const FormContainer = () => {
    return (
        <div className="FormStyles">
                <Route path="/" exact component={UserList} />
                <Route path="/:id" exact component={UserInfo} />
                <Route path="/users/addUser" exact component={AddUser} />
                <Route path="/users/editUser/:id" exact component={UserEdit} />

        </div>
    );
}

export default FormContainer;