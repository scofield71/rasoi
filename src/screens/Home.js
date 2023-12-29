import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  const [search,setSearch] = useState("")
  const getData = async () => {
    let response = await fetch("https://scofield-rasoi-api.onrender.com/api/foodData",{
      method:"GET"
    })
    response = await response.json()
    console.log(response[0],response[1])
    setFoodItem(response[0])
    setFoodCat(response[1])
  }


  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
        <div> <Navbar/> </div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{"zIndex":"10"}}>
                <div className="d-flex justify-content-center">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>
            </div>
            <div className="carousel-item active">
                <img className="d-block w-100" src="https://source.unsplash.com/random/900×700/?burger" alt="First slide"/>
            </div>
            <div className="carousel-item ">
                <img className="d-block w-100" src="https://source.unsplash.com/random/900×700/?pizza" alt="Second slide"/>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="https://source.unsplash.com/random/900×700/?pastry" alt="Third slide"/>
            </div>
        </div>
        <button className="carousel-control-prev" data-bs-target="#carouselExampleFade" type="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </button>
        <button className="carousel-control-next" data-bs-target="#carouselExampleFade" type="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </button>
    </div>
        <div className='container'> 
        {
          foodCat !== null ? 
          foodCat.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                { foodItem.length !== 0 ? foodItem.filter((item) => item.CategoryName===data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())))
                .map(filterItem => {
                  return(
                  <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                    <Card name={filterItem} options={filterItem.options[0]}/> 
                  </div>)
                }) : <div>No Such Data Found</div>}
              </div>
            )
          }):
          <div>Empty food Item</div>
        }
        </div>
        <div> <Footer/> </div>
    </div>
  )
}
