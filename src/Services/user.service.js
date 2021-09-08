import axios from 'axios';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'
import CONSTANTS from './constants';

const gettingUsers = new Subject();
const currentUser = new Subject();

export const UserService = {

    getAllUsers : () => {
        axios.get(CONSTANTS.HOSTNAME + '/api/users')
            .then(response => {
                //console.log(response.data);
                gettingUsers.next(response.data.data)
                //users.push(response.data.data);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err,
                    text: 'Something went wrong!',
                })
            });

    },

    addUser :(user) => {
        //console.log(User);
        axios.post(CONSTANTS.HOSTNAME + '/api/users', user)
            .then(response => {
                //console.log(response.data);
                //gettingUsers.next(response.data)
                //users.push(response.data.data);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err,
                    text: 'Something went wrong!',
                })
            });

    },

    getUserById : (id) => {
        axios.get(CONSTANTS.HOSTNAME + '/api/users/user/'+id)
            .then(response => {
                console.log(response.data.data);
                currentUser.next(response.data.data)
                //users.push(response.data.data);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err,
                    text: 'Something went wrong!',
                })
            });

    },

    // getUsersByUserId : (id) => {
    //     axios.get(CONSTANTS.HOSTNAME + '/api/users/user/'+id)
    //         .then(response => {
    //             console.log(response.data.data);
    //             gettingUsers.next(response.data.data)
    //             //users.push(response.data.data);
    //         })
    //         .catch(err => {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: err,
    //                 text: 'Something went wrong!',
    //             })
    //         });

    // },

    getUserList: () => gettingUsers.asObservable(),

    getCurrentUser: () => currentUser.asObservable()

}
