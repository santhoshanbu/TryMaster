import React, { useState ,useEffect } from "react";
import axios from 'axios'
import moment from "moment";
import Location  from '../../data/indialocation.json'
// alerts
import swal from 'sweetalert'
import { Success } from "../../alerts/success";
import { EventUpdate } from "../../alerts/update";

export default function Content() {

  const location=Location;

  const [stateOption,setStateOption]=useState([])
  const [stateList,setStateList]=useState([])

  // the array is declare and used for store a data from data base
  const [array,setArray]=useState([]);

  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [venue, setVenue] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [sponser, setSponser] = useState('')
  const [organiser, setOrganiser] = useState('')

  // date validation hooks

  const [dateVal,setDateVal]=useState(true)

  // this id is backend tabel id

  const [id,setId]=useState('')
  const [load,setLoad]=useState(0)

  // button hide and show 

  const [save, setSave] = useState(true);

  // this is location hooks

  const [dis,setDis]=useState([])

  // error
  const [err,uperr]=useState(false) 

  useEffect(()=>{ 
    var option=[...stateOption];
    location.map((item)=>{
      item.states.map((items)=>{
        items.cities.map((c)=>{
            let obj={nation:item.name,state:items.name,city:c.name}
            option.push(obj)
        })
      })
    })
      setStateOption(option)
  },[])

  useEffect(async()=>{
    const axi=await axios.get("http://localhost:5000/api/events")
    setArray(axi.data)
    // fun()
  },[load])
  // location lists

  // this function is used for enable  past dates

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
// this function used for fix a particular date range
const handle=(item)=>{
  const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const temp=yyyy + "-" + mm + "-" + dd
    // item
  if(temp<=item){
    setDateVal(false)
    setStartDate(item)
  }
  if(temp>item){
    setDateVal(true)
  }
}
  const fdate = () => {
    return startDate;
  }

  const createEvent = async(e) => {
    e.preventDefault();
        const data={
                    venue:venue,
                    description:description,
                    startdate:startDate,
                    endate:endDate,
                    country:country,
                    district:district,
                    state:state,
                    city:city,
                    event_sponsor:sponser,
                    event_organizer:organiser
              }
            if(save){  
              await axios.post("http://localhost:5000/api/events/new",data)
              .then(()=>{
                          setLoad(load+1) 
                          Success()
                          uperr(false)
                          setDescription('')
                          setVenue('')
                          setStartDate('')
                          setEndDate('')
                          setDistrict('')
                          setCity('')
                          setState('')
                          setCountry('')
                          setSponser('')
                          setOrganiser('')
                        })
              .catch(()=>uperr(true))
            }else{
                // if(startDate<=endDate&&dateVal===false&&venue!==''&&description!==''&&startDate!==''&&endDate!==''&&country!==''&&district!==''&&state!==''&&city!==''&&sponser!==''&&organiser!==''){
                  await axios.put(`http://localhost:5000/api/events/${id}`,data)
                  .then(()=>{
                      setLoad(load+1)
                      EventUpdate()
                      setDescription('')
                      setVenue('')
                      setDistrict('')
                      setStartDate('')
                      setEndDate('')
                      setCity('')
                      setState('')
                      setCountry('')
                      setSponser('')
                      setOrganiser('')
                      setSave(false)
                      uperr(false)
                  })
                  .catch(()=>{
              
                  })
                // }else{
                //   uperr(true)
                // } 
              }
  }

  const Clear=()=>{
    if(save===false){
      setSave(true)
    }
    setDescription('')
    setVenue('')
    setStartDate('')
    setEndDate('')
    setDistrict('')
    setCity('')
    setState('')
    setCountry('')
    setSponser('')
    setOrganiser('')
  }

  // this function fill the form with backend data 

  const modify = (item) => {
    array.map((val) => {
      
      if (val.description === item) {

        setDescription(val.description)
        // button hide and show
        setDateVal(false)
        setSave(false)

        // get values from database and update to the state

        setId(val._id)
        setDescription(val.description)
        const sdate=moment(val.startdate).format('YYYY-MM-DD')
        setStartDate(sdate)
        const edate=moment(val.endate).format('YYYY-MM-DD')
        setEndDate(edate)
        setVenue(val.venue)
        setDistrict(val.district)
        setCity(val.city)
        setState(val.state)
        setCountry(val.country)
        setSponser(val.event_sponsor)
        setOrganiser(val.event_organizer)
      }
    })
  }
 

  // Event delete function

  const deleteEvent=()=>{

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        await axios.delete(`http://localhost:5000/api/events/${id}`)
        .then(()=>{
                    setLoad(load+1)
                    setDescription('')
                    setVenue('')
                    setDistrict('')
                    setStartDate('')
                    setEndDate('')
                    setCity('')
                    setState('')
                    setCountry('')
                    setSponser('')
                    setOrganiser('')
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      })
      } else {
        swal("Your imaginary file is safe!");
      }
    }); 
  }

      const Show=(event)=>{
                    const showState=location.find((item) => item.name.toLowerCase() === event.toLowerCase());
                    if(showState){
                      setStateList(showState.states)
                    }              
      }

      const ShowCity=(item)=>{
                  const city=stateList.find((c)=>c.name.toLowerCase()===item.toLowerCase())
                  if(city){
                    setDis(city.cities)
                  }   

                  // opposite direction to find location

                  location.map((a)=>{
                    a.states.map((b)=>{
                      if(b.name.toLowerCase()===item.toLowerCase()){
                        setCountry(a.name)
                      }
                    })
                  })
      }

    const opposite=(item)=>{ 
      debugger
      let spliter=item.split(',')
      console.log(spliter)
      if((state===''||country==='')&&spliter.length===3){
        setDistrict('')
        setState(spliter[1])
        setCountry(spliter[2])
        setDistrict(spliter[0])
      }
      if(spliter.length>1&&spliter.length<3){
        setState('')
        setCountry('  ')
      }

    //   let temp_State=[]
    //   let temp_country=[]
    //   console.log("Enter into opposite fucntions")
    //     location.map((item)=>{
    //       item.states.map((items)=>{
    //         items.cities.map((c)=>{
    //           if(c.name.toLowerCase()===e.toLowerCase()){
    //             temp_State.push(items.name)
    //             temp_country.push(item.name)

    //           }
    //         })
    //       })
    //     })
    //     setStateList(temp_State)
    //     setCountry(temp_country[0].name)
    //     setState(temp_State[0].name)
            // let output = location.filter(eachVal => {
            //   let opt=eachVal.states.some((
            //       { cities }) => cities
            //       .some(({ name }) => {
            //         if(name === e){
            //           let arr=[...stateOption]

            //           arr.push(eachVal.states.name)
            //           console.log(arr)
            //           setDis(arr)
            //         return true
            //         }

            //       }))
            //       return opt
            // })
            // if(output){
            //   setDisOption(output)
            // }
      }
 
  return (
    <div class='container' style={{ padding: '3%' }}>
      <div className="text-center h5" style={{fontFamily:'system-ui'}}>Event Details</div>
      <form onSubmit={createEvent} style={{ padding: '2%', border: '0.1rem solid #ced4da' }} autoComplete="off">
        <div class='row'>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              Event Description
            </label>
            <input required list="datalistOptions" onSelect={(e)=>modify(e.target.value)} onChange={(e) =>  setDescription(e.target.value) } value={description} class='form-control' type='text' />
            <datalist id="datalistOptions">
              {
                array.map((item) => <option value={item.description} />)
              }
            </datalist>
          </div>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              Event Start Date
            </label>
            <input required min={disablePastDate()}  max='9999-12-31' format="dd-MM-yyyy" type='date' value={startDate} onChange={(e) => { handle(e.target.value);setStartDate(e.target.value)}} class='form-control ' />
          </div>
          <div style={{ padding: '0 3%' }} class='form-group'>
            <label>
              Event End Date
            </label>
            <input required max='9999-12-31' /*style={dateVal?{border:'1px solid red'}:null}*/ disabled={dateVal} min={fdate()} onChange={(e) => setEndDate(e.target.value)} value={endDate} class='form-control' type='date' />
          </div>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              Event Venue
            </label>
            <input required onChange={(e) => setVenue(e.target.value)} value={venue} class='form-control' type='text' />
          </div>
        </div>
        <div class='row'>
          <label style={{ padding: '0 2%' }}>
            <b>Location</b>
          </label>
        </div>
        <div class='row'>
        <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              Country
            </label>
            <input required list="datalistoptions" onChange={(e) =>{Show(e.target.value);setCountry(e.target.value) }} value={country} class='form-control' type='text' />
            <datalist id="datalistoptions" >
              {
                location.map((item) => <option value={item.name} />)
              }            
            </datalist>
          </div>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              State
            </label>
            <input required list="datalist" onChange={(e) =>{ShowCity(e.target.value); setState(e.target.value)}} value={state} class='form-control' type='text' />
            <datalist id="datalist">
              {
                stateList.map((item) => <option value={item.name} />)
              }            
            </datalist>
          </div>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              District
            </label>
            <input required list="datalistitem" onSelect={(e) =>opposite(e.target.value)} onChange={(e)=>setDistrict(e.target.value)} value={district} class='form-control' type='text' />
            <datalist id="datalistitem">
              {
             state===''&&stateOption.map((item)=><option>{item.city},{item.state},{item.nation}</option>)
              }
              {
                state!==''&&dis.map((item) => <option value={item.name} />)
              }
            </datalist>
          </div>
          <div style={{ padding: '0 1%' }} class='form-group'>
            <label>
              City
            </label>
            <input required onChange={(e) => setCity(e.target.value)} value={city} class='form-control' type='text' />
          </div>
        </div>
        <div class='row'>
          <label style={{ padding: '0 2%' }}>
            <b>Chief Bearer</b>
          </label>
        </div>
        <div class='row'>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              Event Sponsor
            </label>
            <input required onChange={(e) => setSponser(e.target.value)} value={sponser} class='form-control' type='text' />
          </div>
          <div style={{ padding: '0 2%' }} class='form-group'>
            <label>
              Event Organizer
            </label>
            <input required onChange={(e) => setOrganiser(e.target.value)} value={organiser} class='form-control' type='text' />
          </div>
          <div style={{ padding: '3%' }} class="form-group row" >
          <button type="submit" class="btn btn-success" disabled={venue!==''&&description!==''&&startDate!==''&&endDate!==''&&country!==''&&district!==''&&state!==''&&city!==''&&sponser!==''&&organiser!==''?false:true}>Save</button>
            { 
            save? <button style={{marginLeft:'10px'}} onClick={()=>Clear()} type="button" class="btn btn-info">Clear</button>:
            <button style={{marginLeft:'10px',backgroundColor:'#b51818'}} type="button" onClick={() => deleteEvent()} class="btn">Delete</button>
            }{
              save?null:<button style={{marginLeft:'10px'}} onClick={()=>Clear()} type="button" class="btn btn-info">Clear</button>
            }
          </div>
        </div>
        {err&&<div style={{color:'red',marginLeft:'40%'}}>Please fill all field</div>}
      </form>
    </div>
  )
}