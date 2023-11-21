import React, {useState, useEffect} from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import comp2 from '../imgs/comp2.png';
import './comparatore.css';
import { useSearch } from '../context/SearchContext';
import dataCorsi from './output.json';
import './risultati.css';
import offerta from '../imgs/Group.png';
import trustpilot from '../imgs/trustpilot.png'
import { atenei } from './atenei';
import unidav from '../imgs/Unidav.png';
import unipegaso from '../imgs/pegaso.png';
import uninettuno from '../imgs/Uninettuno.png';
import unimerc from '../imgs/Mercatorum.png';
import unifotunato from '../imgs/giustino fortunato.png';
import unicusano from '../imgs/cusano.png';
import sapienza from '../imgs/unitelmasapienza.png';
import ecampus from '../imgs/e- campus.png';
import uniMarconi from '../imgs/unimarconi.png';
import sanraffaele from '../imgs/san raffaele.png';
import iul from '../imgs/IUL.png';
import compmob2 from '../imgs/comp-mob2.png';
import bollino from '../imgs/BollinoSconto50.png';
import { FaTimes } from 'react-icons/fa';
import Lottie from 'react-lottie';
import successJson from '../imgs/successJson.json';
import bolMob from '../imgs/sconto-mobile.png';

const Risultati = () => {
  window.scrollTo(0, 0);
  const { degreeType, setDegreeType, desiredDegree, setDesiredDegree, subjectOfInterest, setSubjectOfInterest, 
    budget, setBudget, lastName, setLastName, firstName, setFirstName, email, setEmail, phone, setPhone, enrollmentTime,
    setEnrollmentTime, universityStatus, setUniversityStatus, workStatus, setWorkStatus, studyTime, setStudyTime, categories,
    setCategories, origBudget, setOrigBudget, origDegreeType, setOrigDegreeType, origDesiredDegree, setOrigDesiredDegree, origSubjectOfInterest, setOrigSubjectOfInterest } = useSearch();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successJson,
  };

  const [uniqueArea, setUniqueArea] = useState([]);
  const [uniqueCorso, setUniqueCorso] = useState([]);
  const [uniquePrice, setUniquePrice] = useState([]);

  useEffect(() => {
      const filteredAreaNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType).map(data => data.Area))];
      setUniqueArea(filteredAreaNames)

  }, [degreeType]);

  useEffect(() => {
    
    const filteredCorsoNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data['Corsi di laurea + (non lo so) ']))];
    setUniqueCorso(filteredCorsoNames)

  }, [desiredDegree]);

  useEffect(() => {

    const filteredBudgetNames = [...new Set(dataCorsi.filter(data => data.Tipologia === degreeType && data.Area === desiredDegree).map(data => data['Costo ']))];
    setUniquePrice(filteredBudgetNames);

  }, [desiredDegree, subjectOfInterest]);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [origCorsi, setOrigCorsi] = useState([]);

  useEffect(() => {

    const initialFilteredCourses = dataCorsi.filter((corso) => {
      if (origDegreeType && corso.Tipologia !== origDegreeType) {
        return false;
      }
  
      if (origSubjectOfInterest && corso['Corsi di laurea + (non lo so) '] !== origSubjectOfInterest) {
        return false;
      }
  
      if (origDesiredDegree && corso.Area !== origDesiredDegree) {
        return false;
      }
  
      if (budget && corso['Costo '] !== budget) {
        return false;
      }
  
      return true;
  });

  setFilteredCourses(initialFilteredCourses);
  setOrigCorsi(dataCorsi);

  }, [])

  const modifyFilter = () => {
    const initialFilteredCourses = dataCorsi.filter((corso) => {
      if (degreeType && corso.Tipologia !== degreeType) {
        return false;
      }
  
      if (subjectOfInterest && corso['Corsi di laurea + (non lo so) '] !== subjectOfInterest) {
        return false;
      }
  
      if (desiredDegree && corso.Area !== desiredDegree) {
        return false;
      }
  
      if (budget && corso['Costo '] !== budget) {
        return false;
      }
  
      return true;
  });
  setFilteredCourses(initialFilteredCourses);
  }

  const [openFilter, setOpenFilter] = useState(false);
  const [talkOr, setTalkOr] = useState(false);
  const [ateneo, setAteneo] = useState("");
  const [budgetOk, setBudgetOk] = useState("");
  const [percorsoDiStudi, setPercorsoDiStudi] = useState("");
  const [thanks, setThanks] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLoad(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
}, []);

  const talkOrientatore = (ateneo, percorso, budg) => {
    console.log(ateneo, percorso, budg);
    setAteneo(ateneo);
    setPercorsoDiStudi(percorso);
    setBudgetOk(budg);
    setTalkOr(true);
  }

  const setOpenClose = () => {
    if (openFilter == true) {
      setOpenFilter(false);
    } else {
      setOpenFilter(true);
    }
  };

  const closePopup = () => {
    setTimeout(() => {
      setThanks(false);
      setTalkOr(false);
    }, 2000);
  }

  const handleSendSheet = async () => {
    setThanks(true);
    const urlSheet = 'https://sheet.best/api/sheets/eaef7ae5-c150-4232-acea-ed55599ff0fd';
    const checkUrl = `${urlSheet}?search=email:${email}`; 

    const formData = {
      Data: new Date(),
      Nome: firstName,
      Cognome: lastName,
      Telefono: phone,
      Email: email,
      ["Quale tipologia di corso di laurea ti interessa?"]: degreeType,
      ["Quale corso di laurea sei interessato?"]: desiredDegree,
      ["Cosa ti piacerebbe studiare?"]: percorsoDiStudi,
      ["Quanto sei disposto a spendere?"]: budgetOk,
      ["Quando vorresti iscriverti?"]: enrollmentTime,
      ["Stai già frequentando l'università?"]: universityStatus,
      ["Stai già lavorando?"]: workStatus,
      ["Quanto tempo hai da dedicare alla tua formazione?"]: studyTime,
      ["Fai parte di uno o più categorie?"]: categories,
      Ateneo: ateneo && ateneo,
    };

    const checkResponse = await fetch(checkUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const existingData = await checkResponse.json();
      const matchingData = existingData.filter(item => item.Email === email);

      if (matchingData.length > 0) {
        closePopup();
        console.log('I dati con questa email esistono già. Non è possibile inviare duplicati.', matchingData);
        return; 
      }
  
    fetch(urlSheet, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
  
        if (response.ok) {
          console.log("Dati inviati con successo");
          setBudget("");
          setFilteredCourses(origCorsi);
          closePopup();
        } else {
          console.error("Errore nell'invio dei dati");
        }
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  const handleChangeLaurea = (e) => {
    setFilteredCourses(origCorsi);
    setDegreeType(e.target.value);

    setDesiredDegree("")
    setSubjectOfInterest("")
    setBudget("");
  };

  const handleChangeArea = (e) => {
    setFilteredCourses(origCorsi);
    setDesiredDegree(e.target.value);

    setSubjectOfInterest("");
    setBudget("");

  }

  const handleChangeSub = (e) => {
    setFilteredCourses(origCorsi);
    setSubjectOfInterest(e.target.value);

    setBudget("");
  }

  const ateneiPrioritari = ["Unipegaso", "Mercatorum", "San Raffaele"];

  return (
    <div className='risultati'>
      {load && (
        <div className='loader-container'>
          <div className="loader"></div>
        </div>
      )}
      {talkOr && (
        <div className='popup-shadows'>
          {thanks == true ? (
            <div className='popup-send'>
             <Lottie options={defaultOptions} width={300} height={300} />
           </div>  
          ) : (
            <div className='popup-send'>
              <p onClick={() => setTalkOr(false)}><FaTimes /></p>
              <h2>Parla con un orientatore</h2>
                <div className='domanda domanda-input'>
                  <label>Nome</label>
                  <input
                  disabled
                  className={`${firstName !== "" ? 'filled' : ''}`}
                  type="text"
                  value={firstName}
                  />
              </div>
              <div className='domanda domanda-input'>
                  <label>Cognome</label>
                  <input
                  disabled
                  className={`${lastName !== "" ? 'filled' : ''}`}
                  type="text"
                  value={lastName}
                  />
              </div>
              <div className='domanda domanda-input'>
                  <label>Telefono</label>
                  <input
                  disabled
                  className={`${phone !== "" ? 'filled' : ''}`}
                  type="tel"
                  value={phone}
                  />
              </div>
              <button className='button-orientatore' onClick={handleSendSheet}>Parla con l'orientatore</button>
            </div>          
          )}

        </div>
      )}
        <div className='comparatore-top not-sticky'>
            <div>
                <FaGraduationCap />
                <h2>Compara corsi universitari</h2>
            </div>
            <div>
                <img alt='sequenza comparatore' src={comp2} />
            </div>
        </div>
        <div className='comparatore-top2'>
            <h3>Iscriviti tramite noi al prezzo più basso garantito.</h3>
        </div>
        <img alt='comparatore mobile' src={compmob2} className='compmob' />
        <div className='risultati-container' id='top'>
          <div className='filtri'>
            <button onClick={modifyFilter}>Modifica la tua ricerca</button>
            <div className='comparatore-domande'>
            <div className='domanda'>
                <label>Quale tipologia di corso di laurea ti interessa?</label>
                <select 
                className={`${degreeType !== "" ? 'filled' : ''}`} 
                value={degreeType} 
                onChange={(e) => handleChangeLaurea(e)} required>
                    <option disabled value="">Seleziona</option>
                    <option value="Laurea Triennale">Laurea Triennale</option>
                    <option value="Laurea Magistrale">Laurea Magistrale</option>
                    <option value="Ciclo Unico">Ciclo Unico</option>
                    <option value="Master 1° livello ">Master 1° livello</option>
                    <option value="Master 2° livello ">Master 2° livello</option>
                </select>
            </div>
            <div className='domanda'>
                <label>Quale corso di laurea sei interessato?</label>
                {degreeType !== "" ? (
                <select 
                className={`${desiredDegree !== "" ? 'filled' : ''}`} 
                value={desiredDegree} 
                onChange={(e) => handleChangeArea(e)} required>
                    <option disabled value="">Seleziona un'area</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select> 
                ) : (
                <select 
                disabled
                className={`${desiredDegree !== "" ? 'filled' : ''}`} 
                value={desiredDegree} 
                onChange={(e) => handleChange(e, setDesiredDegree)} required>
                    <option disabled value="">Seleziona un'area</option>
                    {uniqueArea && uniqueArea.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>                    
                )}
            </div>
            <div className='domanda'>
                <label>Cosa ti piacerebbe studiare?</label>
                {desiredDegree !== "" ? (
                <select 
                className={`${subjectOfInterest !== "" ? 'filled' : ''}`} 
                value={subjectOfInterest} 
                onChange={(e) => handleChangeSub(e)} required>
                    <option disabled value="">Seleziona un corso</option>
                    {uniqueCorso && uniqueCorso.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>
                ) : (
                <select 
                disabled
                className={`${subjectOfInterest !== "" ? 'filled' : ''}`} 
                value={subjectOfInterest} 
                onChange={(e) => handleChange(e, setSubjectOfInterest)} required>
                    <option disabled value="">Seleziona un corso</option>
                </select>                    
                )}

            </div>
            <div className='domanda'>
                <label>Quanto sei disposto a spendere?</label>
                {desiredDegree !== "" ? (
                <select 
                className={`${budget !== "" ? 'filled' : ''}`} 
                value={budget} 
                onChange={(e) => handleChange(e, setBudget)} required>
                    <option disabled value="">Seleziona un costo</option>
                    {uniquePrice && uniquePrice.map((data, index) => (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    ))}
                </select>
                ) : (
                <select 
                disabled
                className={`${budget !== "" ? 'filled' : ''}`} 
                value={budget} 
                onChange={(e) => handleChange(e, setBudget)} required>
                    <option disabled value="">Seleziona un costo</option>
                </select>                    
                )}

            </div>
            </div>
          </div>
          <div className={!openFilter ? 'filtri-mobile sticky' : 'filtri-mobile sticky bg'}>
            <button onClick={setOpenClose}>Modifica la tua ricerca</button>
              {openFilter && (
              <div className='comparatore-domande'>
              <div className='domanda'>
                  <label>Quale tipologia di corso di laurea ti interessa?</label>
                  <select 
                  className={`${degreeType !== "" ? 'filled' : ''}`} 
                  value={degreeType} 
                  onChange={(e) => handleChange(e, setDegreeType)} required>
                      <option disabled value="">Seleziona</option>
                      <option value="Laurea Triennale">Laurea Triennale</option>
                      <option value="Laurea Magistrale">Laurea Magistrale</option>
                      <option value="Ciclo Unico">Ciclo Unico</option>
                      <option value="Master 1° livello ">Master 1° livello</option>
                      <option value="Master 2° livello ">Master 2° livello</option>
                  </select>
              </div>
              <div className='domanda'>
                  <label>Quale corso di laurea sei interessato?</label>
                  {degreeType !== "" ? (
                  <select 
                  className={`${desiredDegree !== "" ? 'filled' : ''}`} 
                  value={desiredDegree} 
                  onChange={(e) => handleChange(e, setDesiredDegree)} required>
                      <option disabled value="">Seleziona un'area</option>
                      {uniqueArea && uniqueArea.map((data, index) => (
                          <option key={index} value={data}>
                              {data}
                          </option>
                      ))}
                  </select> 
                  ) : (
                  <select 
                  disabled
                  className={`${desiredDegree !== "" ? 'filled' : ''}`} 
                  value={desiredDegree} 
                  onChange={(e) => handleChange(e, setDesiredDegree)} required>
                      <option disabled value="">Seleziona un'area</option>
                      {uniqueArea && uniqueArea.map((data, index) => (
                          <option key={index} value={data}>
                              {data}
                          </option>
                      ))}
                  </select>                    
                  )}
              </div>
              <div className='domanda'>
                  <label>Cosa ti piacerebbe studiare?</label>
                  {desiredDegree !== "" ? (
                  <select 
                  className={`${subjectOfInterest !== "" ? 'filled' : ''}`} 
                  value={subjectOfInterest} 
                  onChange={(e) => handleChange(e, setSubjectOfInterest)} required>
                      <option disabled value="">Seleziona un corso</option>
                      {uniqueCorso && uniqueCorso.map((data, index) => (
                          <option key={index} value={data}>
                              {data}
                          </option>
                      ))}
                  </select>
                  ) : (
                  <select 
                  disabled
                  className={`${subjectOfInterest !== "" ? 'filled' : ''}`} 
                  value={subjectOfInterest} 
                  onChange={(e) => handleChange(e, setSubjectOfInterest)} required>
                      <option disabled value="">Seleziona un corso</option>
                  </select>                    
                  )}

              </div>
              <div className='domanda'>
                  <label>Quanto sei disposto a spendere?</label>
                  {desiredDegree !== "" ? (
                  <select 
                  className={`${budget !== "" ? 'filled' : ''}`} 
                  value={budget} 
                  onChange={(e) => handleChange(e, setBudget)} required>
                      <option disabled value="">Seleziona un costo</option>
                      {uniquePrice && uniquePrice.map((data, index) => (
                          <option key={index} value={data}>
                              {data}
                          </option>
                      ))}
                  </select>
                  ) : (
                  <select 
                  disabled
                  className={`${budget !== "" ? 'filled' : ''}`} 
                  value={budget} 
                  onChange={(e) => handleChange(e, setBudget)} required>
                      <option disabled value="">Seleziona un costo</option>
                  </select>                    
                  )}

              </div>
              </div>)}
          </div>
          <div className='corsi'>
              <p><span><img alt='offerta' src={offerta} /></span>Offerta aggiornata al <b>19 ottobre</b></p>
              <div className='corsi-container'>
                  {degreeType !== "" && filteredCourses.length > 0 ? (
                    filteredCourses
                  .filter((corso) => {
                    if (degreeType && corso.Tipologia !== degreeType) {
                      return false;
                    }
                
                    if (subjectOfInterest && corso["Corsi di laurea + (non lo so) "] !== subjectOfInterest) {
                      return false;
                    }
                
                    if (desiredDegree && corso.Area !== desiredDegree) {
                      return false;
                    }
                
                    if (budget && corso['Costo '] !== budget) {
                      return false;
                    }
                
                    return true;
                  }) //unipegaso, mercatorum, sanraffaele
                  .map((corso, index) =>  {
                    const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                  return (
                    <div className='single-corso' key={index}>
                      {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                      <>
                        <img className='bollino-mobile' src={bolMob} />                        
                        <img className='bollino' src={bollino} />
                      </>
                      ): (
                        null
                      )}
                      <div>
                        {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo && ateneo.ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : corso && corso.Ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo && ateneo.ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo && ateneo.ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo && ateneo.ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : corso && corso.Ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo && ateneo.ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo && ateneo.ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo && ateneo.ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo && ateneo.ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO DI LAUREA:</p>
                          </div>
                          <div>
                            <p>{corso.Ateneo && corso.Ateneo}</p>
                            <p>{corso['Corsi di laurea + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>TIPOLOGIA DI CORSO:</p>
                            <p>SEDI D’ESAME:</p>
                            <p>RICONOSCIMENTO CFU:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} in tutta Italia</p>
                            <p>Si</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi di laurea + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})) : (
                    <>
                    <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Coerente con il filtro: Percorso di studi</h4>
                    {origCorsi.length > 0 && origCorsi.filter((corso) => {
                    if (degreeType && corso.Tipologia !== degreeType) {
                      return false;
                    }
                
                    if (desiredDegree && corso.Area !== desiredDegree) {
                      return false;
                    }
                    
                    if (subjectOfInterest && corso["Corsi di laurea + (non lo so) "] !== subjectOfInterest) {
                      return false;
                    }
                
                    return true;
                  })
                  .sort((corsoA, corsoB) => {
                    const ateneoA = corsoA.Ateneo;
                    const ateneoB = corsoB.Ateneo;
                
                    const isPrioritarioA = ateneiPrioritari.includes(ateneoA);
                    const isPrioritarioB = ateneiPrioritari.includes(ateneoB);
                
                    if (isPrioritarioA && !isPrioritarioB) {
                      return -1; // metti corsoA prima di corsoB
                    } else if (!isPrioritarioA && isPrioritarioB) {
                      return 1; // metti corsoB prima di corsoA
                    }
                
                    return 0;
                  })
                  .map((corso, index) =>  {
                    const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                  return (
                    <div className='single-corso' key={index}>
                      {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                      <>
                        <img className='bollino-mobile' src={bolMob} />                        
                        <img className='bollino' src={bollino} />
                      </>
                      ): (
                        null
                      )}
                      <div>
                        {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            null
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO DI LAUREA:</p>
                          </div>
                          <div>
                            <p>{corso.Ateneo && corso.Ateneo}</p>
                            <p>{corso['Corsi di laurea + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>TIPOLOGIA DI CORSO:</p>
                            <p>SEDI D’ESAME:</p>
                            <p>RICONOSCIMENTO CFU:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} in tutta Italia</p>
                            <p>Si</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi di laurea + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})}
                  <hr className='linea-separatoria' />


                  <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Coerente con il filtro: Prezzo</h4>
                    {origCorsi && origCorsi.filter((corso) => {
                    if (degreeType && corso.Tipologia !== degreeType) {
                      return false;
                    }
                
                    if (desiredDegree && corso.Area !== desiredDegree) {
                      return false;
                    }
                    
                    if (budget && corso['Costo '] !== budget) {
                      return false;
                    }
                
                    return true;
                  })
                  .sort((corsoA, corsoB) => {
                    const ateneoA = corsoA.Ateneo;
                    const ateneoB = corsoB.Ateneo;
                
                    const isPrioritarioA = ateneiPrioritari.includes(ateneoA);
                    const isPrioritarioB = ateneiPrioritari.includes(ateneoB);
                
                    if (isPrioritarioA && !isPrioritarioB) {
                      return -1; // metti corsoA prima di corsoB
                    } else if (!isPrioritarioA && isPrioritarioB) {
                      return 1; // metti corsoB prima di corsoA
                    }
                
                    return 0;
                  })
                  .map((corso, index) =>  {
                    const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                  return (
                    <div className='single-corso' key={index}>
                      {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                        <>
                          <img className='bollino-mobile' src={bolMob} />                        
                          <img className='bollino' src={bollino} />
                        </>
                      ): (
                        null
                      )}
                      <div>
                        {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO DI LAUREA:</p>
                          </div>
                          <div>
                            <p>{corso.Ateneo && corso.Ateneo}</p>
                            <p>{corso['Corsi di laurea + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>TIPOLOGIA DI CORSO:</p>
                            <p>SEDI D’ESAME:</p>
                            <p>RICONOSCIMENTO CFU:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} in tutta Italia</p>
                            <p>Si</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi di laurea + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})}
                  <hr className='linea-separatoria' />


                  <h4 style={{textAlign:'left', marginTop:'1rem', fontWeight: '400'}}>Altri corsi che potrebbero interessarti</h4>
                    {origCorsi && origCorsi.filter((corso) => {
                    if (degreeType && corso.Tipologia !== degreeType) {
                      return false;
                    }
                
                    if (desiredDegree && corso.Area !== desiredDegree) {
                      return false;
                    }
                    
                    if (budget && corso['Costo '] == budget) {
                      return false;
                    }
                                        
                    if (subjectOfInterest && corso["Corsi di laurea + (non lo so) "] == subjectOfInterest) {
                      return false;
                    }
                
                    return true;
                  })
                  .sort((corsoA, corsoB) => {
                    const ateneoA = corsoA.Ateneo;
                    const ateneoB = corsoB.Ateneo;
                
                    const isPrioritarioA = ateneiPrioritari.includes(ateneoA);
                    const isPrioritarioB = ateneiPrioritari.includes(ateneoB);
                
                    if (isPrioritarioA && !isPrioritarioB) {
                      return -1; // metti corsoA prima di corsoB
                    } else if (!isPrioritarioA && isPrioritarioB) {
                      return 1; // metti corsoB prima di corsoA
                    }
                
                    return 0;
                  })
                  .map((corso, index) =>  {
                    const ateneo = atenei && atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo);
                  return (
                    <div className='single-corso' key={index}>
                      {corso && corso.Ateneo && corso.Ateneo == "Unipegaso" || corso.Ateneo == "Mercatorum" || corso.Ateneo == "San Raffaele" ? (
                        <>
                          <img className='bollino-mobile' src={bolMob} />                        
                          <img className='bollino' src={bollino} />
                        </>
                      ): (
                        null
                      )}
                      <div>
                        {ateneo && ateneo.ateneo && ateneo.ateneo === "Unidav" ? (
                            <img alt='logo ateneo' src={unidav} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unipegaso" ? (
                            <img alt='logo ateneo' src={unipegaso} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Uninettuno" ? (
                            <img alt='logo ateneo' src={uninettuno} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Mercatorum" ? (
                            <img alt='logo ateneo' src={unimerc} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unifortunato" ? (
                            <img alt='logo ateneo' src={unifotunato} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unicusano" ? (
                            <img alt='logo ateneo' src={unicusano} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unitelma" ? (
                            <img alt='logo ateneo' src={sapienza} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "eCampus" ? (
                            <img alt='logo ateneo' src={ecampus} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Unimarconi" ? (
                            <img alt='logo ateneo' src={uniMarconi} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "San Raffaele" ? (
                            <img alt='logo ateneo' src={sanraffaele} />
                          ) : ateneo && ateneo.ateneo && ateneo.ateneo === "Iul" ? (
                            <img alt='logo ateneo' src={iul} />
                          ) : (
                            <img alt='logo ateneo' />
                          )}
                        <div className='right-corso mob'>
                          <p><b>Retta annua</b></p>
                          <p>{corso['Costo ']}</p>
                        </div>
                      </div>
                      <div className='center-corso'>
                        <div>
                          <div>
                            <p>ATENEO:</p>
                            <p>CORSO DI LAUREA:</p>
                          </div>
                          <div>
                            <p>{corso.Ateneo && corso.Ateneo}</p>
                            <p>{corso['Corsi di laurea + (non lo so) ']}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p>TIPOLOGIA DI CORSO:</p>
                            <p>SEDI D’ESAME:</p>
                            <p>RICONOSCIMENTO CFU:</p>
                          </div>
                          <div>
                            <p>Online</p>
                            <p>{atenei.find((item) => item.ateneo && corso.Ateneo && item.ateneo === corso.Ateneo)?.numeroCorsi} in tutta Italia</p>
                            <p>Si</p>
                          </div>
                        </div>
                        <div>
                          <img alt='logo trustpilot' src={trustpilot} />
                          <p>{ateneo && ateneo.recensioni} recensioni - <b>Punteggio {ateneo && ateneo.punteggio}</b></p>
                        </div>
                      </div>
                      <div className='right-corso mob-none'>
                        <p>Retta annua</p>
                        <p>{corso['Costo ']}</p>
                        <button onClick={() => talkOrientatore(ateneo && ateneo.ateneo, corso['Corsi di laurea + (non lo so) '] , corso['Costo '])}>Parla con un orientatore</button>
                      </div>
                    </div>
                  )})}
                  </>
                  )}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Risultati