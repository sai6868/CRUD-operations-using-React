import './App.css';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterFrom from './components/Register_form';
import UsersList from './components/UsersList';

function App() {

  useEffect(() => {
    getUsers();
  })

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const onSubmit = (data) => {
    axios.post("http://localhost:4000/add", data)
      .then(res => {
        let msg = res.data.msg
        if (msg == "User data inserted successfully")
          notifySuccess(msg)
        else
          notifyError(msg)
      })
      .then(getUsers())
      .catch(err => { console.log(err) })
  }

  const [userlist, setUserList] = useState([])

  const getUsers = () => {
    axios.get('http://localhost:4000/userslist')
      .then(response => setUserList(response.data.userDetails))
      .catch(err => console.log("Error in getUsers", err))
  }

  let [formStatus, setFormStatus] = useState(false)
  const Edit = (Obj) => {
    setValue("RegistrationNo", Obj.RegistrationNo)
    setValue("Name", Obj.Name)
    setValue("College", Obj.College)
    setValue("Percentage", Obj.Percentage)
    setFormStatus(true)
  }

  const onUpdate = (data) => {
    axios.put("http://localhost:4000/update", data)
      .then(setFormStatus(false))
      .then(res => {
        let msg = res.data.msg
        notifySuccess(msg)
      })
      .then(getUsers())
      .catch(err => { console.log(err) })
  }

  const Delete = (RegistrationNo) => {
    axios.delete(`http://localhost:4000/${RegistrationNo}`)
      .then(getUsers())
      .then(res => {
        let msg = res.data.msg
        notifySuccess(msg)
      })
      .catch(err => console.log("error while deleting", err))
  }

  const Cancel = () => {
    setFormStatus(false)
  }

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className='container-fluid'>
      <RegisterFrom register={register} handleSubmit={handleSubmit} errors={errors} formStatus={formStatus} onSubmit={onSubmit} onUpdate={onUpdate} Cancel={Cancel} />
      <UsersList userlist={userlist} Edit={Edit} Delete={Delete} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
}

export default App;
