import React from 'react';
import { Route } from 'react-router-dom';

// import PostList from '../post-list/PostList';
// import PostField from '../post/Post';
import AddUser from '../addUser/AddUser';
import './Form.css';

const FormContainer = () => {
    return (
        <div className="FormStyles">
                {/* <Route path="/" exact component={PostList} />
                <Route path="/:id" exact component={PostField} /> */}
                <Route path="/users/addUser" exact component={AddUser} />

        </div>
    );
}

export default FormContainer;