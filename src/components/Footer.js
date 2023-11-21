import React from 'react'
import './footer.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import logo from '../imgs/LOGO_COMPARA_CORSI_BIANCO-1536x217.webp';

const Footer = () => {

  return (
    <div className='footer'>
        <div>
            <div className='foot-left'>
                <img alt='logo' src={logo} />
                <p>Trova il <b>corso <font color='#FF692D'>online</font></b> su misura per te</p>
                <div>
                    <a href='https://www.instagram.com/Comparacorsi/'><FaInstagram /></a>
                    <a href='https://www.facebook.com/profile.php?id=61551087324401'><FaFacebook /></a>
                </div>
            </div>
            <div className='contattaci'>
                <p>Contattaci</p>
                <a href='mailto:info@comparacorsi.it'>Email</a>
                <a href='https://www.comparacorsi.it/#faq'>FAQ</a>
                <a href='https://www.comparacorsi.it/'>Chi siamo</a>
                <a href='https://www.comparacorsi.it/universita-on-line-universita-telematiche-corsi-di-laurea-online/'>Università online</a>
                <a href='https://www.comparacorsi.it/master/'>Master</a>
                <a href='https://www.comparacorsi.it/corsi-digital-tech-online/'>Corsi tech</a>
                <a href='https://www.comparacorsi.it/corsi-di-laurea/'>Corsi di laurea online</a>
            </div>
            <div className='consigli'>
                <p>Ti consigliamo</p>
                <a href='https://www.comparacorsi.it/corsi-di-laurea/laurea-in-scienze-della-formazione/'>Corso di Laurea in Scienze della Formazione</a>
                <a href='https://www.comparacorsi.it/corsi-di-laurea/laurea-in-economia-aziendale-e-management/'>Corso di Laurea in Economia e Management</a>
                <a href='https://www.comparacorsi.it/corsi-di-laurea/laurea-in-ingegneria-gestionale/'>Corso di Laurea in Ingegneria Gestionale</a>
                <a href='https://www.comparacorsi.it/corsi-di-laurea/laurea-in-ingegneria-energetica/'>Corso di Laurea in Ingegneria Energetica</a>
                <a href='https://www.comparacorsi.it/corsi-di-laurea/laurea-in-scienze-motorie/'>Corso di Laurea in Scienze Motorie</a>
            </div>
        </div>
        <div>
            <div className='int'>
                <p>
                    Funnel Consulting s.r.l
                    Partitiva IVA 15214991000
                    Via C. Ferrero di Cambiano 91, 00191
                    Roma
                </p>
            </div>
            <hr />
            <div className='bott'>
                <a href='https://www.iubenda.com/privacy-policy/16806170'>Normativa privacy</a>
                <a href='https://www.iubenda.com/terms-and-conditions/16806170'>Termini e Condizioni</a>
            </div>
        </div>
    </div>
  )
}

export default Footer