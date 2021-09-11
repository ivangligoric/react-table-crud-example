import React, { useState } from "react";

import SupplierDataService from "../services/SupplierService";

const AddSupplier = () => {
  const initialSupplierState = {
    id: null,
    name: "",
    postalAddress: {
      city: "",
      postalCode: "",
      streetName: ""
    },
    phoneNumber: "",
    email: ""
  };
  const [Supplier, setSupplier] = useState(initialSupplierState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    console.log(Supplier.postalAddress.city);
    const { name, value } = event.target;
    setSupplier({ ...Supplier, [name]: value });
  };

  const saveSupplier = () => {
    var data = {
      title: Supplier.title,
      name: Supplier.name,
      postalAddress: Supplier.postalAddress,
      email: Supplier.email,
      phoneNumber: Supplier.phoneNumber
    };

    SupplierDataService.create(data)
      .then(response => {
        setSupplier({
          id: response.data.id,
          name: response.data.name,
          postalAddress: response.data.postalAddress,
          phoneNumber: response.data.phoneNumber,
          email: response.data.email
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newSupplier = () => {
    setSupplier(initialSupplierState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSupplier}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
              <label htmlFor="name">Naziv</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={Supplier.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Broj Telefona</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={Supplier.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Mejl Adresa</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={Supplier.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">Grad</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={Supplier.postalAddress.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Poštanski kod</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                value={Supplier.postalAddress.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="streetName">Ulica</label>
              <input
                type="text"
                className="form-control"
                id="streetName"
                name="streetName"
                value={Supplier.postalAddress.streetName}
                onChange={handleInputChange}
              />
            </div>

          <button onClick={saveSupplier} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSupplier;
