import { useEffect, useReducer} from "react";
import { useState } from "react";
import { Link, json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { login } from "./slice";



const init1 = {
  user_type_id: 2,
  
  account_status: "pending",

};


const test = {
  user_type_id: 2,

  fname: "",
  lname: "",
  email: "",
  mobile: "",
  state: "",
  city: "",
  pincode: "",
  address: "",
  gender: "",
  pan_card_number: "",
  account_status: "pending",
  q_id: "",
  answer: "",
  username: "",
  password: "",

};



export default function SellerRegistration() {

  let [errors, setErrors] = useState({});
  let [isFormValid, setIsFormValid] = useState(false);

  let [file, setFile] = useState();
  let navigate = useNavigate();
 let [formData, setFormData]  = useState(test) 












 
  
 
  const validateForm = () => {
    let newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }


    let regex2 = /^[A-Za-z0-9!@#$%^&*]{2,16}$/;
    if(!regex2.test(formData.fname))
    {
      newErrors.fname = "Fname should contain atleast 2 character";
    }


    let regex3 = /^[A-Za-z0-9!@#$%^&*]{2,16}$/;
    if(!regex3.test(formData.lname))
    {
      newErrors.lname = "lname should contain atleast 2 character";
    }



    // Validate email
    
    let regex4 = /.+\@.+\..+/;

    if (!regex4.test(formData.email.trim()) ) {
      newErrors.email = "email should contain @ and . symbol";
    }
    
    let regex8 = /^[A-Za-z0-9!@#$%^&*]{4,16}$/;
    if(!regex8.test(formData.username.trim()))
    {
      newErrors.username = "username should be 4-15 characters long";
    }




    // Validate password
    let regex9 =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!regex9.test(formData.password.trim())) {
      newErrors.password =  "Minimum eight characters, at least one letter, one number and one special character";

    }

    if(!formData.answer.trim())
    {
      newErrors.answer = "answer is required" ;
    }

    if(formData.city.trim().length < 3)
    {
      newErrors.city = "city is required";
    }

    
    let regex5 = /^[0-9]{10}$/;

    if( !regex5.test(formData.mobile.trim()))
    {
      newErrors.mobile = "10 digit no required"
    }
 
    var regex7 = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if(!regex7.test(formData.pan_card_number.trim()))
    {
      newErrors.pan_card_number = "Enter valid pan no"
    }



    let regex6 = /^[0-9]{6}$/;

    if(!regex6.test(formData.pincode.trim()))
    {
      newErrors.pincode = " 6 digit pincode  reuired"
    }
     
  if(formData.q_id == "Select")
  {
    newErrors.q_id = "select question"
  }
 
  if(formData.state == "Select")
  {
    newErrors.state = "select state"
  }
  if(formData.gender == "Select")
  {
    newErrors.gender = "select gender"
  }

    

    // Validate password match
   

    // Check if there are no errors
    setIsFormValid(Object.keys(newErrors).length === 0);

    setErrors(newErrors);
    console.log("newErrors")
    console.log(newErrors);
    console.log("Errors");
    console.log(errors)
  };






  
const handleChange = (e) =>{

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}






const handleSubmit = (event) => {
  event.preventDefault();
  console.log("isform")
  console.log(isFormValid);
  console.log("Errors");
  console.log(errors)
 validateForm();
 console.log(formData)
  if(isFormValid)
  {
  
      
      const reqOptions = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      };
  
      fetch("http://localhost:8080/regseller", reqOptions)
        .then((resp) => {
         
          if (resp.ok)
          
           return resp.json();
          else throw new Error("Something Wrong Fill Form Again ");
        })
        .then((obj) => {
          const fd = new FormData();
          fd.append("file", file);
          const reqOptions1 = {
            method: "POST",
            //headers: { "content-type": "multipart/form-data" },
            body: fd,
          };
          fetch(
            "http://localhost:8080/uploadpancardimage/" + obj.user_id,
            reqOptions1
          )
            .then((resp) => resp.json())
            .then((obj) => {
              if (obj) {
                alert("Registration succesful.Try Login.");
                navigate("/");
              } else {
                alert(
                  "Registration succesful.Pan card image submission failed.Try Login"
                );
                navigate("/");
              }
            });
          // alert("Registration succesful.Try Login.");
          // navigate("/");
        })
        .catch((error) => alert("Something Wrong Fill Form Again"));
  
      
    



  }

  else
  { 
   
    alert("fill all fields")
   
  }
 
}





  return (
    <div className="Auth-form-container App1">
      <form className="Auth-form "  onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title text-center">Sign Up</h3>
          <div className="text-center">
            Already registered?
            <Link to="/login">Sign In</Link>
          </div>
          <h3 className=" text-center">You are Registering as Seller</h3>
          <table>
            <tr>
              <td>
              

                <div className="form-group mt-3">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                 
                  
                   
                  
                    className="form-control mt-1"
                    placeholder="Enter Fname"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                 {errors.fname && <p>{errors.fname}</p>}
                </div>

                <div className="form-group mt-3">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    value={formData.lname}
                    onChange={handleChange}
             
                    className="form-control mt-1"
                    placeholder="Enter Last Name"
                    required
                  />
                  {errors.lname && <p>{errors.lname}</p>}
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    id="email"
                   name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Email Address"
                    required
                  />
                  {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-group mt-3">
                  <label>Mobile </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter Mobile Number"
                    required
                  />
                {errors.mobile && <p>{errors.mobile}</p>}
                </div>

                <div className="form-group mt-3">
                  <label>State</label>
                  <select
                    name="state"
                    id="State"
                    //value={inputFields.state}
                    onChange={handleChange}
                    className="form-control mt-1"
                    value={formData.state}
                    required
                   
                  >
                  <option>Select</option>

                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  {errors.state && <p>{errors.state}</p>}

                </div>

                <div className="form-group mt-3">
                  <label>City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter city Name"
                    value={formData.city}
                    required
                  />
                 {errors.city && <p>{errors.city}</p>}
                </div>

                <div className="form-group mt-3">
                  <label>pincode</label>
                  <input
                    type="text"
                    name="pincode"
                   value={formData.pincode}

                    id="pincode"
                    //value={info.pincode.value}
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter pincode"
                    required
                  />
                {errors.pincode && <p>{errors.pincode}</p>}
                </div>

                <div className="form-group mt-3">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
          onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter Address"
                    required
                  />
               {errors.address && <p>{errors.address}</p>}
                </div>
              </td>

              <td className="signup-td">
                <div className="form-group mt-3 ">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    id="gender"

                    value={formData.gender}
                 //   value={inputFields.gender}

                 onChange={handleChange}
                   
                    className="form-control mt-1"
                    placeholder="Enter First Name"
                    required
                  >
                   <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="not Prefer to say">
                      not preffered to say
                    </option>
                  </select>
                  {errors.gender && <p>{errors.gender}</p>}

                </div>

                <div className="form-group mt-3">
                  <label>Pan Card No</label>
                  <input
                    type="text"
                    name="pan_card_number"
                    id="pan_card_number"
                    value={formData.pan_card_number}
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter Pan card no"
                    required
                  />
               {errors.pan_card_number && <p>{errors.pan_card_number}</p>}
                </div>
                <div className="form-group mt-3">
                  <label>Pan card Images</label>
                  <input
                    type="file"
                    className="form-control mt-1"
                    
                    placeholder=""
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Security Question</label>
                  <select
                    name="q_id"
                    id="q_id"
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter First Name"
                    value={formData.q_id}
                    required
                  >
                    <option>Select</option>
                    <option value="1">
                      What is the name of your first pet?
                    </option>
                    <option value="2">What is your favourite color?</option>
                    <option value="3">
                      What is the name of your favourite movie?
                    </option>
                    <option value="4"> What was your first car?</option>
                    <option value="5">
                      What elementary school did you attend?
                    </option>
                    <option value="6">
                      In which year you completed your graduation?
                    </option>
                    <option value="7">
                      What is your mother's maiden name?
                    </option>
                    <option value="8">
                      Which is your favourite vacation spot?
                    </option>
                  </select>
                  {errors.q_id && <p>{errors.q_id}</p>}
                </div>
                <div className="form-group mt-3">
                  <label>Answer</label>
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Enter Answer"
                    required
                  />

                    {errors.answer && <p>{errors.answer}</p>}
                </div>

                <div className="form-group mt-3">
                  <label>UserName</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    id="username"
                    value={formData.username}
                    className="form-control mt-1"
                    placeholder="Enter UserName"
                    required
                    
                  />
                {errors.username && <p>{errors.username}</p>}
                </div>

                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control mt-1"
                    placeholder="Password"
                    value={formData.password}
                    required
                  />
                 {errors.password && <p>{errors.password}</p>}
                </div>
              </td>
            </tr>
          </table>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
          
            >
              Submit
            </button>
            <br />
            <button
              type="reset"
              className="btn btn-primary"
           
            >
              Clear
            </button>
          </div>
        </div>
        </form>
    </div>
  );
}
