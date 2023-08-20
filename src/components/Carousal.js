import React from 'react'

export default function Carousal() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{"zIndex":"10"}}>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                </form>
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
  )
}