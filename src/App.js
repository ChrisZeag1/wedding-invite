import './App.scss';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const location = `Iglesia+San+Pablo,+C.+San+Antonio+105,+Las Fuentes,+45070 Zapopan,+Jal.,+Mexico`;
const evenName = `Isis+and+Chris`;
const startDateTime = `20221230T180000`;
const endDateTime = `20221231T023000`;
const ctz = `America/Mexico_City`;
const details = `el evento es en la hacienda <a href="https://www.google.com/maps/place/Hacienda+la+Agavia/@20.6412377,-103.4264548,17z/data=!3m1!4b1!4m5!3m4!1s0x8428ac3e916dd73b:0x8766f0a71985e7c4!8m2!3d20.6412316!4d-103.4242641">la agavia</a>
  a las 8:00pm`;

  const hotels = [
    {
      name: 'Hotel Riu',
      img: './riu.png',
      price: '$$',
      stars: '⭐⭐⭐⭐',
      link: 'https://www.expedia.com/Guadalajara-Hotels-Hotel-Riu-Plaza-Guadalajara.h4297366.Hotel-Information?chkin=2022-12-30&chkout=2023-01-01&x_pwa=1&rfrr=HSR&pwa_ts=1662427641328&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jb20vSG90ZWwtU2VhcmNo&useRewards=false&rm1=a2&regionId=6051264&destination=Guadalajara%2C+Jalisco%2C+Mexico&destType=MARKET&neighborhoodId=6244738&selected=4297366&sort=RECOMMENDED'
    },
    {
      name: 'Hard rock hotel',
      img: './hard-rock.png',
      price: '$$',
      stars: '⭐⭐⭐⭐',
      link: 'https://www.expedia.com/Guadalajara-Hotels-Hard-Rock-Hotel-Guadalajara.h21762162.Hotel-Information?chkin=2022-12-30&chkout=2023-01-01&x_pwa=1&rfrr=HSR&pwa_ts=1662428353834&'
    },
    {
      name: 'Hotel Estancia',
      img: './estancia.png',
      price: '$',
      stars: '⭐⭐⭐⭐',
      link: 'https://expedia.com/Guadalajara-Hotels-Hotel-Estancia.h9066723.Hotel-Information?chkin=2022-12-30&chkout=2023-01-01&x_pwa=1&rfrr=HSR&pwa_ts=1662429283567&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jb20vSG90ZWwtU2VhcmNo&useRewards=false&rm1=a2&regionId=12114&destination=Zapopan%2C+Jalisco%2C+Mexico&destType=MARKET&neighborhoodId=553248635939576046&selected=9066723&sort=RECOMMENDED&top_dp=50'
    },
  ]

function App() {
  return (
    <div className="App">
      {/* <div> 
      <img src="./begining.png" alt="invite" width="400"/>
      </div> */}
      <div className="begining">
        <img id="flowers" src="./flowers-begining.png"></img>
        <h4 id="greeting">Hola Nombre!</h4>
        <h1 className="special"> Isis  <br/>& <br/>Chris</h1>
        <p id="invite">te invitamos a nuestra boda <br/>que se celebrara el</p>
        <img id="us" src="./us-begining.png"></img>
      </div>
      <div className="section">
        <div className="date">
          <a target="_blank" href={`https://calendar.google.com/calendar/r/eventedit?text=${evenName}&ctz=${ctz}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`}>
            <h4>30 de Diciembre <br/> del 2022 </h4>
            <p><CalendarMonthIcon/> Angedar</p>
          </a>
        </div>

        <div className="actions">
          <Button variant="contained" color="primary" size="lg">Assitire</Button>
          <Button variant="outlined" color="primary" size="lg">No assistire</Button>
        </div>

        <h4>Ceremonia Religiosa</h4>
        <a target="_blank" href="https://www.google.com/maps/place/Iglesia+San+Pablo/@20.6238022,-103.4299002,17z/data=!4m12!1m6!3m5!1s0x8428ac5d510cac13:0xf1ea942b511ac58d!2sIglesia+San+Pablo!8m2!3d20.6238144!4d-103.4276744!3m4!1s0x8428ac5d510cac13:0xf1ea942b511ac58d!8m2!3d20.6238144!4d-103.4276744">
          <Card>
            <CardHeader 
              subheader="6:00pm a 7:00pm"
            ></CardHeader>
            <CardMedia component="img"
              height="194"
              image="./las-fuentes-church.jpeg"
              alt="parroquia las fuentes">
            </CardMedia>
            <CardContent>
              Parroquia, San Pablo, Las Fuentes.
            </CardContent>
            <CardActions>
              <Button>Navegar</Button>
            </CardActions>
          </Card>
        </a>

        <h4>Evento</h4>
        <a target="_blank" href="https://www.google.com/maps/place/Hacienda+la+Agavia/@20.6412327,-103.4264548,17z/data=!3m1!4b1!4m12!1m6!3m5!1s0x8428ac3e916dd73b:0x8766f0a71985e7c4!2sHacienda+la+Agavia!8m2!3d20.6412316!4d-103.4242641!3m4!1s0x8428ac3e916dd73b:0x8766f0a71985e7c4!8m2!3d20.6412316!4d-103.4242641">
          <Card>
            <CardHeader
              subheader="8:00pm a 3:00am"
            ></CardHeader>
            <CardMedia component="img"
              height="194"
              image="./hacienda-agavia.jpeg"
              alt="Hacienda las agavaia">
            </CardMedia>
            <CardContent>
              Hacienda la Agavia.
            </CardContent>
            <CardActions>
              <Button>Navegar</Button>
            </CardActions>
          </Card>
        </a>
        
      </div>
      <div className="section">
        <h3> Alojamiento </h3>
        <div className="carousel-custom">
        {hotels.map(h => (<a href={h.link}>
          <Card variant="outlined">
            <CardContent>
              <div className="image-container">
                <img src={h.img} alt={h.name} width="150" height="150"></img>
              </div>
              <div className="description">
                <h5>{h.name}</h5>
              <p className="green-money">{h.price}</p>
              <p>{h.stars}</p>
              </div>
            </CardContent>
            <CardActions>
              <Button>Reservar</Button>
            </CardActions>
          </Card>
        </a>))}
        </div>
      </div>
      <div className="section">
        <h4>Mesa de regalos</h4>
        <ul>
          <li> <Button variant="outlined">Amazon</Button></li>
          <li> <Button variant="outlined">Bed bath & beyond</Button></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
