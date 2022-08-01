import '../App.css'
function UsersList({ userlist, Edit, Delete }) {

    return (
        <div>
            <h2 className='text-center mt-4'>Users List</h2>
            <hr />
            {userlist.length === 0 ? <h3 className='text-center text-danger'>No Users Registered</h3> :
                <table className='table table-hovered m-auto'>
                    <tbody className='text-center'>
                        <tr>
                            <th>Registration No.</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>Percentage</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {
                            userlist.map((Obj) => <tr key={Obj._id}>
                                <td>{Obj.RegistrationNo}</td>
                                <td>{Obj.Name}</td>
                                <td>{Obj.College}</td>
                                <td>{Obj.Percentage}%</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => Edit(Obj)}>Edit</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => Delete(Obj.RegistrationNo)}>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default UsersList