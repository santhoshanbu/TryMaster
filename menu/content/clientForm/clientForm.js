import * as React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

// alerts
 import swal from 'sweetalert';
import { Success } from '../../../alerts/success';
import { EventUpdate } from '../../../alerts/update';

export default function ClientForm() {

    const [name,setName]=useState('')
    const [aadhar,setAadhar]=useState('')
    const [pan,setPan]=useState('')
    const [gst,setGst]=useState('')
    const [country1,setCountry1]=useState('')
    const [state1,setState1]=useState('')
    const [district1,setDistrict1]=useState('')
    const [pincode1,setPincode1]=useState('')
    const [country2,setCountry2]=useState('')
    const [state2,setState2]=useState('')
    const [district2,setDistrict2]=useState('')
    const [pincode2,setPincode2]=useState('')

    // backend data
    const [data,setData]=useState([])

    useEffect(async()=>{
      let axi=await axios.get("http://localhost:5000/api/ClientRouter")
      setData(axi.data)
    },[])

    const handleChange=async(e)=>{
        e.preventDefault();

        let data={
          name:name,
          aadhar:aadhar,
          pan:pan,
          gst:gst,
          country1:country1,
          district1:district1,
          state1:state1,
          pincode1:pincode1,
          country2:country2,
          district2:district2,
          state2:state2,
          pincode2:pincode2

        }

        await axios.post("http://localhost:5000/api/ClientRouter/new",data)
        .then(()=>{
              Success()
              setName('')
              setAadhar('')
              setPan('')
              setGst('')
              setCountry1('')
              setState1('')
              setDistrict1('')
              setPincode1('')
              setCountry2('')
              setState2('')
              setDistrict2('')
              setPincode2('')
        }).catch(()=>{

        })
      }
        
        const Modify=(item)=>{
          data.map((val) => {
      
            if (val.description === item) {
              setAadhar(data.aadhar)
              setPan(data.pan)
              setGst(data.gst)
              setCountry1(data.country1)
              setState1(data.state1)
              setDistrict1(data.district1)
              setPincode1(data.pincode1)
              setCountry2(data.country2)
              setState2(data.state2)
              setDistrict2(data.district2)
              setPincode2(data.pincode2)
            }
          })
        }
    const Clear=()=>{
        setName('')
        setAadhar('')
        setPan('')
        setGst('')
        setCountry1('')
        setState1('')
        setDistrict1('')
        setPincode1('')
        setCountry2('')
        setState2('')
        setDistrict2('')
        setPincode2('')
    }

    console.log(data)
  return (
    <div style={{padding:'4%'}}>
    <Box
      sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, border: 1,borderColor:'grey.500',padding:'2%'}}
      noValidate
      autoComplete="off">
      <form onSubmit={handleChange}>
      <Autocomplete
      id="combo-box-demo"
      options={data.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} value={name} onSelect={(e)=>Modify(e.target.value)} onChange={(e)=>setName(e.target.value)} required id="outlined-basic" label="Name" variant="outlined" />}
    />

      <TextField error type='number' value={aadhar} onChange={(e)=>setAadhar(e.target.value)} required id="outlined-basic" label="Aadhar" variant="outlined" />
      <TextField value={pan} onChange={(e)=>setPan(e.target.value)} required id="outlined-basic" label="PAN" variant="outlined" />
      <TextField value={gst} onChange={(e)=>setGst(e.target.value)} required id="outlined-basic" label="GST" variant="outlined" />
      <Typography variant="h6" sx={{marginLeft:1,color:'grey.700'}}>
        Address 1
      </Typography>
      <TextField value={country1} onChange={(e)=>setCountry1(e.target.value)} required id="outlined-basic" label="country" variant="outlined" />
      <TextField value={state1} onChange={(e)=>setState1(e.target.value)} required id="outlined-basic" label="state" variant="outlined" />
      <TextField value={district1} onChange={(e)=>setDistrict1(e.target.value)} required id="outlined-basic" label="city" variant="outlined" />
      <TextField type='number' value={pincode1} onChange={(e)=>setPincode1(e.target.value)} required id="outlined-basic" label="pincode" variant="outlined" />
      <Typography variant="h6" sx={{marginLeft:1,color:'grey.700'}}>
        Address 2
      </Typography>
      <TextField value={country2} onChange={(e)=>setCountry2(e.target.value)} required id="outlined-basic" label="country" variant="outlined" />
      <TextField value={state2} onChange={(e)=>setState2(e.target.value)} required id="outlined-basic" label="state" variant="outlined" />
      <TextField value={district2} onChange={(e)=>setDistrict2(e.target.value)} required id="outlined-basic" label="city" variant="outlined" />
      <TextField type='number' value={pincode2} onChange={(e)=>setPincode2(e.target.value)} required id="outlined-basic" label="pincode" variant="outlined" />
      <Button type='submit' variant="contained" color="success" sx={{margin:'1% 0 0 1%'}}>Save</Button>
      <Button type='button' onClick={()=>Clear()} variant="contained"  sx={{margin:'1% 0 0 1%'}}>Clear</Button>
      </form>
    </Box>
    </div>
  )
}