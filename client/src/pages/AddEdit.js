import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link,} from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState={
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    //define state
    const [state, setState]= useState(initialState);

    const navigate = useNavigate();

    const {id}= useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=> setState({ ...resp.data[0]}));
    }, [id]);

    const handleSubmit= (e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide values in the input fields");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{
                name,
                email,
                contact,
            }).then(()=>{
                setState({name: "", email: "", contact: ""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Contact Added Successfully!");            
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                name,
                email,
                contact,
            }).then(()=>{
                setState({name: "", email: "", contact: ""});
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Contact Updated Successfully!");            
            }
            setTimeout(()=> navigate("/"),500);
        }
    };

    const handelInputChange= (e)=>{
        const {name, value}=e.target;
        setState({ ...state, [name]: value});
    };
    
    //to avoid using state.name, state.email state.contact
    const {name, email, contact}=state;
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
        <label htmlFor='name'>Name</label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name..."   
        value={name || ""}     
        onChange={handelInputChange}         
        />
        <label htmlFor='email'>Email</label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder="Your Email..."
        value={email || ""}        
        onChange={handelInputChange}         
        />
        <label htmlFor='contact'>Contact</label>
        <input
        type="number"
        id="contact"
        name="contact"
        placeholder="Your Contact..."
        value={contact || ""}        
        onChange={handelInputChange}         
        />
        <input type="submit" value={id ? "Update" : "Save"}/>
        <Link to="/">
            <input type="button" value="Go Back"/>
        </Link>

        </form>
        
    </div>
  )
}

export default AddEdit