import React, { useEffect, useState } from "react";

import SupplierDataService from "../services/SupplierService";

const Supplier = props => {
  const initialSupplierState = {
    id: null,
    name: "",
    postalAddress: {},
    phoneNumber: "",
    email: ""
  };
  const [currentSupplier, setCurrentSupplier] = useState(initialSupplierState);
  const [message, setMessage] = useState("");

  const getSupplier = id => {
    SupplierDataService.get(id)
      .then(response => {
        console.log(response);
        setCurrentSupplier(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSupplier(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSupplier({ ...currentSupplier, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentSupplier.id,
      name: currentSupplier.name,
      postalAddress: currentSupplier.postalAddress,
      phoneNumber: currentSupplier.phoneNumber,
      email: currentSupplier.email
    };

    SupplierDataService.update(currentSupplier.id, data)
      .then(response => {
        setCurrentSupplier({ ...currentSupplier, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateSupplier = () => {
    SupplierDataService.update(currentSupplier.id, currentSupplier)
      .then(response => {
        console.log(response.data);
        setMessage("The Supplier was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteSupplier = () => {
    SupplierDataService.remove(currentSupplier.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Suppliers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSupplier ? (
        <div className="edit-form">
          <h4>Dobavljač</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Naziv</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentSupplier.name}
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
                value={currentSupplier.phoneNumber}
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
                value={currentSupplier.postalAddress.city}
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
                value={currentSupplier.postalAddress.postalCode}
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
                value={currentSupplier.postalAddress.streetName}
                onChange={handleInputChange}
              />
            </div>
          </form>

          {currentSupplier.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteSupplier}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSupplier}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Supplier...</p>
        </div>
      )}
    </div>
  );
};

export default Supplier;
