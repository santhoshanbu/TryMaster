import React, { useEffect, useState } from "react";
import axios from "axios";

import swal from "sweetalert";
import { Success } from "../../alerts/success";
import { EventUpdate } from '../../alerts/update';

export const DummyForm = () => {

    const [name, setName] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [pan, setPan] = useState('')
    const [gst, setGst] = useState('')
    const [country1, setCountry1] = useState('')
    const [state1, setState1] = useState('')
    const [district1, setDistrict1] = useState('')
    const [pincode1, setPincode1] = useState('')
    const [country2, setCountry2] = useState('')
    const [state2, setState2] = useState('')
    const [district2, setDistrict2] = useState('')
    const [pincode2, setPincode2] = useState('')
    const [id, setId] = useState('')
    const [disable,setdisable]=useState(true)

    const [load, setLoad] = useState(0)

    const [save, setSave] = useState(true);

    // backend data
    const [data, setData] = useState([])

    useEffect(async () => {
        let axi = await axios.get("http://localhost:5000/api/ClientRouter")
        setData(axi.data)
    }, [load])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            name: name,
            aadhar: aadhar,
            pan: pan,
            gst: gst,
            country1: country1,
            district1: district1,
            state1: state1,
            pincode1: pincode1,
            country2: country2,
            district2: district2,
            state2: state2,
            pincode2: pincode2

        }
        if (save) {
            await axios.post("http://localhost:5000/api/ClientRouter/new", data)
                .then(() => {
                    setLoad(load + 1)
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
                    Success()
                }).catch((error) => {
                    console.log(error)
                })
        } else {
                await axios.put(`http://localhost:5000/api/ClientRouter/${id}`, data)
                    .then(() => {
                        setLoad(load + 1)
                        setSave(true)
                        EventUpdate()
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
                    })
        }

    }

    const Modify = (item) => {
        data.map((val) => {
            if (val.name === item) {
                setLoad(load + 1)
                setSave(!save)
                setId(val._id)
                setName(val.name)
                setAadhar(val.aadhar)
                setPan(val.pan)
                setGst(val.gst)
                setCountry1(val.country1)
                setState1(val.state1)
                setDistrict1(val.district1)
                setPincode1(val.pincode1)
                setCountry2(val.country2)
                setState2(val.state2)
                setDistrict2(val.district2)
                setPincode2(val.pincode2)
            }
        })
    }
    const Clear = () => {
        if (save === false) {
            setSave(true)
        }
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

const deleteEvent = () => {

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: ['No','yes'],
        dangerMode: true,
    })
        .then(async (willDelete) => {
            if (willDelete) {
                await axios.delete(`http://localhost:5000/api/ClientRouter/${id}`)
                    .then(() => {
                        setLoad(load + 1)
                        setSave(true)
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
                        swal("Your file has been deleted!", {
                            icon: "success",
                        });
                    })
            } else {
                swal("Your detail is safe!");
            }
        });


}

return (
    <div class='container' style={{ padding: '3%' }}>
        <div className="text-center h5" style={{fontFamily:'system-ui'}}>Client Details</div>
        <form className="needs-validation" onSubmit={handleSubmit} style={{ padding: '2%', border: '0.1rem solid #ced4da' }} autoComplete="off" novalidate>
            <div class='row'>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        Name
                    </label>
                    <input title="please fill valid name" required list="datalistOptions" /*onSelect={(e) => Modify(e.target.value)}*/ onChange={(e) => { Modify(e.target.value); setName(e.target.value) }} value={name} class='form-control' type='text' />
                    <datalist id="datalistOptions">
                        {
                            data.map((item) => <option value={item.name} />)
                        }
                    </datalist>
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        Aadhar
                    </label>
                    <input required onChange={(e) => setAadhar(e.target.value.replace(/[^0-9]/g, ''))} value={aadhar} class='form-control' minlength="12" maxlength="12" />
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        PAN
                    </label>
                    <input required onChange={(e) => setPan(e.target.value)} value={pan} class='form-control' type='text' />
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        GST
                    </label>
                    <input required onChange={(e) => setGst(e.target.value)} value={gst} class='form-control' type='text' />
                </div>
            </div>
            <div class='row'>
                <label style={{ padding: '0 2%' }}>
                    <b>Address 1</b>
                </label>
            </div>
            <div class='row'>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        Country
                    </label>
                    <input pattern="[A-Za-z]+" required list="datalistoptions" onChange={(e) => { setCountry1(e.target.value) }} value={country1} class='form-control' type='text' />
                    <datalist id="datalistoptions" >

                    </datalist>
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        State
                    </label>
                    <input required list="datalist" onChange={(e) => { setState1(e.target.value) }} value={state1} class='form-control' type='text' />
                    <datalist id="datalist">

                    </datalist>
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        District
                    </label>
                    <input required list="datalistitem" onChange={(e) => setDistrict1(e.target.value)} value={district1} class='form-control' type='text' />
                    <datalist id="datalistitem">

                    </datalist>
                </div>
                <div style={{ padding: '0 1%' }} class='form-group'>
                    <label>
                        Pincode
                    </label>
                    <input required onChange={(e) => setPincode1(e.target.value)} value={pincode1} class='form-control' title="pleasee" />
                </div>
            </div>
            <div class='row'>
                <label style={{ padding: '0 2%' }}>
                    <b>Address 2</b>
                </label>
            </div>
            <div class='row'>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        Country
                    </label>
                    <input list="datalistoptions" onChange={(e) => { setCountry2(e.target.value) }} value={country2} class='form-control' type='text' />
                    <datalist id="datalistoptions" >

                    </datalist>
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        State
                    </label>
                    <input list="datalist" onChange={(e) => { setState2(e.target.value) }} value={state2} class='form-control' type='text' />
                    <datalist id="datalist">

                    </datalist>
                </div>
                <div style={{ padding: '0 2%' }} class='form-group'>
                    <label>
                        District
                    </label>
                    <input list="datalistitem" onChange={(e) => setDistrict2(e.target.value)} value={district2} class='form-control' type='text' />
                    <datalist id="datalistitem">

                    </datalist>
                </div>
                <div style={{ padding: '0 1%' }} class='form-group'>
                    <label>
                        Pincode
                    </label>
                    <input onChange={(e) => setPincode2(e.target.value)} value={pincode2} class='form-control' />
                </div>
                <div style={{ padding: '3%' }} class="form-group row" >
                    {/* {
                        name !== '' && aadhar.length === 12 && pan !== '' && gst !== '' && country1 !== '' && district1 !== '' && state1 !== '' && pincode1 !== ''?setdisable(false):setdisable(true)   
                    } */}
                    <button type="submit" class="btn btn-success" disabled={name !== '' && aadhar !== '' && pan !== '' && gst !== '' && country1 !== '' && district1 !== '' && state1 !== '' && pincode1 !== ''?false:true}>Save</button>
                    {
                        save ? <button style={{ marginLeft: '10px' }} onClick={() => Clear()}  class="btn btn-info">Clear</button> :
                            <button style={{ marginLeft: '10px', backgroundColor: '#b51818' }} type="button" onClick={() => deleteEvent()} class="btn">Delete</button>
                    }{
                        save ? null : <button style={{ marginLeft: '10px' }} onClick={() => Clear()} class="btn btn-info">Clear</button>
                    }
                </div>
            </div>
        </form>
    </div>
)
}