import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import { LoadingIndicator } from './loading-indicator';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
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
    }
  ];

function App() {
  const [guest, setGuest] = useState(null);
  const [error, setError] = useState(false);
  const [isLoadingPost, setisLoadingPost] = useState(false);

  useEffect(() => {
    fetchGuest();
  }, []);
  
  const fetchGuest = async () => {
    const id = window.location.hash.replace('#', '/');
    let result;
    try {
      result = await axios.get('https://3vhfqszb21.execute-api.us-east-1.amazonaws.com/guest' + id);
      result && result.data && setGuest(result.data[0]);
    } catch (e) {
      console.log('error fetch guest >', e);
      setGuest({});
      setError(true);
    }
  }

  const postAnswer = async (isAttending) => {
    const id = window.location.hash.replace('#', '/');
    setisLoadingPost(true);
    await axios.post(`https://3vhfqszb21.execute-api.us-east-1.amazonaws.com/guest${id}`, { isAttending });
    setisLoadingPost(false);
    setGuest({...guest, isGoing: isAttending ? 1 : 0 });
  }

  return !guest ? <LoadingIndicator/> : error ? <h4>hay un error en la pagina </h4> : (
    <div className="App">
      <div className="begining">
        <img id="flowers" src="./flowers-begining.png"></img>
        <h4 id="greeting">{guest.name},</h4>
        <h1 className="special"> Isis  <br/>& <br/>Chris</h1>
        <p id="invite">
          ¡estamos muy emocionados<br/>
          de invitarte a nuestra boda!<br/>
          ¡Sin ti no será lo mismo!
        </p>
        <img id="us" src="./us-begining.png"></img>
      </div>
      <div className="section">
        <div className="date">
          <a target="_blank" href={`https://calendar.google.com/calendar/r/eventedit?text=${evenName}&ctz=${ctz}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`}>
            <h4>30 de Diciembre <br/> del 2022 </h4>
            <p><CalendarMonthIcon/> Agedar</p>
          </a>
        </div>

        <div className="actions">
          <LoadingButton variant="contained"
                  color="primary"
                  size="lg"
                  loading={isLoadingPost}
                  onClick={() => { postAnswer(true); }}
                  disabled={!!guest.isGoing}>
            Assitire
          </LoadingButton>
          <LoadingButton variant="outlined"
                  color="primary"
                  size="lg"
                  loading={isLoadingPost}
                  onClick={() => { postAnswer(false); }}
                  disabled={guest.isGoing === 0}>
            No assistire
          </LoadingButton>
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
        <h4> Alojamiento </h4>
        <div className="carousel-custom">
        {hotels.map(h => (<a key={h.name} href={h.link} target="_blank">
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
        <ul id="gifts">
          <li> <Button variant="outlined">Amazon</Button></li>
          <li> <Button variant="outlined">Bed bath & beyond</Button></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
