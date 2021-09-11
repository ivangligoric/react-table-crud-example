import React, { useState } from "react";

import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const initialTutorialState = {
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
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    console.log(tutorial.postalAddress.city);
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      name: tutorial.name,
      postalAddress: tutorial.postalAddress,
      email: tutorial.email,
      phoneNumber: tutorial.phoneNumber
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
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

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
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
                value={tutorial.name}
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
                value={tutorial.phoneNumber}
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
                value={tutorial.email}
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
                value={tutorial.postalAddress.city}
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
                value={tutorial.postalAddress.postalCode}
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
                value={tutorial.postalAddress.streetName}
                onChange={handleInputChange}
              />
            </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
