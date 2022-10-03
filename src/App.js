import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import { LoadingIndicator } from './loading-indicator';
import { useTranslation } from "react-i18next";
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const location = `Iglesia+San+Pablo,+C.+San+Antonio+105,+Las Fuentes,+45070 Zapopan,+Jal.,+Mexico`;
const evenName = `Isis+and+Chris`;
const startDateTime = `20221230T180000`;
const endDateTime = `20221231T023000`;
const ctz = `America/Mexico_City`;
const details = `EVENT_IS_IN <a href="https://www.google.com/maps/place/Hacienda+la+Agavia/@20.6412377,-103.4264548,17z/data=!3m1!4b1!4m5!3m4!1s0x8428ac3e916dd73b:0x8766f0a71985e7c4!8m2!3d20.6412316!4d-103.4242641">la agavia</a>
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

  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  

function App() {
  const [guest, setGuest] = useState(null);
  const [error, setError] = useState(false);
  const [isLoadingPost, setisLoadingPost] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenTransferModal, setIsOpenTransferModal] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchGuest();
  }, []);

  function getEventName() {
    return evenName.replace('and', t('AND'));
  }

  function getEventDetals() {
    return details.replace('EVENT_IS_IN', t('EVENT_IS_IN'));
  }

  function changeLang(lang) {
    setGuest({ ...guest, lang });
    i18n.changeLanguage(lang);
  }

  function openModal(isOpen) {
    setIsOpenModal(isOpen);
  }

  function openTransferModal(isOpen) {
    setIsOpenTransferModal(isOpen);
  }
  
  const fetchGuest = async () => {
    const id = window.location.hash.replace('#', '/');
    let result;
    try {
      result = await axios.get('https://3vhfqszb21.execute-api.us-east-1.amazonaws.com/guest' + id);
      result && result.data && setGuest(result.data[0]);
      i18n.changeLanguage(result.data[0].lang);
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

  return !guest ? <LoadingIndicator/> : error ?
    <h4>Hay un error en la pagina.Intenta mas tarde <br/>There is an error in the page, please try again later.</h4> : (
    <div className="App">
      <div className="begining">
        <img id="flowers" src="./flowers-begining.png"></img>
        <h4 id="greeting">{t('GREETINGS')} {guest.name},</h4>
        <h1 className="special"> Isis  <br/>& <br/>Chris</h1>
        <p id="invite">
          {t('INVITE')}<br/>
          <b>{t('INVITE_WITHOUT_YOU')}</b>
        </p>
        <img id="us" src="./us-begining.png"></img>
      </div>
      <div className="section">
        <div className="parents">
          <h6>{t('BLESSING')}</h6>
          <div className="parents-two-cols">
            <div className="parents-chris">
              <p className="special">Margarita Luna <span>+</span></p>
              <p className="special">José Nava</p>
            </div>
            <div className="isis-parents">
              <p className="special">Cristina Aguirre</p>
              <p className="special">Eduardo Zepeda</p>
            </div>
          </div>
          <h6>{t('OUR_DATE')}</h6>
        </div>
        <div className="date">
          <a target="_blank" href={`https://calendar.google.com/calendar/r/eventedit?text=${getEventName()}&ctz=${ctz}&dates=${startDateTime}/${endDateTime}&details=${getEventDetals()}&location=${location}`}>
            <h4>{t('DATE')}</h4>
            <p><CalendarMonthIcon/>{t('SCHEDULE')}</p>
          </a>
        </div>

        <div className="actions">
          <p id="party-number">
            {t('PARTY_NUMBER')}
            <Avatar className="success" sx={{ width: 20, height: 20 }}>{guest.party}</Avatar>
            {guest.party <= 1 ? t('GUEST') : t('GUESTS')}.
          </p>
          <LoadingButton variant="contained"
                  color="primary"
                  size="lg"
                  loading={isLoadingPost}
                  onClick={() => { postAnswer(true); }}
                  disabled={!!guest.isGoing}>
            {t('ATTEND')}
          </LoadingButton>
          <LoadingButton variant="outlined"
                  color="primary"
                  size="lg"
                  loading={isLoadingPost}
                  onClick={() => { postAnswer(false); }}
                  disabled={guest.isGoing === 0}>
            {t('NOT_ATTEND')}
          </LoadingButton>
        </div>

        <div className="actions-response">
        {!!guest.isGoing && <Chip avatar={<Avatar>😊</Avatar>} 
          label={t('HAPPY_TO_SEE')}
          color="success"/>}

        {guest.isGoing === 0 && <Chip avatar={<Avatar>😢</Avatar>} 
          label={t('SAD_NOT_TO_SEE')}/>}
        </div>

        <h4>{t('RELIGIOUS_CEREMONY')}</h4>
        <a target="_blank" href="https://www.google.com/maps/place/Iglesia+San+Pablo/@20.6238022,-103.4299002,17z/data=!4m12!1m6!3m5!1s0x8428ac5d510cac13:0xf1ea942b511ac58d!2sIglesia+San+Pablo!8m2!3d20.6238144!4d-103.4276744!3m4!1s0x8428ac5d510cac13:0xf1ea942b511ac58d!8m2!3d20.6238144!4d-103.4276744">
          <Card>
            <CardHeader 
              subheader="Parroquia San Pablo, Las Fuentes"
            ></CardHeader>
            <CardMedia component="img"
              height="194"
              image="./las-fuentes-church.jpeg"
              alt="parroquia las fuentes">
            </CardMedia>
            <CardContent>
            6:00pm {t('TO')} 7:00pm
            </CardContent>
            <CardActions>
              <Button>{t('NAVIGATE')}</Button>
            </CardActions>
          </Card>
        </a>

        <h4>{t('VENUE')}</h4>
        <a target="_blank" href="https://www.google.com/maps/place/Hacienda+la+Agavia/@20.6412327,-103.4264548,17z/data=!3m1!4b1!4m12!1m6!3m5!1s0x8428ac3e916dd73b:0x8766f0a71985e7c4!2sHacienda+la+Agavia!8m2!3d20.6412316!4d-103.4242641!3m4!1s0x8428ac3e916dd73b:0x8766f0a71985e7c4!8m2!3d20.6412316!4d-103.4242641">
          <Card>
            <CardHeader
              subheader="Hacienda La Agavia"
            ></CardHeader>
            <CardMedia component="img"
              height="194"
              image="./hacienda-agavia.png"
              alt="">
            </CardMedia>
            <CardContent>
            8:00pm {t('TO')} 3:00am
            </CardContent>
            <CardActions>
              <Button>{t('NAVIGATE')}</Button>
            </CardActions>
          </Card>
        </a>
        
      </div>
      <div className="section">
        <h4>{t('LODGING')}</h4>
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
              <Button>{t('BOOK')}</Button>
            </CardActions>
          </Card>
        </a>))}
        </div>
      </div>
      <div className="section">
        <h4>{t('REGISTRY')}</h4>
        <ol id="gifts">
          <li>
            {
              guest.lang === 'ES'? <Button variant="outlined" onClick={(e) => { e.preventDefault(); openModal(true); }}>Amazon</Button> :
                <a target="_blank" href="https://www.amazon.com/wedding/christian-zepeda-aguirre-isis-nava-luna-zapopan-december-2022/registry/342UGUOPVX6JD">
                  <Button variant="outlined">Amazon</Button>
                </a>
              }
          </li>
          <li><Button variant="outlined" onClick={(e) => { e.preventDefault(); openTransferModal(true); }}>{t('BANK_TANSFER')}</Button></li>
        </ol>
      </div>
      <Modal open={isOpenModal} onClose={() => { openModal(false); }}>
      <Box sx={modalStyles}>
      <div id="modal-modal-title">
        <h3>Cambiar codigo postal de MX a U.S.A.</h3>
        <p>para ver todos los articulos como disponibles.</p>
      </div>
      <div id="modal-modal-description">
          <p>la Siguiente guia consta de 5 pasos.</p>
          <ol>
            <li>
              <p>
              Ir a nuestra lista de regalos en 
              <a target="_blank" href="https://www.amazon.com/wedding/christian-zepeda-aguirre-isis-nava-luna-zapopan-december-2022/registry/342UGUOPVX6JD"> Amazon.com </a>
              </p>
            </li>
            <li>
              <p>
              Hacer click en enviar a México.
              <img src="./amazon-1.jpg" width="250"/>
              </p>
            </li>
            <li>
              <p>
              Hacer click en "Introduce un codigo postal de E.E.U.U".
              <img src="./amazon-2.jpg" width="250"/>
              </p>
            </li>
            <li>
              <p>
              Instroduce nuestro codigo postal <b>90012</b>. (Los Angeles, CA)
              <img src="./amazon-3.png" width="250"></img>
              </p>
            </li>
            <li>
              <p> Refresca la pagina (esta operacion puede cambiar dependiendo del navegador).
              </p>
            </li>        
          </ol>
          <div className="actions-modal">
            <a target="_blank" href="https://www.amazon.com/wedding/christian-zepeda-aguirre-isis-nava-luna-zapopan-december-2022/registry/342UGUOPVX6JD">
              <Button variant="outlined">Entendí vamos a Amazon</Button>
            </a>
            <a onClick={(e) => { e.preventDefault(); openModal(false); }}>No entendí, mejor hago transferencia</a>
          </div>
      </div>
      </Box>
      </Modal>
      <Modal open={isOpenTransferModal} onClose={() => { openTransferModal(false); }}>
        <Box sx={modalStyles}>
        <div id="modal-modal-title"> <h3>{t('BANK_TANSFER')}</h3></div>
        <div id="modal-modal-description">
        <ul>
          <li><p>{t('DEPOSIT_CHRIS')} <br/><b>424 353-9927</b></p></li>
          <li><p>{t('DESPOSIT_ISIS')}<br/><b>012 320 01543422704 4</b></p></li>
        </ul>
        <a onClick={(e) => { e.preventDefault(); openTransferModal(false); }}>Cerrar</a>

        </div>
        </Box>
      </Modal>
      <p className="bold">
        <a className={guest.lang === 'EN'? 'selected' : ''} onClick={()=> { changeLang('EN') }}>{t('ENGLISH')}</a> | 
        <a className={guest.lang === 'ES'? 'selected' : ''} onClick={()=> { changeLang('ES') }}> {t('SPANISH')}</a>
      </p>
    </div>
  );
}

export default App;
