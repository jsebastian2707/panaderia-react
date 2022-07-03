import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import data from './data.json'
import {Navbar, Nav,Container,Carousel, Card, Button, Row, Col} from "react-bootstrap"

class App extends React.Component  {
  state = {
    page: 3,
    load: false,
    cartarray: []
  };
  numproductos(){
    let contador=0;
    this.state.cartarray.forEach(
      (element)=>(
        contador+=element.cant
      )
    )
    return contador;
  }
  getsubtotal(){
    let contador=0;
    this.state.cartarray.forEach(
      (element)=>(
        contador+=element.cant*data[element.id].price
      )
    )
    return contador;
  }
  cartadd(id){
    let nuevo = true;
    if(this.state.cartarray.length!==0){
      let nuevoarray=this.state.cartarray.map((element,index)=>{
        if(element.id===id){
          nuevo = false;
          return {...element , cant: (++element.cant)}
        }else{
          return element;
        }
      });
      this.setState({cartarray: nuevoarray})
    }
    if(nuevo){
      this.setState({cartarray:[...this.state.cartarray,{id:id, cant: 1}]});
    }
  }
  cartdelete(id){
    let temparray=[];
    this.state.cartarray.forEach((element) => {
      if(id === element.id){
        if(element.cant!==1){
          temparray.push({...element , cant: (--element.cant)})
        }
      }else{
        temparray.push(element);
      }
    })
    this.setState({cartarray:temparray});
  }
  Header(){
    return(
      <header className="App-header">     
        <Navbar bg="white" expand="lg">
          <Container>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Brand className='App-logo me-0' onClick={()=>{this.setState({page:0})}}>
                <img src="/horno.png" width="50" height="50" className="align-top" alt="horno logo"/>
              </Navbar.Brand>
              <Nav.Link onClick={()=>{this.setState({page:0})}}>Horno</Nav.Link>
              <Nav.Link className='ms-auto' onClick={()=>{this.setState({page:1})}}>shop</Nav.Link>
              <Nav.Link onClick={()=>{this.setState({page:2})}}>contacto</Nav.Link>
              <Navbar.Brand className='shop-icon me-0' onClick={()=>{this.setState({page:3})}}>
                <img src="/bag-shopping-solid.svg" width="20" height="20" className="align-baseline" alt="shop"/>
                {this.state.cartarray.length!==0 && <div><p>{this.numproductos()}</p></div>}
                <span className="visually-hidden">shop items</span>
              </Navbar.Brand>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
  Home(){
    return (
      <div>
        <Carousel fade>
          {["/carousel/1.jpg","/carousel/2.jpg","/carousel/3.png","/carousel/4.jpg"].map(
            (item,index)=>(
            <Carousel.Item key={index}>
              <img 
                className="d-block w-100"
                src={item}
                alt={index+" slide"}
              />
              <Carousel.Caption>
                <h3>{["pasteles artesanales","ven y visitanos en nuestras surcursales","prueba nuestro nuevo pastel de mango" ][index]}</h3>
              </Carousel.Caption>
            </Carousel.Item>)
          )}
        </Carousel>
      </div>
    )
  }
  Shop(){
    return (
      //"type":"<img src='data:' alt='Red dot' />"
      <div className='Shop'>
        {data.map((element,index)=>(
          <Card key={index} style={{ width: '18rem',  margin: 'auto'}}>
            <Card.Img variant="top" src={"./pan/"+(index)+".jpg"} alt='product' />
            <Card.Body>
              <Card.Title>{data[index].name}<span>{"$"+data[index].price}</span></Card.Title>
              <Card.Text>{data[index].description}</Card.Text>
              <Button onClick={()=>{this.cartadd(index)}} variant="primary">añadir al carrito</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  }
  Cart(){
    return (
      <Row style={{width: "75%", margin: "auto", minHeight: "70vh"}}>
        <Col sm={8}>
          <h1>Shopping cart</h1>
          <div style={{
            display: "grid",
            borderRadius: "10px",
            borderWidth: "2px",
            borderStyle: "solid",
            justifyContent: "space-between",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "30px",
            alignItems: "center",
            justifyItems: "center",
            backgroundColor:"#73C1EB"
          }}>
            <div style={{width: "100%", gridColumn: "1 / 3", borderRight: "1px solid", textAlign: "center"}}>
              <span>producto</span>
            </div>
            <div style={{width: "100%", borderRight: "1px solid", textAlign: "center" }}>
              <span>cantidad</span>
            </div>
            <div style={{width: "100%", borderRight: "1px solid", textAlign: "center" }}>
              <span>precio</span>
            </div> 
            <span>subtotal</span>
            <div style={{gridColumn: "1 / 6",margin: "0", height: "2px" , backgroundColor: "black",width: "100%"}}></div>
            {this.numproductos()?<div style={{gridColumn: "1 / 6",margin: "0", height: "2px" , backgroundColor: "black",width: "100%"}}></div>:null}
            {this.state.cartarray.map((element,index)=>{
              return (
              <React.Fragment key={index}>
                  <img style={{width: "100%", height: "100px", objectFit: "cover",borderRadius: (((index===(this.state.cartarray.length-1)?"0px 0px 0px 10px":"0")))}} src={"./pan/"+(element.id)+".jpg"} alt='product' />
                  <div style={{fontWeight: "bolder"}}>
                    <span style={{textAlign: "center"}}>{data[element.id].name}</span>
                  </div>
                  <div>
                    <div style={{borderStyle: 'solid',borderWidth: "2px", borderRadius: "10px" ,}} >
                      <button  style={{border: "0", backgroundColor: "rgba(0,0,0,0)"}} onClick={()=>{this.cartadd(element.id)}} variant="primary">+</button>
                      <span >{element.cant}</span>
                      <button style={{border: "0", backgroundColor: "rgba(0,0,0,0)"}} onClick={()=>{this.cartdelete(element.id)}} variant="primary"> - </button>
                    </div>
                  </div>
                  <div>
                    <span>{data[element.id].price}</span>
                  </div>
                  <div style={{marginRight:"9%"}}>
                    <span>{data[element.id].price*element.cant}</span>
                  </div>
                  {(this.state.cartarray.length-1)>index?<div style={{gridColumn: "1 / 6",margin: "0", height: "2px" , backgroundColor: "black",width: "100%"}}></div>:null}
                </React.Fragment>
              )})
            }
          </div>
        </Col>
        <Col sm={4} style={{borderLeftStyle: "solid"}}>
          <div style={{
            display: "grid",
            borderRadius: "10px",
            borderWidth: "2px",
            borderStyle: "solid",
            marginTop: "56px",
            gridTemplateColumns: "1fr 1fr",
            backgroundColor:"#73C1EB"
          }}>
            <div style={{paddingLeft: "5px", borderRight: "1px solid",width: "100%"}}><span>subtotal:</span></div>
            <span style={{paddingLeft: "5px"}}>{this.getsubtotal()}</span>
            <div style={{gridColumn: "1 / 3",margin: "0", height: "2px" , backgroundColor: "black",width: "100%"}}></div>
            <div style={{paddingLeft: "5px",borderRight: "1px solid",width: "100%"}}><span>iva:</span></div>
            <span style={{paddingLeft: "5px"}}>{this.getsubtotal()*0.19}</span>
            <div style={{gridColumn: "1 / 3",margin: "0", height: "2px" , backgroundColor: "black",width: "100%"}}></div>
            <div style={{paddingLeft: "5px",borderRight: "1px solid",width: "100%"}}><span>total:</span></div>
            <span style={{paddingLeft: "5px"}}>{this.getsubtotal()*1.19}</span>
          </div>
          <Button style={{marginTop: "5px"}} variant="primary">pagar</Button>
        </Col>
      </Row>
    )
  }

  Contacto(){
    return (
      <div className='contact'>   
        <div className='contact-content' style={{overflow: "hidden"}} >
          <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"
            style={{fill:"#deb887", width: "113%", height: "57px", transform: "scaleX(-1)"}}>
            <path  d="M60 120L0 0h120L60 120zm120 0L120 0h120l-60 120zm120 0L240 0h120l-60 120zm120 0L360 0h120l-60 120zm120 0L480 0h120l-60 120zm120 0L600 0h120l-60 120zm120 0L720 0h120l-60 120zm120 0L840 0h120l-60 120zm120 0L960 0h120l-60 120zm120 0L1080 0h120l-60 120z"/>
          </svg>
          <p>YUSE</p>
          <div style={{ display: "flex", justifyContent: "space-around", height:"40%"}}>
            <Button variant="primary" href="https://github.com/jsebastian2707" style={{margin: "auto 0"}}>
              <img style={{height: "50px"}} src="/github-brands.svg" alt="github"/>{" "}<span>github</span>
            </Button>
            <Button variant="primary" href="https://api.whatsapp.com/send/?phone=%2B573214428134&text&app_absent=0" style={{margin: "auto 0"}}>
              <img style={{height: "50px"}} src="/whatsapp-brands.svg" alt="whatsapp"/>{"  "}<span className='ms-auto'>whatsapp</span>
            </Button>
            <Button variant="primary" style={{margin: "auto 0"}}>
              <img style={{height: "50px"}} src="/envelope-solid.svg" alt="mail"/><span> juansebherndez@gmail.com</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return (
      <React.Fragment>
        {this.Header()}
        <main className='main'>
          {[
            this.Home(),
            this.Shop(),
            this.Contacto(),
            this.Cart()
          ][this.state.page]}
        </main>
        <footer>
          yuse-2022
        </footer>
      </React.Fragment>
    );
  }
}
//   ▄▀▀▄ ▀▀▄  ▄▀▀▄ ▄▀▀▄  ▄▀▀▀▀▄  ▄▀▀█▄▄▄▄ 
//  █   ▀▄ ▄▀ █   █    █ █ █   ▐ ▐  ▄▀   ▐ 
//  ▐     █   ▐  █    █     ▀▄     █▄▄▄▄▄  
//        █     █    █   ▀▄   █    █    ▌  
//      ▄▀       ▀▄▄▄▄▀   █▀▀▀    ▄▀▄▄▄▄   
//      █                 ▐       █    ▐   
//      ▐                         ▐   

export default App;
