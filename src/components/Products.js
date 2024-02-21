import { useState, useEffect, useReducer } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

export default function Products() {
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((resp) => resp.json())
      .then((data) => setProducts(data));
  }, []);

  const bidder_id = JSON.parse(localStorage.getItem("loggedUser")).user_id;
  console.log(bidder_id);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [inputChange , setinputChange] = useState("");
  const [search_string , setSearchString] = useState("");
function filter(e)
{
  console.log(e.target.value)
  axios.get("http://localhost:8080/products/filter/" + e.target.value  )
  .then((response)=>{
    console.log(response.data)
    setProducts(response.data)

})
  .catch(()=>{console.log("Error")})
}


async function search()
{
  setSearchString(inputChange);
  console.log(search_string);
  try{


  
 let response =  await axios.get("http://localhost:8080/products/search/" + search_string)
  
    console.log(response.data)
    setProducts(response.data)

  }
  catch(error)
  {
      console.log("error")
  }


}

async function input(event)
{
 await  setinputChange(event.target.value)
  console.log(inputChange);
  
}


  return (
    <div>


<div class="container">
  <div class="row  mt-3" >
    <div class="col-sm">

  <select name="category_id"  className="form-select" aria-label="Default select example" onChange={(e)=>filter(e)}>
  <option value="0">All</option>      
  <option value="1">antique</option>
  <option value="2">painting</option>
  <option value="3">artefact</option>
  <option value="4">furniture</option>
  <option value="5">comics or cards limited edition</option>
  <option value="6">sports memorabilia</option>
  <option value="7">Signed Memorabilia</option>
  <option value="8">other</option>

</select>
    </div>



    <div class="col-sm ">
    <h2 className="text-center" style={{ backgroundColor: "white" }}>
        Products
      </h2>
    </div>


    <div class="col-sm ms-3">
    <div className="input-group"  >
  <div className="form-outline" data-mdb-input-init style={{ backgroundColor: "white" }}>
    <input id="search-input search" type="search"  className="form-control" onChange={(event)=>{input(event)}}/>
    <label className="form-label" for="form1">Search</label>
  </div>
  <button id="search-button" type="button" className="btn btn-primary" onClick={search}>
    <i className="fas fa-search"> Search</i>
  </button>
</div>
    </div>

    
  </div>
</div>
 
     















      {/* <h2 className="text-center" style={{ backgroundColor: "white" }}>
        Products
      </h2> */}

{/* 
      <select name="category_id"  onChange={(e)=>filter(e)}>
  <option value="0">All</option>      
  <option value="1">antique</option>
  <option value="2">painting</option>
  <option value="3">artefact</option>
  <option value="4">furniture</option>
  <option value="5">comics or cards limited edition</option>
  <option value="6">sports memorabilia</option>
  <option value="7">Signed Memorabilia</option>
  <option value="8">other</option>

</select> */}
{/* <div>
<input id="search" type="text" onChange={(event)=>{input(event)}}/>
<button  onClick={search}>Search</button>
// </div> */}

{/* // <div className="input-group"  >
//   <div className="form-outline" data-mdb-input-init>
//     <input id="search-input search" type="search"  className="form-control" onChange={(event)=>{input(event)}}/>
//     <label className="form-label" for="form1">Search</label>
//   </div>
//   <button id="search-button" type="button" className="btn btn-primary" onClick={search}>
//     <i className="fas fa-search"></i>
//   </button>
// </div> */}




      <table className="table table-bordered">
        {products.map((v) => {
          // else
          if (v.bidding_transaction_id == null)
            return (
              <tr>
                {/* {console.log(v.p_Id.p_Id)}
              {console.log(
                bidder_id + "==" + v.bidding_transaction_id.bidder_id.user_id
              )} */}
                <td>
                  {/* <h3>Product Name : {v.p_Id.product_name}</h3>
                  <h4>Product Category : {v.p_Id.category_id.category_name}</h4>
                  <p>Description: {v.p_Id.description}</p>

 */}

                  <div className="card shadow-sm p-3 mb-5 bg-white rounded ms-5"  width="50rem"  height="270" >
  <div className="card-body">
    <h4 className="card-title">{v.p_Id.product_name}</h4>
    <h5 className="card-title">Category :{ v.p_Id.category_id.category_name}</h5>
    <h5 className="card-title"> Description: {v.p_Id.description}</h5>


  </div>
</div>

                </td>
                <td width={400} height={350}>
                  {/* <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        // class="d-block w-100"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_1
                        }`}
                        alt="First slide"
                        width="400"
                        height="325"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        // class="d-block w-100"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_2
                        }`}
                        width="400"
                        height="325"
                        alt="Second slide"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        // class="d-block w-100"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_3
                        }`}
                        width="400"
                        height="325"
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    class="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a
                    class="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div> */}
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_1
                        }`}
                        width="400"
                        height="300"
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_2
                        }`}
                        width="400"
                        height="300"
                        alt="Second slide"
                      />
                      {/* 
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_3
                        }`}
                        width="400"
                        height="300"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </td >
                <td>
                   <div className="card shadow p-3 mb-5 bg-white rounded me-5"  width="18rem"  height="300">
                  <h6 className="card-title">Base Price: Rs. {v.p_Id.base_price}</h6>
                  <h6 className="card-title">
                    Current Highest Bid:{" "}
                    {v.bidding_transaction_id == null ? (
                      "No Bids Placed Yet.Make the first Bid "
                    ) : (
                      <>
                        <h6 className="card-title">{v.bidding_transaction_id.bid_price}</h6>
                        <h6 className="card-title">
                          Highest Bidder Name:{" "}
                          {v.bidding_transaction_id.bidder_id.fname +
                            " " +
                            v.bidding_transaction_id.bidder_id.lname}
                        </h6>
                        <p>Rs {v.bidding_transaction_id.bid_price}</p>
                      </>
                    )}
                  </h6>
                  <h4  className="card-title">
                    Next Bid Ammount(Rs.) :{" "}
                    {v.bidding_transaction_id == null
                      ? v.p_Id.base_price
                      : Math.round(1.02 * v.bidding_transaction_id.bid_price)}
                  </h4>
                  {/* <p>{bidder_id}</p> */}
                  <br></br>
                  <button 
                    type="button" 
                    // style={(bidder_id==v.bidding_transaction_id.bidder_id)?{{ backgroundColor: "green" }}:{{ backgroundColor: "green" }}}
                    style={{
                      // disabled:
                      //   v.bidding_transaction_id != null
                      //     ? bidder_id === v.bidding_transaction_id.bidder_id
                      //       ? true
                      //       : false
                      //     : false,
                      backgroundColor: "green",
                      marginLeft:"100px"
                      
                    }}
                    // onClick={(e) => {
                    //   // const reqOptions = {
                    //   //   method: "POST",
                    //   // };

                    //   console.log(v.p_Id.p_Id);
                    //   console.log(bidder_id);
                    //   console.log(
                    //     v.bidding_transaction_id == null
                    //       ? v.p_Id.base_price
                    //       : Math.round(1.02 * v.bidding_transaction_id.bid_price)
                    //   );
                    //   fetch(
                    //     "http://localhost:8080/bid?p_id=${v.p_Id.p_Id}&b_id=${bidder_id}&b_price=${(v.bidding_transaction_id == null? v.p_Id.base_price: Math.round(1.02 * v.bidding_transaction_id.bid_price)}"
                    //   )
                    //     .then((resp) => {
                    //       if (resp.ok) return resp.json();
                    //       else throw new Error("Server Error");
                    //     })
                    //     .then((obj) => {
                    //       fetch("http://localhost:8080/products")
                    //         .then((resp) => resp.json())
                    //         .then((data) => setProducts(data));
                    //     })
                    //     .catch((error) => alert("server error"));

                    // fetch(
                    //   "http://localhost:8080/bid/" +
                    //     v.p_Id.p_Id +
                    //     "/" +
                    //     { bidder_id } +
                    //     "/" +
                    //     (v.bidding_transaction_id == null)
                    //     ? v.p_Id.base_price
                    //     : Math.round(1.02 * v.bidding_transaction_id.bid_price),
                    //   reqOptions
                    // )
                    //   .then((resp) => {
                    //     if (resp.ok) return resp.json();
                    //     // else throw new Error("Server Error");
                    //   })
                    //   .then((obj) => {
                    //     fetch("http://localhost:8080/products")
                    //       .then((resp) => resp.json())
                    //       .then((data) => setProducts(data));
                    //   });
                    //}}
                    onClick={(e) => {
                      // const info = {
                      //   status: "approved",
                      // };

                      const info = {
                        p_Id: v.p_Id.p_Id + "",
                        bidder_id: bidder_id,
                        bid_price:
                          v.bidding_transaction_id == null
                            ? v.p_Id.base_price
                            : Math.round(
                                1.02 * v.bidding_transaction_id.bid_price
                              ),
                      };

                      const reqOptions = {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(info),
                      };

                      console.log(v.p_Id.p_Id);
                      console.log(bidder_id);
                      console.log(
                        v.bidding_transaction_id == null
                          ? v.p_Id.base_price
                          : Math.round(
                              1.02 * v.bidding_transaction_id.bid_price
                            )
                      );

                      fetch(
                        "http://localhost:8080/bid/" + v.p_Id.p_Id,
                        // v.p_Id.p_Id +
                        // "/" +
                        // bidder_id +
                        // "/" +
                        // (v.bidding_transaction_id == null)
                        // ? v.p_Id.base_price
                        // : Math.round(1.02 * v.bidding_transaction_id.bid_price),
                        reqOptions
                      )
                        .then((resp) => {
                          if (resp.ok) return resp.json();
                          else throw new Error("Server Error");
                        })
                        .then((obj) => {
                          fetch("http://localhost:8080/products")
                            .then((resp) => resp.json())
                            .then((data) => setProducts(data));
                        })
                        .catch((error) => alert("server error"));
                    }}
                    className="btn btn-success"
                  >
                    Bid
                  </button>
                 </div> 
                </td>
              </tr>
            );
          else if (
            v.bidding_transaction_id != null &&
            bidder_id === v.bidding_transaction_id.bidder_id.user_id
          )
            return (
              <tr>
                {console.log(v.p_Id.p_Id)}
                {console.log(
                  bidder_id + "==" + v.bidding_transaction_id.bidder_id
                )}
                <td>
                <div className="card shadow-sm p-3 mb-5 bg-white rounded ms-5"  width="50rem"  height="270" >
  <div className="card-body">
    <h4 className="card-title">{v.p_Id.product_name}</h4>
    <h5 className="card-title">Category :{ v.p_Id.category_id.category_name}</h5>
    <h5 className="card-title"> Description: {v.p_Id.description}</h5>


  </div>
</div>
                  
                </td>
                <td width={400} height={350}>
                  {/* <div
                    id="carouselExampleControls"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          // class="d-block w-100"
                          src={`data:image/png;base64,${
                            v && v.p_Id.product_image_1
                          }`}
                          alt="First slide"
                          width="400"
                          height="325"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          // class="d-block w-100"
                          src={`data:image/png;base64,${
                            v && v.p_Id.product_image_2
                          }`}
                          width="400"
                          height="325"
                          alt="Second slide"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          // class="d-block w-100"
                          src={`data:image/png;base64,${
                            v && v.p_Id.product_image_3
                          }`}
                          width="400"
                          height="325"
                          alt="Third slide"
                        />
                      </div>
                    </div>
                    <a
                      class="carousel-control-prev"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="carousel-control-next"
                      href="#carouselExampleControls"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div> */}
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_1
                        }`}
                        width="400"
                        height="300"
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_2
                        }`}
                        width="400"
                        height="300"
                        alt="Second slide"
                      />
                      {/*
                      <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                      </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_3
                        }`}
                        width="400"
                        height="300"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </td>
                <td>
                  <div className="card shadow p-3 mb-5 bg-white rounded ms-3 me-4"  width="50rem"  height="270">
                  <h6 className="card-title">Base Price: Rs. {v.p_Id.base_price}</h6>
                  <h6 className="card-title">
                    Current Highest Bid:{" "}
                    {v.bidding_transaction_id == null ? (
                      "No Bids Placed Yet.Make the first Bid "
                    ) : (
                      <>
                        <h6 className="card-title">{v.bidding_transaction_id.bid_price}</h6>
                        <h6  className="card-title">
                          Highest Bidder Name:{" "}
                          {v.bidding_transaction_id.bidder_id.fname +
                            " " +
                            v.bidding_transaction_id.bidder_id.lname}
                        </h6>
                        <p className="card-title">Rs {v.bidding_transaction_id.bid_price}</p>
                      </>
                    )}
                  </h6>
                  <h4 className="card-title">
                    Next Bid Ammount(Rs.) :{" "}
                    {v.bidding_transaction_id == null
                      ? v.p_Id.base_price
                      : Math.round(1.02 * v.bidding_transaction_id.bid_price)}
                  </h4>
                  </div>



                </td>
              </tr>
            );
          else
            return (
              <tr>
                {/* {console.log(v.p_Id.p_Id)}
              {console.log(
                bidder_id + "==" + v.bidding_transaction_id.bidder_id.user_id
              )} */}
                <td>
                  <h3>Product Name : {v.p_Id.product_name}</h3>
                  <h4>Product Category : {v.p_Id.category_id.category_name}</h4>
                  <p>Description: {v.p_Id.description}</p>
                </td>
                <td width={400} height={350}>
                  {/* <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        // class="d-block w-100"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_1
                        }`}
                        alt="First slide"
                        width="400"
                        height="325"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        // class="d-block w-100"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_2
                        }`}
                        width="400"
                        height="325"
                        alt="Second slide"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        // class="d-block w-100"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_3
                        }`}
                        width="400"
                        height="325"
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    class="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a
                    class="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div> */}
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_1
                        }`}
                        width="400"
                        height="300"
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_2
                        }`}
                        width="400"
                        height="300"
                        alt="Second slide"
                      />
                      {/* 
                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        src={`data:image/png;base64,${
                          v && v.p_Id.product_image_3
                        }`}
                        width="400"
                        height="300"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </td>
                <td>
                <div className="card shadow p-3 mb-5 bg-white rounded me-5"  width="18rem"  height="300">
                  <h6 className="card-title">Base Price: Rs. {v.p_Id.base_price}</h6>
                  <h6 className="card-title">
                    Current Highest Bid:{" "}
                    {v.bidding_transaction_id == null ? (
                      "No Bids Placed Yet.Make the first Bid "
                    ) : (
                      <>
                        <h6 className="card-title">{v.bidding_transaction_id.bid_price}</h6>
                        <h6 className="card-title">
                          Highest Bidder Name:{" "}
                          {v.bidding_transaction_id.bidder_id.fname +
                            " " +
                            v.bidding_transaction_id.bidder_id.lname}
                        </h6>
                        <p>Rs. {v.bidding_transaction_id.bid_price}</p>
                      </>
                    )}
                  </h6>
                  <h4>
                    Next Bid Ammount(Rs.) :{" "}
                    {v.bidding_transaction_id == null
                      ? v.p_Id.base_price
                      : Math.round(1.02 * v.bidding_transaction_id.bid_price)}
                  </h4>
                  <br></br>
                  {/* <p>{bidder_id}</p> */}
                  <button
                    type="button"
                    // style={(bidder_id==v.bidding_transaction_id.bidder_id)?{{ backgroundColor: "green" }}:{{ backgroundColor: "green" }}}
                    style={{
                      // disabled:
                      //   v.bidding_transaction_id != null
                      //     ? bidder_id === v.bidding_transaction_id.bidder_id
                      //       ? true
                      //       : false
                      //     : false,
                      backgroundColor: "green",
                    }}
                    // onClick={(e) => {
                    //   // const reqOptions = {
                    //   //   method: "POST",
                    //   // };

                    //   console.log(v.p_Id.p_Id);
                    //   console.log(bidder_id);
                    //   console.log(
                    //     v.bidding_transaction_id == null
                    //       ? v.p_Id.base_price
                    //       : Math.round(1.02 * v.bidding_transaction_id.bid_price)
                    //   );
                    //   fetch(
                    //     "http://localhost:8080/bid?p_id=${v.p_Id.p_Id}&b_id=${bidder_id}&b_price=${(v.bidding_transaction_id == null? v.p_Id.base_price: Math.round(1.02 * v.bidding_transaction_id.bid_price)}"
                    //   )
                    //     .then((resp) => {
                    //       if (resp.ok) return resp.json();
                    //       else throw new Error("Server Error");
                    //     })
                    //     .then((obj) => {
                    //       fetch("http://localhost:8080/products")
                    //         .then((resp) => resp.json())
                    //         .then((data) => setProducts(data));
                    //     })
                    //     .catch((error) => alert("server error"));

                    // fetch(
                    //   "http://localhost:8080/bid/" +
                    //     v.p_Id.p_Id +
                    //     "/" +
                    //     { bidder_id } +
                    //     "/" +
                    //     (v.bidding_transaction_id == null)
                    //     ? v.p_Id.base_price
                    //     : Math.round(1.02 * v.bidding_transaction_id.bid_price),
                    //   reqOptions
                    // )
                    //   .then((resp) => {
                    //     if (resp.ok) return resp.json();
                    //     // else throw new Error("Server Error");
                    //   })
                    //   .then((obj) => {
                    //     fetch("http://localhost:8080/products")
                    //       .then((resp) => resp.json())
                    //       .then((data) => setProducts(data));
                    //   });
                    //}}
                    onClick={(e) => {
                      // const info = {
                      //   status: "approved",
                      // };

                      const info = {
                        p_Id: v.p_Id.p_Id + "",
                        bidder_id: bidder_id,
                        bid_price:
                          v.bidding_transaction_id == null
                            ? v.p_Id.base_price
                            : Math.round(
                                1.02 * v.bidding_transaction_id.bid_price
                              ),
                      };

                      const reqOptions = {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(info),
                      };

                      console.log(v.p_Id.p_Id);
                      console.log(bidder_id);
                      console.log(
                        v.bidding_transaction_id == null
                          ? v.p_Id.base_price
                          : Math.round(
                              1.02 * v.bidding_transaction_id.bid_price
                            )
                      );

                      fetch(
                        "http://localhost:8080/bid/" + v.p_Id.p_Id,
                        // v.p_Id.p_Id +
                        // "/" +
                        // bidder_id +
                        // "/" +
                        // (v.bidding_transaction_id == null)
                        // ? v.p_Id.base_price
                        // : Math.round(1.02 * v.bidding_transaction_id.bid_price),
                        reqOptions
                      )
                        .then((resp) => {
                          if (resp.ok) return resp.json();
                          else throw new Error("Server Error");
                        })
                        .then((obj) => {
                          fetch("http://localhost:8080/products")
                            .then((resp) => resp.json())
                            .then((data) => setProducts(data));
                        })
                        .catch((error) => alert("server error"));
                    }}
                    className="btn btn-success"
                  >
                    Bid
                  </button>
                  </div>
                </td>
              </tr>
            );
        })}
      </table>
    </div>
  );
}
