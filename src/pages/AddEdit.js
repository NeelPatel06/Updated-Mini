import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './AddEdit.css'
import fireDb from "../firebase";
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    subject: "",
    question: "",
    answer: ""
}

const AddEdit = () =>  {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, subject, question, answer } = state;


  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
        if(snapshot.val() != null){
            setData({ ...snapshot.val() });
        }
        else{
            setData({});
        }
    });

    return () => {
        setData({});
    };
  }, [id]);

  useEffect(() => {
    if(id){
      setState({...data[id]});
    }
    else{
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    }
  }, [id, data]);
  // Implementing handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !subject || !question || !answer ){
        toast.error("Please provide value in each input field");
    }
    else{
        if(!id){
          fireDb.child("contacts").push(state, (err) => {
              if(err){
                  toast.error(err);
              }
              else{
                  toast.success("Card Added Successfully");
              }
          });
        }
        else{
          fireDb.child(`contacts/${id}`).set(state, (err) => {
              if(err){
                  toast.error(err);
              }
              else{
                  toast.success("Card Updated successfully");
              }
          });
        }
        setTimeout(() => navigate("/"), 500); // waiting for 0.5 seconds after updating
    }
  }
  // Implementing handleInputChange function
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({ ...state, [name]: value});
  }
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type='text' id="name" name="name" placeholder='Your Name...' value={name || ""} onChange={handleInputChange}/>
            <label htmlFor="subject">Subject</label>
            <input type='text' id="subject" name="subject" placeholder='Your Subject...' value={subject || ""} onChange={handleInputChange}/>
            <label htmlFor="question">Question</label>
            <input type='text' id="question" name="question" placeholder='Your Question...' value={question || ""} onChange={handleInputChange}/>
            <label htmlFor="Answer">Answer</label>
            <input type='text' id="answer" name="answer" placeholder='Your Answer...' value={answer || ""} onChange={handleInputChange}/>
            
            <input type='submit' value={id ? "Update" : "Save"}/>
        </form>
    </div>
  )
}

export default AddEdit